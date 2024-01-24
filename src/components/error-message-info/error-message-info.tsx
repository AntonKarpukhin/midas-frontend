import styles from './error-message-info.module.css';

const ErrorMessageInfo = ({error}: {error: string}) => {
	return (
		<h2 className={styles.error}>{error}</h2>
	)
};

export default ErrorMessageInfo;