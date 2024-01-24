import loaderGif from '/loaderGif.gif'
import styles from './loading.module.css';

const Loading = () => {

	return (
		<div className={styles.wrapper}>
			<img className={styles.loading} src={loaderGif} alt="Загрузка"/>
		</div>
	)
}

export default Loading;