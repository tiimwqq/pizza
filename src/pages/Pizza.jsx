import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Pizza = () => {
	const { id } = useParams();
	const [pizza, setPizza] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchOnePizza() {
			try {
				const { data } = await axios.get(`https://66f02d71f2a8bce81be53926.mockapi.io/pizzas/${id}`);
				setPizza(data);

			} catch (err) {
				alert('ошибка при получении пиццы');
				navigate('/');
			}
		}

		fetchOnePizza()
	}, []);


	return (
		<div className='container'>
			<h1>{pizza.id}</h1>
			<img src={pizza.imageUrl} alt="" />
			<h2>{pizza.title}</h2>
			<h2>{pizza.price}</h2>
		</div>
	);
};

export default Pizza;