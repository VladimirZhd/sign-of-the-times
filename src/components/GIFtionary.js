import React, { useEffect, useState } from 'react';
import { getDocs, collection, query } from 'firebase/firestore';
import { db } from '../firebase';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

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
							<Card
								border='secondary'
								style={{ width: '18rem', margin: '1rem' }}
								key={gif.uid}>
								<Card.Img
									className='btnimg'
									variant='top'
									src={gif.gifUrl}
								/>
								{gif.imageUrl && (
									<Card.Img
										className='topimg'
										variant='top'
										src={gif.imageUrl}
									/>
								)}
								<Card.Body>
									<Card.Title style={{}}>
										{gif.translation}
									</Card.Title>
								</Card.Body>
							</Card>
						))}
				</Row>
			</Container>
		</>
	);
};

export default GIFtionary;
