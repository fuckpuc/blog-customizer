import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import cn from 'classnames';
import {
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Select } from 'components/select/Select';
import { RadioGroup } from '../radio-group';

import styles from './ArticleParamsForm.module.scss';
import { Separator } from '../separator';

interface ArticleParamsFormProps {
	onFormSubmit: (data: ArticleStateType) => void; //Определение типа свойства onFormSubmit.
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	onFormSubmit,
}) => {
	const [isOpen, setIsOpen] = useState(false); // Состояние для открытия/закрытия формы
	const containerOpenStyle = styles.container_open;
	const isAsideOpen = isOpen ? containerOpenStyle : '';
	const formRef = useRef<HTMLDivElement>(null);
	const [formData, setFormData] =
		useState<ArticleStateType>(defaultArticleState); //состояния формы

	useEffect(() => {
		//проверям если форма сайдбара закрыта, то функция ничего не возвращает
		if (!isOpen) {
			return;
		}
		// При клике вне формы закрываем форму
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, formRef]);

	const handleButtonClick = () => {
		setIsOpen(!isOpen); // Изменяем состояние при клике на кнопку
	};

	const handleApplyButtonClick = () => {
		// Применить значения к контенту сайта
		onFormSubmit(formData);
	};

	const handleResetButtonClick = () => {
		// Сбросить значения формы
		setFormData(defaultArticleState);
		// Применить значения к контенту сайта
		onFormSubmit(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleButtonClick} />
			<aside ref={formRef} className={cn(styles.container, isAsideOpen)}>
				<form className={styles.form}>
					<h2 className={styles.form_title}>Задайте параметры</h2>
					<Select
						options={fontFamilyOptions}
						selected={formData.fontFamilyOption}
						title='Шрифт'
						onChange={(selectedOption) => {
							setFormData({ ...formData, fontFamilyOption: selectedOption });
						}}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={formData.fontSizeOption}
						onChange={(selectedOption) => {
							setFormData({ ...formData, fontSizeOption: selectedOption });
						}}
					/>
					<Select
						options={fontColors}
						selected={formData.fontColor}
						title='Цвет шрифта'
						onChange={(selectedOption) => {
							setFormData({ ...formData, fontColor: selectedOption });
						}}
					/>
					<Separator></Separator>
					<Select
						options={backgroundColors}
						selected={formData.backgroundColor}
						title='Цвет фона'
						onChange={(selectedOption) => {
							setFormData({ ...formData, backgroundColor: selectedOption });
						}}
					/>
					<Select
						options={contentWidthArr}
						selected={formData.contentWidth}
						title='Ширина контента'
						onChange={(selectedOption) => {
							setFormData({ ...formData, contentWidth: selectedOption });
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='button'
							onClick={handleResetButtonClick}
						/>
						<Button
							title='Применить'
							type='button'
							onClick={handleApplyButtonClick}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};

// const applyFormData = (formData: ArticleStateType) => {};
