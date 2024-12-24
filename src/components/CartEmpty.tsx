import { Link } from 'react-router-dom';
import cartEmptyImg from '../assets/img/empty-cart.png'
import React from 'react';

const CartEmpty: React.FC = () => {
	return (
		<div>
			<div className="cart cart--empty">
				<h2>Корзина пустая <span>😕</span></h2>
				<p>Вероятней всего, вы не заказывали ещё пиццу.
					Для того, чтобы заказать пиццу, перейди на главную страницу.
				</p>
				<img src={cartEmptyImg} alt="Empty cart"></img>
				<Link className="button button--black" to="/">
					<span>Вернуться назад</span>
				</Link>
			</div>
		</div>
	);
};

export default CartEmpty;