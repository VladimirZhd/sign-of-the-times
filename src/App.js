import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
function App() {
	
	return (
	<>
	<NavBar/>
	<Home />
	</>	
	);
}

export default App;
