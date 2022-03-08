import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebase';

const Home = () => {
	// Create a state for search
	const [data, setData] = useState({
		searchPhrase: '',
		result: [],
		error: '',
		loading: false,
	});
	// Extract state variables to local variables
	const { searchPhrase, error, loading, result } = data;
	// Handle searchPhrase change
	const handleChange = (e) => {
		setData({ ...data, searchPhrase: e.target.value });
	};
	// Handle submit
	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			setData({ ...data, loading: true });
			// Create a query to search in the database
			const q = query(
				collection(db, 'gifs'),
				where('translation', '==', searchPhrase)
			);
			// Get docs using query
			const snapGif = await getDocs(q);
			const tempGifs = [];
			// Save docs to a temporal array
			snapGif.docs.forEach((doc) => {
				tempGifs.push(doc.data());
			});
			// Save retrieved docs to the state
			if (tempGifs.length > 0) {
				setData({
					...data,
					result: tempGifs,
					searchPhrase: '',
					loading: false,
				});
			} else {
				setData({
					...data,
					error: 'Not found',
					searchPhrase: '',
					loading: false,
					result: [],
				});
			}
		} catch (error) {
			setData({ ...data, error: error.message });
		}
	};
	return (
		<>
			<div className='search-container'>
				<form onSubmit={handleSubmit}>
					<div className='search'>
						<label htmlFor='search'>Search</label>
						<input
							type='text'
							name='search'
							value={searchPhrase}
							onChange={handleChange}
						/>
					</div>
					{error && <p className='error'>{error}</p>}
					<button type='submit' className='btn'>
						{loading ? 'Searching' : 'Search'}
					</button>
				</form>
			</div>
			{result &&
				result.map((gif) => (
					<div className='result-container' key={gif.uid}>
						<img src={gif.gifUrl} alt={gif.translation} />
						<p>{gif.translation}</p>
					</div>
				))}
		</>
	);
};

export default Home;
