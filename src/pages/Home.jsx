import React from 'react';
import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock'
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';


const Home = ({ searchValue }) => {

	const [pizza, setPizza] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [categoryId, setCategoryId] = useState(0);
	const [sort, setSort] = useState(
		{ name: 'популярности ↓', sortProperty: 'rating', value: 'desc' },
	);


	useEffect(() => {
		setIsLoading(true)
		fetch(`https://66f02d71f2a8bce81be53926.mockapi.io/pizzas?${categoryId ? `category=${categoryId}` : ''}&sortBy=${sort.sortProperty}&order=${sort.value}`)
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


		window.scrollTo(0, 0)
	}, [categoryId, sort])



	return (
		<div className="container">
			<div className="content__top">
				<Categories categoryId={categoryId} setCategoryId={(i) => setCategoryId(i)} />
				<Sort sort={sort} setSort={(i) => setSort(i)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
					: pizza
						.filter(obj => (
							obj.title.toLowerCase().includes(searchValue.toLowerCase())
						))
						.map(obj => (
							<PizzaBlock {...obj} key={obj.id} />
						))
				}
			</div>
		</div>
	);
};

export default Home;