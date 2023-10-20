import ProductCard from '../../components/product-card/product-card';
import { useEffect, useState } from "react";


const Menu = () => {

	const [state, setState] = useState({})

	const test = async () => {
		const e = await fetch('https://8yfn3y-3000.preview.csb.app/menu')
			.then(res => res.json())
			.then(item => setState(item[0]))
			.catch(err => {
				return [];
			});
		return e;
	};



	useEffect(() => {
		test()

	},[])

console.log(state)

	return (
		<div>
			<h1 style={{color: 'white'}}>Menu</h1>
			{state && <img src={state.imgTop} alt=""/>}
		</div>
	);
};

export default Menu;

// ../../../public