/**
 * Панель инструментов
 * 
 * @module
 */
;

/**
 * Панель инструментов
 */
class Tools
{
	/**
	 * Размер кисти
	 */
	private _size: number;
	/**
	 * Половина размера кисти
	 */
	private _halfSize: number;
	/**
	 * Плотность кисти
	 */
	private _opacity: number;
	/**
	 * Цвет кисти
	 */
	private _color: number[];
	/**
	 * Инструмент изменения размера кисти
	 */
	private inputSize: HTMLInputElement;
	/**
	 * Инструмент изменения плотности кисти
	 */
	private inputOpacity: HTMLInputElement;
	/**
	 * Инструмент изменения цвета кисти
	 */
	private inputColor: HTMLInputElement;
	/**
	 * Элемент формы с инструментами
	 */
	private readonly form: HTMLFormElement;
	
	/**
	 * Панель инструментов
	 * 
	 * @param form Элемент формы с инструментами
	 */
	public constructor( form: HTMLFormElement )
	{
		this.form = form;
		
		form.addEventListener(
			'submit',
			( event: Event ) => event.preventDefault()
		);
		
		this.initSizeTool();
		this.initOpacityTool();
		this.initColorTool();
	}
	
	/**
	 * Размер кисти
	 */
	public get size(): number
	{
		return this._size;
	}
	
	/**
	 * Размер кисти
	 */
	public set size( value: number )
	{
		this._size = value;
		this._halfSize = Math.round( value / 2 );
		this.inputSize.value = String( value );
	}
	
	/**
	 * Половина размера кисти
	 */
	public get halfSize(): number
	{
		return this._halfSize;
	}
	
	/**
	 * Плотность кисти
	 */
	public get opacity(): number
	{
		return this._opacity;
	}
	
	/**
	 * Плотность кисти
	 */
	public set opacity( value: number )
	{
		this._opacity = Math.min(
			Math.max(
				0,
				value
			),
			1
		);
		this.inputOpacity.value = this._opacity.toFixed( 2 );
	}
	
	/**
	 * Цвет кисти
	 */
	public get color(): number[]
	{
		return this._color;
	}
	
	/**
	 * Цвет кисти
	 */
	public set color( value: number[] )
	{
		const normalize = ( num: number ) =>
			Math.min(
				Math.max(
					num | 0,
					0
				),
				255
			);
		const toColorPart = ( num: number ): string =>
		{
			const hex = num.toString( 16 );
			
			return (
				( hex.length > 1 )
				? hex
				: '0' + hex
			);
		};
		
		this._color = [
			normalize( value[0] ),
			normalize( value[1] ),
			normalize( value[2] ),
		];
		this.inputColor.value = '#' + toColorPart( this._color[0] )
			+ toColorPart( this._color[1] )
			+ toColorPart( this._color[2] );
	}
	
	/**
	 * Инициализация инструмента изменения размера кисти
	 */
	private initSizeTool(): void
	{
		const input = this.form.elements.namedItem( 'size' ) as HTMLInputElement;
		this.inputSize = input;
		
		input.value = input.defaultValue;
		
		const onChange = (): void =>
		{
			this.size = Number( input.value ) | 0;
			this.size = ( ( this.size > 0 ) ? this.size : 1 );
		};
		
		input.addEventListener( 'change', onChange );
		onChange();
	}
	
	/**
	 * Инициализация инструмента изменения плотности кисти
	 */
	private initOpacityTool(): void
	{
		const input = this.form.elements.namedItem( 'opacity' ) as HTMLInputElement;
		this.inputOpacity = input;
		
		input.value = input.defaultValue;
		
		const onChange = (): void =>
		{
			this.opacity = Number( input.value ) || 1;
		};
		
		input.addEventListener( 'change', onChange );
		onChange();
	}
	
	/**
	 * Инициализация инструмента изменения цвета кисти
	 */
	private initColorTool(): void
	{
		const input = this.form.elements.namedItem( 'color' ) as HTMLInputElement;
		this.inputColor = input;
		
		input.value = input.defaultValue;
		
		const onChange = (): void =>
		{
			this.color = this.parseColor( input.value );
		};
		
		input.addEventListener( 'change', onChange );
		onChange();
	}
	
	/**
	 * Разбор шестнадцатиричного цвета
	 * 
	 * @param hexColor Шестнадцатиричный цвет
	 * @returns Массив компонент цвета [r, g, b]
	 */
	private parseColor( hexColor: string ): number[]
	{
		if ( hexColor.length === 4 )
		{
			return [
				parseInt( hexColor[1], 16 ) | 0,
				parseInt( hexColor[2], 16 ) | 0,
				parseInt( hexColor[3], 16 ) | 0,
			];
		}
		
		return [
			parseInt( hexColor.substr( 1, 2 ), 16 ) | 0,
			parseInt( hexColor.substr( 3, 2 ), 16 ) | 0,
			parseInt( hexColor.substr( 5, 2 ), 16 ) | 0,
		];
	}
}

/**
 * Модуль
 */
export {
	Tools as default,
};
