import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Admin from './pages/Admin';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/admin' element={<Admin />} />
				<Route exact path='/' element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
