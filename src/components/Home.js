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
					<Container className='result-container'>
					<div key={gif.uid}>
						<Row style={{paddingBottom: '0.5em', paddingTop: '1em'}}>
						<Col ></Col>
						<Col sm={6} className='outline-results'><h1 >{gif.translation}</h1></Col>
						
						<Col ></Col>
						</Row>
						<Row >
						<Col></Col>
							<Col style={{backgroundColor:"#0184BC"}}>
						<img src={gif.gifUrl} alt={gif.translation} style={{height: "100%", width: "100%", marginRight:"20em"}}/>
						</Col>
						<Col className='outline-results'>
						<p>This is the info once we add it to the database</p>
						</Col>
						<Col></Col>
						</Row>

					</div>
					</Container>
				))}
		</>
	);
};

export default Home;