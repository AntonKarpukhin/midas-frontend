import ProductCard from '../../components/product-card/product-card';
import styles from './catalog.module.css';

const Catalog = () => {
	return (
		<section  className={styles.catalog}>
			<div  className={styles.wrapper}>
				<ProductCard
					id={1}
					title='Оджахури из телятины'
					description='По семейному рецепту: нежнейшее рубленное мясо с экологически чистыми ферме...'
					image='/demo.png'
					price={490}
					calories={430}
				/>
				<ProductCard
					id={2}
					title='Оджахури из телятины2'
					description='По семейному рецепту: нежнейшее рубленное мясо с экологически чистыми ферме...'
					image='/demo.png'
					price={490}
					calories={430}
				/>
				<ProductCard
					id={3}
					title='Оджахури из телятины3'
					description='По семейному рецепту: нежнейшее рубленное мясо с экологически чистыми ферме...'
					image='/demo.png'
					price={490}
					calories={430}
				/>
				<ProductCard
					id={4}
					title='Оджахури из телятины4'
					description='По семейному рецепту: нежнейшее рубленное мясо с экологически чистыми ферме...'
					image='/demo.png'
					price={490}
					calories={430}
				/>
				<ProductCard
					id={5}
					title='Оджахури из телятины5'
					description='По семейному рецепту: нежнейшее рубленное мясо с экологически чистыми ферме...'
					image='/demo.png'
					price={490}
					calories={430}
				/>
				<ProductCard
					id={6}
					title='Оджахури из телятины6'
					description='По семейному рецепту: нежнейшее рубленное мясо с экологически чистыми ферме...'
					image='/demo.png'
					price={490}
					calories={430}
				/>
			</div>
		</section>
	);
};

export default Catalog;