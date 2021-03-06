import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebase';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

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
				// Set to the initial state
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
				<form onSubmit={handleSubmit} className='search-grid'>
					<div className='search'>
						<input
							className='search-input'
							type='text'
							placeholder='search'
							name='search'
							value={searchPhrase}
							onChange={handleChange}
						/>
					</div>
					{error && <p className='error'>{error}</p>}

					<button type='submit' className='btn-search'>
						{loading ? '........' : 'Search'}
					</button>
				</form>
			</div>

			{result &&
				result.map((gif) => (
					<Container
						fluid='90%'
						className='result-container'
						key={gif.uid}>
						<div>
							<Row
								style={{
									paddingBottom: '0.3em',
									paddingTop: '1em',
								}}>
								<Col></Col>
								<Col sm={6} className='outline-results'>
									<h1>{gif.translation.join(' ')}</h1>
								</Col>

								<Col></Col>
							</Row>
							<Row>
								<Col md={3}></Col>
								<Col
									md={3}
									style={{ backgroundColor: '#0184BC' }}>
									<img
										src={gif.gifUrl}
										alt={gif.translation.join(' ')}
										style={{
											height: 'auto',
											width: '100%',
										}}
									/>
								</Col>
								<Col md={3} className='outline-results'>
									<p>{gif.description.join(' ')}</p>
								</Col>
								<Col md={2}></Col>
							</Row>
						</div>
					</Container>
				))}
		</>
	);
};

export default Home;
