import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { addProduct } from '../../redux/slices/cartSlice'
import { RootState } from '../../redux/store'
import { IcartItems } from '../../redux/slices/types'
import React from 'react';

type PizzaBlockProps = {
	id: string;
	title: string;
	imageUrl: string;
	price: number;
	types: number[];
	sizes: number[];
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, imageUrl, price, types, sizes }) => {

	const [activeType, setActiveType] = useState(0);
	const [activeSize, setActiveSize] = useState(0);
	const countProduct = useSelector((state: RootState) => state.cart.items.find((obj: { id: string; }) => obj.id === id))
	const dispatch = useDispatch();

	const onClickAdd = () => {
		const item: IcartItems = {
			id,
			title,
			imageUrl,
			price,
			type: types[activeType] === 0 ? 'тонкое' : 'традиционное',
			size: `${sizes[activeSize]} см`,
			count: 0
		}
		dispatch(addProduct(item))
	}

	return (
		<div className="pizza-block-wrapper">
			<div className="pizza-block">
				<Link to={`/pizzas/${id}`}>
					<img
						className="pizza-block__image"
						src={imageUrl}
						alt="Pizza"
					/>
					<h4 className="pizza-block__title">{title}</h4>
				</Link>
				<div className="pizza-block__selector">
					<ul>
						{types.map((type, index) => (
							<li onClick={() => setActiveType(index)}
								key={index}
								className={activeType === index ? 'active' : ''}>
								{type === 0 ? 'тонкое' : 'традиционное'}
							</li>
						))}

					</ul>
					<ul>
						{sizes.map((size, index) => (
							<li onClick={() => setActiveSize(index)}
								key={index}
								className={activeSize === index ? 'active' : ''}>{size} см</li>
						))}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">от {price} ₽</div>
					<button onClick={onClickAdd} className="button button--outline button--add">
						<svg
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
								fill="white"
							/>
						</svg>
						<span>Добавить</span>
						{countProduct && <i>{countProduct.count}</i>}
					</button>
				</div>
			</div>
		</div>
	);
}

export default PizzaBlock;