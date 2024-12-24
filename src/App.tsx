import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';
import './components/Header'
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFoundBlock from './components/NotFoundBlock/index';
import Pizza from './pages/Pizza';
import MainLayout from './layouts/MainLayout';
import React from 'react';


const App: React.FC = () => {

	return (
		<div className="App">
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route path='' element={<Home />} />
					<Route path='cart' element={<Cart />} />
					<Route path='*' element={<NotFoundBlock />} />
					<Route path='pizzas/:id' element={<Pizza imageUrl={''} title={''} price={''} />} />
				</Route>
			</Routes>

		</div>
	);
}

export default App;
