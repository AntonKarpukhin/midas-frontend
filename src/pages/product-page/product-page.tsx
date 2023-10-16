import { useParams } from 'react-router-dom';

const ProductPage = () => {

	const { id } = useParams();

	return (
		<>
			<h1 style={{color: 'white'}}>product - {id}</h1>
		</>
	);
};

export default ProductPage;