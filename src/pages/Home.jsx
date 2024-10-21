import React from 'react';
import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock'
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';


const Home = () => {

	const [pizza, setPizza] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch('https://66f02d71f2a8bce81be53926.mockapi.io/pizzas')
			.then(res => {
				return res.json()
			})
			.then(json => {
				setPizza(json)
				console.log(json)
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => setIsLoading(false))

	}, [])



	return (
		<>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
					: pizza.map((obj) => (
						<PizzaBlock key={obj.id} {...obj} />
					))
				}
			</div>
		</>
	);
};

export default Home;