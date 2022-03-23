import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebase';

import Card from 'react-bootstrap/Card';

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
				where('translation', 'array-contains', searchPhrase)
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
					error: '',
				});
			} else {
				setData({
					...data,
					error: '',
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
				<form onSubmit={handleSubmit} className="search-grid">
					<div className='search'>
						<input
							className='search-input'
							type='text'
							placeholder="search"
							name='search'
							value={searchPhrase}
							onChange={handleChange}
						/>
					</div>
					{error && <p className='error'>{error}</p>}
					<button type='submit' className='btn'>
						{loading ? '........' : 'Search'}
					</button>
				</form>
			</div>
			{result &&
				result.map((gif) => (

					<div className='result-container'>
						<Card className ='result'
								border='secondary'
								style={{ width: '18rem'}}
								key={gif.uid}>
								<Card.Img variant='top' src={gif.gifUrl} />
								<Card.Body>
									<Card.Title style={{}}>
										{gif.translation}
									</Card.Title>
									{/* <Card.Text>
						This is a longer card with supporting text below as a natural
						lead-in to additional content. This content is a little bit longer.
					  </Card.Text> */}
								</Card.Body>
							</Card>
						{/* <img src={gif.gifUrl} alt={gif.translation} />
						<p>{gif.translation}</p> */}

					{/* <div className='result-container' key={gif.uid}>
						<img src={gif.gifUrl} alt={gif.translation} />
						<p>{gif.translation.join(' ')}</p> */}

					</div>
				))}
		</>
	);
};

export default Home;