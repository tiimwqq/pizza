import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import qs from 'qs'

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock'
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pagination from '../components/Pagination';
import { setCategoryId, setFilter } from '../redux/slices/filterSlice'


const Home = ({ searchValue }) => {

	const [pizza, setPizza] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [paginationId, setPaginationId] = useState(0);

	const categoryId = useSelector(state => state.filter.categoryId);
	const sort = useSelector(state => state.filter.sort);
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const fetchPizzas = () => {
		setIsLoading(true);
		axios.get(`https://66f02d71f2a8bce81be53926.mockapi.io/pizzas?${categoryId ? `category=${categoryId}` : ''}&sortBy=${sort.sortProperty}&order=${sort.value}&p=${paginationId + 1}&l=6`)
			.then(res => {
				setPizza(res.data)
				setIsLoading(false)
			})

		if (categoryId >= 1) {
			setPaginationId(0)
		}
	}


	// если был первый рендер проверяем url и сохраняем данные в redux
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)); //находим параметры строки и парсим ее
			const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);
			const value = sortList.find(obj => obj.value === params.value);


			dispatch(
				setFilter({
					...params,
					sort,
					value,
				})
			)

			isSearch.current = true
		}
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0)

		if (!isSearch.current) {
			fetchPizzas()
		}

		isSearch.current = false
	}, [categoryId, sort, searchValue, paginationId])


	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				value: sort.value,
				categoryId,
				paginationId,
			});
			navigate(`?${queryString}`) //создаем строку для вшития в url	
		}

		isMounted.current = true
	}, [categoryId, sort, paginationId, navigate])

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