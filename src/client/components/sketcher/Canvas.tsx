import { Component, h } from 'preact';
// import initDraw from './index';

type CanvasState = void;

interface CanvasProps {

}

/**
 * Панель инструментов
 */
let tools: Tools;

class Canvas extends Component<CanvasProps, CanvasState> {

	private canvas: HTMLCanvasElement;
	private form: HTMLFormElement;

	public componentDidMount() {
		console.log(this.form, this.form.base);
		tools = new Tools(this.form);
		initDraw(this.canvas);
	}

	public render(_props: CanvasProps): JSX.Element {
		return (
			<div id="sketcher">
				<canvas
					width="800"
					height="600" 
					ref={this.getCanvasElement}
				/>
				<form 
					name="tools"
					ref={this.getForm}
				>
					<ul class="fields">
						<li>
							<label for="f-tools-size">Толщина</label>
							<input type="range" min="1" max="100"
								step="1" value="20"
								name="size" id="f-tools-size"
							/>
						</li>
						<li>
							<label for="f-tools-opacity">Плотность</label>
							<input type="range" min="0.01" max="1"
								step="0.01" value="1"
								name="opacity" id="f-tools-opacity"
							/>
						</li>
						<li>
							<label for="f-tools-color">Цвет</label>
							<input type="color" value="#000"
								name="color" id="f-tools-color"
							/>
						</li>
						<li>
							<a class="save" role="button">Сохранить</a>
						</li>
					</ul>
				</form>
			</div>
		)
	}

	private getCanvasElement = (canvas: HTMLCanvasElement) => {
		this.canvas = canvas;
	}

	private getForm = (canvas: HTMLFormElement) => {
		this.form = canvas;
	}

}


/**
 * Модуль инициализации рисовалки
 */
;

import Stage from './Stage';
import Point from './Point';
import Tools from './Tools';
import initSaveButton from './initSaveButton';

/**
 * Угол полной окружности
 */
const PI2 = Math.PI * 2;

/**
 * Позиция курсора
 */
let cursor: Point;
/**
 * Координаты рисуемой линии
 */
let linePoints: Point[];
/**
 * В процессе сохранения?
 */
let saving: boolean;

/**
 * Инициализировать рисовалку на канвасе
 */
function initDraw(canvas: HTMLCanvasElement): void
{
	// const canvas = document.getElementById( 'draw-canvas' ) as HTMLCanvasElement;
	
	// if ( !canvas )
	// {
	// 	return;
	// }
	
	const stage = new Stage( canvas );
	
	cursor = new Point( 0, 0 );
	linePoints = [];
	saving = false;
	
	registerMouseHandlers( stage );
	stage.setOnDrawImage( onDrawImage );
	stage.setOnDrawAfterCache( onDrawAfterCache );
	
	initSave( stage );
}

/**
 * Рисование курсора на холсте
 */
function onDrawAfterCache( this: Stage ): void
{
	if ( saving )
	{
		return;
	}
	
	const context = this.context;
	
	context.save();
	context.strokeStyle = '#000';
	context.lineWidth = 1;
	context.globalCompositeOperation = 'xor';
	context.beginPath();
	context.arc( cursor.x, cursor.y, tools.halfSize, 0, PI2 );
	context.stroke();
	context.restore();
}

/**
 * Рисование изображения на холсте
 */
function onDrawImage( this: Stage ): void
{
	if ( linePoints.length < 2 )
	{
		console.log('one point')
		return;
	}

	// console.log('points line');
	console.log(linePoints)
	let point1 = linePoints[0];
	let point2 = linePoints[1];
	
	const context = this.context;
	
	context.strokeStyle = `rgba(${tools.color[0]}, ${
		tools.color[1]}, ${tools.color[2]}, ${tools.opacity})`;
	context.lineWidth = tools.size;
	context.lineJoin = context.lineCap = 'round';
	context.beginPath();
	context.moveTo( point1.x, point1.y );
	
	if ( point1.isEqual( point2 ) )
	{
		// Рисуем единичную точку
		context.lineTo( point2.x + 0.1, point2.y );
	}
	
	for ( let i = 1, n = linePoints.length; i < n; i++ )
	{
		const middlePoint = calcMiddlePoint( point1, point2 );
		context.quadraticCurveTo( middlePoint.x, middlePoint.y,
			point2.x, point2.y );
		point1 = linePoints[i];
		point2 = linePoints[i + 1];
	}
	
	context.stroke();
	
	if ( this.cacheUpdated )
	{
		linePoints = [];
	}
}

/**
 * Рассчитать среднюю точку между двумя
 * 
 * @param point1 Первая точка
 * @param point2 Вторая точка
 * @returns Средняя точка
 */
function calcMiddlePoint( point1: Point, point2: Point ): Point
{
	return new Point(
		point1.x + (point2.x - point1.x) / 2,
		point1.y + (point2.y - point1.y) / 2
	);
}

/**
 * Добавление обработчиков мыши на холсте
 */
function registerMouseHandlers( stage: Stage ): void
{
	/**
	 * Находимся в процессе рисования?
	 */
	let drawing: boolean = false;
	
	const onMouseMove = ( event: MouseEvent ): void =>
	{
		cursor = stage.toLocalPoint( event.clientX, event.clientY );
		stage.updated = true;
		
		if ( drawing )
		{
			linePoints.push( cursor );
		}
	};
	
	document.addEventListener( 'mousemove', onMouseMove );
	
	const onMouseDown = (): void =>
	{
		drawing = true;
		linePoints.push( cursor );
		document.addEventListener( 'mouseup', onMouseUp );
	};
	
	const onMouseUp = (): void =>
	{
		drawing = false;
		linePoints.push( cursor );
		stage.cacheUpdated = true;
		document.removeEventListener( 'mouseup', onMouseUp );
	};
	
	stage.canvas.addEventListener( 'mousedown', onMouseDown );
}

/**
 * Инициализация функции сохранения холста
 * 
 * @param stage
 * @returns
 */
function initSave( stage: Stage ): void
{
	const panel = document.forms.namedItem( 'tools' );
	
	if ( !panel )
	{
		return;
	}
	
	const button = panel.querySelector( 'a.save' ) as HTMLAnchorElement;
	
	if ( !button )
	{
		return;
	}
	
	const onSave = ( save: () => void ): void =>
	{
		saving = true;
		stage.updated = true;
		
		window.requestAnimationFrame(
			() =>
				window.requestAnimationFrame(
					() =>
					{
						save();
						saving = false;
					}
				)
		);
	};
	
	initSaveButton(
		button,
		stage.canvas,
		onSave
	);
}


export {
	Canvas as default,
}
