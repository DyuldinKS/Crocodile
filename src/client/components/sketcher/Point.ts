/**
 * Модуль класса точек двухмерной плоскости
 * 
 * @module
 */
;

/**
 * Класс точек двухмерной плоскости
 */
class Point implements IPoint
{
	/**
	 * Координата по оси абсцисс
	 */
	public readonly x: number;
	/**
	 * Координата по оси ординат
	 */
	public readonly y: number;
	
	/**
	 * Класс точек двухмерной плоскости
	 * 
	 * @param x Координата по оси абсцисс
	 * @param y Координата по оси ординат
	 */
	public constructor( x: number, y: number )
	{
		this.x = x;
		this.y = y;
	}
	
	/**
	 * Проверка эквивалентности другой точке
	 * 
	 * @param other Другая точка
	 * @returns Точки эквивалентны?
	 */
	public isEqual( other: IPoint ): boolean
	{
		return (
			( this.x === other.x )
			&& ( this.y === other.y )
		);
	}
}

/**
 * Интерфейс точки двухмерной плоскости
 * 
 * @interface IPoint
 */
interface IPoint
{
	/**
	 * Координата по оси абсцисс
	 */
	readonly x: number;
	/**
	 * Координата по оси ординат
	 */
	readonly y: number;
	/**
	 * Проверка эквивалентности другой точке
	 * 
	 * @param other Другая точка
	 * @returns Точки эквивалентны?
	 */
	isEqual( other: Point ): boolean
}

/**
 * Модуль
 */
export {
	Point as default,
	IPoint,
};
