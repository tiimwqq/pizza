import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs'

import NotFoundBlock from '../components/NotFoundBlock'
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock'
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pagination from '../components/Pagination';
import { setCategoryId, setFilter } from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzaSlice'


const Home = () => {
	const [paginationId, setPaginationId] = useState(0);

	const { items, status } = useSelector(state => state.pizzas)
	const { categoryId, sort, searchValue } = useSelector(state => state.filter);
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const getPizzas = async () => {

		dispatch(fetchPizzas({
			categoryId,
			sort: sort.sortProperty,
			value: sort.value,
			paginationId
		}))

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
			getPizzas()
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
			{status === 'error' ?
				<NotFoundBlock />
				: (
					<>
						<h2 className="content__title">Все пиццы</h2>
						<div className="content__items">
							{status === 'loading'
								? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
								: items
									.filter(item => (
										item.title.toLowerCase().includes(searchValue.toLowerCase())
									))
									.map(obj => (
										<Link to={`/pizzas/${obj.id}`} key={obj.id}><PizzaBlock {...obj} /></Link>
									))
							}
						</div>
					</>
				)}

			<Pagination paginationId={paginationId} setPaginationId={setPaginationId} />
		</div>
	);
};

export default Home;