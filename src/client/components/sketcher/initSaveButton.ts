/**
 * Инициализация кнопки сохранения холста
 * @module
 */
;

/**
 * Инициализация кнопки сохранения холста
 * 
 * @param button Ссылка сохранения
 * @param canvas Сохраняемый холст
 * @param onSave Действия при сохранении
 */
function main( button: HTMLAnchorElement, canvas: HTMLCanvasElement,
	onSave: ( save: () => void ) => void ): void
{
	button.href = canvas.toDataURL( 'image/png' );
	button.download = 'picture.png';
	
	const save = (): void =>
	{
		button.href = canvas.toDataURL();
	};
	const onClick = (): void =>
	{
		onSave( save );
	};
	button.addEventListener( 'click', onClick );
	button.addEventListener( 'focus', onClick, true );
}

/**
 * Модуль
 */
export {
	main as default,
};
