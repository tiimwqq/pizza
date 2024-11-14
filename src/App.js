import { Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';
import './scss/app.scss';
import './components/Header'
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFoundBlock from './components/NotFoundBlock';

export const SearchContext = createContext();

function App() {

	const [searchValue, setSearchValue] = useState('');

	return (
		<div className="App">
			<div className="wrapper">
				<SearchContext.Provider value={{ searchValue, setSearchValue }}>
					<Header />
					<div className="content">
						<Routes>
							<Route path='/' element={<Home searchValue={searchValue} setSearchValue={setSearchValue} />} />
							<Route path='/cart' element={<Cart />} />
							<Route path='*' element={<NotFoundBlock />} />
						</Routes>
					</div>
				</SearchContext.Provider>
			</div>
		</div>
	);
}

export default App;
