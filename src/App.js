/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import GIFtionary from './pages/GIFtionary';
import Admin from './pages/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { updateGifs } from './store/reducers/gifsReducer';

function App() {
	const gifs = useSelector((state) => state.gifs.data);
	const dispatch = useDispatch();

	useEffect(() => {
		if (gifs.length > 0) return;
		const q = collection(db, 'gifs');

		const unsub = onSnapshot(q, (querySnap) => {
			const fetchedGifs = [];
			querySnap.docs.forEach((doc) => {
				fetchedGifs.push(doc.data());
			});
			dispatch(updateGifs(fetchedGifs));
		});
		return unsub;
	}, []);
	return (
		<>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path='/admin' element={<Admin />} />
					<Route path='/' element={<Home />} />
					<Route path='/giftionary' element={<GIFtionary />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
