
import styles from './slider.module.css';
import { useEffect, useRef, useState } from "react";
import cn from 'classnames';
import useResize from "../../hooks/use-resize";
import { Link } from "react-router-dom";

const Slider = () => {

	const [count, setCount] = useState<number>(0);
	const [sliderWidth, setSliderWidth] = useState<number>(0);
	const divBlock = useRef<HTMLDivElement | null>(null);
	const { width } = useResize();

	const showDivWidth = () => {
		return divBlock?.current?.getBoundingClientRect().width
	};

	useEffect(() => {
		divBlock && showDivWidth();
		//2187 и 1287 взяты из суммы ширины всех эллементов слайдера и гэпов
		setSliderWidth(width > 599 ? 2178 - showDivWidth() : 1287 - showDivWidth());
	}, [width])

	const onChangeSlider = (num) => {
		if (count === 0 && num > 0) return
		if (count < -(sliderWidth) && num < 0) return
		setCount(count => count + num)
	};

	const styleTransform = {
		transform: `translate(${count}px, ${0}px)`
	};

	return (
		<div className={styles.Slider}>
			<div className={styles.wrapperMenu}>
				<p className={styles.title}>Меню</p>
				<div className={styles.wrapperArrow}>
					<button onClick={() => onChangeSlider(223)} type='button' className={cn(styles.button, {
						[styles.buttonActive]: count < 0
					})}>
						<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M2.44784e-06 28C3.79974e-06 12.536 12.536 -3.79974e-06 28 -2.44784e-06C43.464 -1.09593e-06 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 1.09593e-06 43.464 2.44784e-06 28ZM1.12001 28C1.12001 13.1546 13.1546 1.12 28 1.12C42.8454 1.12 54.88 13.1546 54.88 28C54.88 42.8454 42.8454 54.88 28 54.88C13.1546 54.88 1.12 42.8454 1.12001 28ZM21.2664 36.4L12.8802 28.0068L12.8869 28.0001L12.88 27.9932L21.2662 19.6L22.7511 21.0861L16.8998 26.9423L41.72 26.9423L41.72 29.044L16.8863 29.044L22.7513 34.9139L21.2664 36.4Z" fill="gray" />
						</svg>
					</button>
					<button onClick={() => onChangeSlider(-223)} type='button' className={cn(styles.button, {
						[styles.buttonActive]: (count <= 0) && (count > -(sliderWidth))
					})}>
						<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd" d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28ZM54.88 28C54.88 42.8454 42.8454 54.88 28 54.88C13.1546 54.88 1.12 42.8454 1.12 28C1.12 13.1546 13.1546 1.12 28 1.12C42.8454 1.12 54.88 13.1546 54.88 28ZM34.7336 19.6L43.1198 27.9932L43.1131 27.9999L43.12 28.0068L34.7338 36.4L33.2489 34.9139L39.1002 29.0576H14.28V26.9559H39.1137L33.2487 21.0861L34.7336 19.6Z" fill="gray" />
						</svg>
					</button>
				</div>
			</div>

			<div  className={styles.wrapperItems} ref={divBlock}>
				<Link className={styles.link} to={'/catalog/stock'}>
					<img className={styles.img} style={styleTransform} src="/slider/stock.png" alt="Акции" />
				</Link>
				<Link to={'/catalog/hot'}>
					<img className={styles.img} style={styleTransform} src="/slider/hot.png" alt="Горячие блюда" />
				</Link>
				<Link to={'/catalog/soups'}>
					<img className={styles.img} style={styleTransform} src="/slider/soups.png" alt="Супы" />
				</Link>
				<Link to={'/catalog/khinkali'}>
					<img className={styles.img} style={styleTransform} src="/slider/khinkali.png" alt="Хинкали" />
				</Link>
				<Link to={'/catalog/cold'}>
					<img className={styles.img} style={styleTransform} src="/slider/cold.png" alt="Холодные закуски" />
				</Link>
				<Link to={'/catalog/salads'}>
					<img className={styles.img} style={styleTransform} src="/slider/salads.png" alt="Салаты" />
				</Link>
				<Link to={'/catalog/bakery'}>
					<img className={styles.img} style={styleTransform} src="/slider/bakery.png" alt="Свежая выпечка" />
				</Link>
				<Link to={'/catalog/dessert'}>
					<img className={styles.img} style={styleTransform} src="/slider/dessert.png" alt="Десерты" />
				</Link>
				<Link to={'/catalog/beverages'}>
					<img className={styles.img} style={styleTransform} src="/slider/beverages.png" alt="Напитки" />
				</Link>








			</div>
		</div>
	)
}


export default Slider;