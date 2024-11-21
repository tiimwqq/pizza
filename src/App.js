import { Routes, Route } from 'react-router-dom';
import { createContext } from 'react';
import './scss/app.scss';
import './components/Header'
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFoundBlock from './components/NotFoundBlock';
import Pizza from './pages/Pizza';
import MainLayout from './layouts/MainLayout';

export const SearchContext = createContext();

function App() {


	return (
		<div className="App">

			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route path='' element={<Home />} />
					<Route path='cart' element={<Cart />} />
					<Route path='*' element={<NotFoundBlock />} />
					<Route path='pizzas/:id' element={<Pizza />} />
				</Route>
			</Routes>

		</div>
	);
}

export default App;
