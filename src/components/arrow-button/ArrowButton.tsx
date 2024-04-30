import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import classnames from 'classnames';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonConfig {
	onClick: OnClick;
	isOpen: boolean;
}

export const ArrowButton = ({ onClick, isOpen }: ArrowButtonConfig) => {
	const containerOpenStyle = styles.container_open;
	const buttonOpenStyle = styles.arrow_open;
	const isAsideOpen = isOpen ? containerOpenStyle : '';
	const isButtonOpen = isOpen ? buttonOpenStyle : '';
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={classnames(styles.container, isAsideOpen)}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={classnames(styles.arrow, isButtonOpen)}
			/>
		</div>
	);
};
