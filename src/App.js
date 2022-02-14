import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import GIFtionary from './components/GIFtionary';
function App() {
	
	return (
	<>
	<BrowserRouter>
		<NavBar/>
		<Routes>
			<Route path="/" element={<Home/>}/>
			<Route path="/giftionary" element={<GIFtionary/>}/>
		</Routes>
	</BrowserRouter>
	</>	
	);
}

export default App;
