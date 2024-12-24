import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort, SortProps } from '../redux/slices/filterSlice';
import React from 'react';
import { RootState } from '../redux/store';

export const sortList: SortProps[] = [
	{ name: 'популярности ↓', sortProperty: 'rating', value: 'desc' },
	{ name: 'популярности ↑', sortProperty: 'rating asc', value: 'asc' },
	{ name: 'цене ↓', sortProperty: 'price', value: 'desc' },
	{ name: 'цене ↑', sortProperty: 'price asc', value: 'asc' },
	{ name: 'алфавиту ↓', sortProperty: 'title', value: 'desc' },
	{ name: 'алфавиту ↑', sortProperty: 'title asc', value: 'asc' },
]



const Sort: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);

	const { sort } = useSelector((state: RootState) => state.filter);
	const dispatch = useDispatch();
	const sortRef = useRef<HTMLDivElement>(null);

	const onClickListActive = (sort: SortProps) => {
		dispatch(setSort(sort));
		setIsVisible(false)
	}

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
				setIsVisible(false)
				console.log('click')
			}
		}

		document.body.addEventListener('click', handleClickOutside)

		return () => {
			document.body.removeEventListener('click', handleClickOutside)
			console.log('click remove')
		}
	}, [])


	return (
		<div ref={sortRef} className="sort">
			<div onClick={() => setIsVisible(!isVisible)} className="sort__label">
				<svg
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Сортировка по:</b>
				<span >{sort.name}</span>
			</div>
			{isVisible && (
				<div className="sort__popup">
					<ul>
						{sortList.map((item, index) => (
							<li
								onClick={() => onClickListActive(item)}
								className={sort.sortProperty === item.sortProperty ? 'active' : ''}
								key={index}
							>{item.name}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Sort;