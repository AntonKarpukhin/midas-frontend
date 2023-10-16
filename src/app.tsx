import Button from './components/button/button';
import Input from './components/input/input';
import Header from './components/header/header';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './app.module.css';



function App() {

	const [tabletMenu, setTabletMenu] = useState<boolean>(false);

	const changeTabletMenu = () => {
		setTabletMenu(menu => !menu);
	};

	return (
		<div className={styles.app}>
			<Header changeTabletMenu={changeTabletMenu} tabletMenu={tabletMenu}/>
			{/*<Button onClick={() => console.log('123')}  appearance='big'>text2</Button>*/}
			{/*<Button onClick={() => console.log('123')}  appearance='small'>text2</Button>*/}
			{/*<Input name='name' type='text' appearance='big' children='Имя'/>*/}
			{!tabletMenu &&
				<main className={styles.main}>
					<Outlet/>
				</main>
			}

		</div>
	);
}

export default App;

