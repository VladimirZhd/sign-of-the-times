import React, { useEffect, useState } from 'react';
import { getDocs, collection, query } from 'firebase/firestore';
import { db } from '../firebase';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const GIFtionary = () => {
	const [gifs, setGifs] = useState([]);
	useEffect(() => {
		const gifQuery = query(collection(db, 'gifs'));
		getDocs(gifQuery).then((querySnapshot) => {
			const data = [];
			querySnapshot.forEach((doc) => {
				data.push(doc.data());
			});
			setGifs(data);
		});
	}, []);

	return (
		<>
			<Container>
				<Row>
					<div className='giftionary-wrapper'></div>
					{gifs.length > 0 &&
						gifs.map((gif) => (
							<Link
								to={`/gif/${gif.uid}`}
								key={gif.uid}
								style={{
									color: 'black',
									textDecoration: 'none',
								}}>
								<Card
									border='secondary'
									style={{ width: '18rem', margin: '1rem' }}>
									<Card.Img variant='top' src={gif.gifUrl} />
									<Card.Body>
										<Card.Title style={{}}>
											{gif.translation.join(' ')}
										</Card.Title>
									</Card.Body>
								</Card>
							</Link>
						))}
				</Row>
			</Container>
		</>
	);
};

export default GIFtionary;
