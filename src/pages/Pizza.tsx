import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

type PizzaItem = {
	imageUrl: string;
	title: string;
	price: string;
}

const Pizza: React.FC<PizzaItem> = () => {
	const { id } = useParams();
	const [pizza, setPizza] = useState<PizzaItem>();
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

	if (!pizza) {
		return <>загрузка...</>
	}

	return (
		<div className='container'>
			<img src={pizza.imageUrl} alt="" />
			<h2 >{pizza.title}</h2>
			<h2>{pizza.price}</h2>
		</div>
	);
};

export default Pizza;