import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Details = () => {
	// grab the id from the url
	const { id } = useParams();
	// create a gif state
	const [gif, setGif] = useState(null);

	useEffect(() => {
		if (id) {
			// read from the database using the id
			getDoc(doc(db, 'gifs', id)).then((doc) => {
				setGif(doc.data());
			});
		}
	}, [id]);
	return (
		<>
			{gif && (
				<div className='result-container-detail' key={gif.uid}>
					<Container fluid='90%' className='result-container-detail'>
						<div key={gif.uid}>
							<Row
								style={{
									paddingBottom: '0.3em',
									paddingTop: '1em',
								}}>
								<Col></Col>
								<Col sm={6} className='outline-results'>
									<h1>{gif.translation}</h1>
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
				</div>
			)}
		</>
	);
};

export default Details;
