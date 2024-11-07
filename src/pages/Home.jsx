import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock'
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pagination from '../components/Pagination';
import { setCategoryId } from '../redux/slices/filterSlice'


const Home = ({ searchValue }) => {

	const [pizza, setPizza] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [paginationId, setPaginationId] = useState(0);

	const categoryId = useSelector(state => state.filter.categoryId);
	const sort = useSelector(state => state.filter.sort)
	const dispatch = useDispatch();


	useEffect(() => {
		setIsLoading(true)


		axios.get(`https://66f02d71f2a8bce81be53926.mockapi.io/pizzas?${categoryId ? `category=${categoryId}` : ''}&sortBy=${sort.sortProperty}&order=${sort.value}&p=${paginationId + 1}&l=6`)
			.then(res => {
				setPizza(res.data)
				setIsLoading(false)
			})

		if (categoryId >= 1) {
			setPaginationId(0)
		}

		window.scrollTo(0, 0)
	}, [categoryId, sort, searchValue, paginationId])


	return (
		<div className="container">
			<div className="content__top">
				<Categories categoryId={categoryId} setCategoryId={(i) => dispatch(setCategoryId(i))} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
					: pizza
						.filter(item => (
							item.title.toLowerCase().includes(searchValue.toLowerCase())
						))
						.map(obj => (
							<PizzaBlock {...obj} key={obj.id} />
						))
				}
			</div>
			<Pagination paginationId={paginationId} setPaginationId={setPaginationId} />
		</div>
	);
};

export default Home;