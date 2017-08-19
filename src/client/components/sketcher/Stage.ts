/**
 * Сцена модуля рисования
 * 
 * Обеспечивает взаимодействие с элементом `<canvas>`.
 * 
 * @module
 */
;

import Point, { IPoint } from './Point';

/**
 * Объект сцены рисования
 */
class Stage
{
	/**
	 * Элемент холста рисования
	 */
	public readonly canvas: HTMLCanvasElement;
	/**
	 * Контекст рисования
	 */
	public readonly context: CanvasRenderingContext2D;
	/**
	 * Сцена обновлена и требует перерисовки?
	 */
	public updated: boolean;
	/**
	 * Требуется обновление кэша (обновилось изображение)?
	 */
	public cacheUpdated: boolean;
	
	
	/**
	 * Ширина холста в пикселах
	 */
	private _width: number;
	/**
	 * Высота холста в пикселах
	 */
	private _height: number;
	/**
	 * Кэш всего изображения на холсте
	 */
	private imageCache: ImageData | null;
	
	/**
	 * Объект сцены рисования
	 * 
	 * @param canvas Элемент холста рисования
	 */
	public constructor( canvas: HTMLCanvasElement )
	{
		this.canvas = canvas;
		this.context = canvas.getContext( '2d' ) as CanvasRenderingContext2D;
		
		if ( this.context == null )
		{
			throw new Error( 'Stage: Can\'t create 2D context' );
		}
		
		this._width = canvas.width;
		this._height = canvas.height;
		
		this.updated = true;
		this.cacheUpdated = false;
		this.imageCache = null;
		
		this.frameTick();
	}
	
	/**
	 * Ширина холста в пикселах
	 * 
	 * @returns Текущая ширина
	 */
	public get width(): number
	{
		return this._width;
	}
	
	/**
	 * Ширина холста в пикселах
	 * 
	 * @param value Новая ширина
	 */
	public set width( value: number )
	{
		this._width = value;
		this.canvas.width = value;
	}
	
	/**
	 * Ширина холста в пикселах
	 * 
	 * @returns Текущая ширина
	 */
	public get height(): number
	{
		return this._height;
	}
	
	/**
	 * Ширина холста в пикселах
	 * 
	 * @param value Новая ширина
	 */
	public set height( value: number )
	{
		this._height = value;
		this.canvas.height = value;
	}
	
	/**
	 * Перевести координаты в окне в точку на холсте
	 * 
	 * @param x Координата по X
	 * @param y Координата по Y
	 * @returns Точка на холсте
	 */
	public toLocalPoint( x: number, y: number ): IPoint
	{
		const rect = this.canvas.getBoundingClientRect();
		
		return new Point(
			x - rect.left,
			y - rect.top,
		);
	}
	
	/**
	 * Установить обработчик перерисовки части изображения
	 * 
	 * @param handler Обработчик перерисовки
	 */
	public setOnDrawImage( handler: ( this: Stage ) => void ): void
	{
		this.onDrawImage = handler;
	}
	
	
	/**
	 * Установить обработчик рисования после кэширования
	 * 
	 * @param handler Обработчик рисования
	 */
	public setOnDrawAfterCache( handler: ( this: Stage ) => void ): void
	{
		this.onDrawAfterCache = handler;
	}
	
	/**
	 * Обработчик перерисовки кадра
	 */
	private frameTick()
	{
		if ( this.updated || this.cacheUpdated ) {
			this.updated = false;
			
			if ( this.imageCache )
			{
				this.context.putImageData( this.imageCache, 0, 0 );
			}
			else
			{
				this.context.clearRect( 0, 0, this.width, this.height );
			}
			
			// рисуем часть изображения
			this.onDrawImage();
			
			if ( this.cacheUpdated )
			{
				this.cacheUpdated = false;
				this.imageCache = this.context.getImageData(
					0, 0, this.width, this.height
				);
			}
			
			// рисуем служебную информацию
			this.onDrawAfterCache();
		}
		
		window.requestAnimationFrame( () => this.frameTick() );
	}
	
	/**
	 * Обработчик перерисовки части изображения
	 */
	private onDrawImage( this: Stage ): void
	{
		// Задаётся в setOnDrawImage
	}
	
	/**
	 * Обработчик рисования после кэширования
	 */
	private onDrawAfterCache( this: Stage ): void
	{
		// Задаётся в setOnDrawAfterCache
	}
}

/**
 * Модуль
 */
export {
	Stage as default,
};
