import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import './components/Header'
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

function App() {


	return (
		<div className="App">
			<div className="wrapper">
				<Header />
				<div className="content">
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
