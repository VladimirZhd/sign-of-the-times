import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebase';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { map } from '@firebase/util';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import friend from './friend.gif';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/Form'


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
		<Container>
			<div className='search-container'>
				<form onSubmit={handleSubmit}>
					<div className='search' >
						<label htmlFor='search'></label>
						<input
							type='text'
							name='search'
							value={searchPhrase}
							onChange={handleChange}
						/>
					</div>
					{error && <p className='error'>{error}</p>}
					<button type='submit' >
						{loading ? 'Searching' : 'Search'}
					</button>
				</form>
			</div>
			</Container>
			{result &&
				result.map((gif) => (
					<Container >
					<div className='result-container' key={gif.uid}>
						<Row>
						<h1>{gif.translation}</h1>
						</Row>
						<Row auto >
							<Col lg={true}>
						<img src={gif.gifUrl} alt={gif.translation} style={{height: "40%", width: "auto"}} />
						</Col>
						<Col lg={true} >
						<p>This is the info once we add it to the database</p>
						</Col>
						</Row>
					</div>
					</Container>
				))}
		</>
	);
};

export default Home;
