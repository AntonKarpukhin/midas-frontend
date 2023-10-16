import Button from './components/button/button';
import Input from './components/input/input';
import Header from './components/header/header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './app.module.css';



function App() {

	return (
		<div className={styles.app}>
			<Header/>
			{/*<Button onClick={() => console.log('123')}  appearance='big'>text2</Button>*/}
			{/*<Button onClick={() => console.log('123')}  appearance='small'>text2</Button>*/}
			{/*<Input name='name' type='text' appearance='big' children='Имя'/>*/}
			<main>
				<Outlet/>
			</main>
		</div>
	);
}

export default App;

