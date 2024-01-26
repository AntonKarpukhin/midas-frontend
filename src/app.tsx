import { ReactNode } from 'react';
import styles from './app.module.css';

function App({ children }: { children: ReactNode }): JSX.Element {

	return (
		<div className={styles.app}>
			{children}
		</div>
	)
}

export default App
