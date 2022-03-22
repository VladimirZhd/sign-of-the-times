import React, { useEffect, useState } from 'react';
import { getDocs, collection, query } from 'firebase/firestore';
import { db } from '../firebase';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { map } from '@firebase/util';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import friend from './friend.gif';
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
			{/* <Card border="secondary" style={{ width: '18rem' }}>
  <Card.Img variant="top" src='./logo512.png' />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card> */}

			{/* <Row l={2} md={3} className="g-4">
  {Array.from({ length: 6 }).map((_, idx) => (
    <Col>
      <Card>
        <Card.Img variant="top" src={friend} />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row> */}

			{/* <Row l={2} md={3} className="g-3"> */}
			<Container>
				<Row>
					<div className='giftionary-wrapper'></div>
					{gifs.length > 0 &&
						gifs.map((gif) => (
							// <div key={gif.uid} className='result-wrapper'>
							// 	<p className='Translations'>{gif.translation}</p>
							// 	<img
							// 		className='gifs'
							// 		src={gif.gifUrl}
							// 		key={gif.gifUid}
							// 		alt='gif of a sign in sign language'
							// 	/>
							// </div>
							<Card className='gif'
								border='secondary'
								style={{ width: '18rem', margin: '1rem' }}
								key={gif.uid}>
								<Card.Img className="btmimg" variant='top' src={gif.gifUrl} />
								<Card.Img className="topimg" variant='top' src={'https://docs.google.com/drawings/d/e/2PACX-1vQOf72qNFE4S83F8AOFk32tGyzu7qVIoiv8kYfITU3N8YgYMhSZ69-Z2Gnk6buaPu9krqjziqiM9Va0/pub?w=689&h=690'} />
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
						))}

					{/* </Row> */}
				</Row>
			</Container>
		</>
	);
};

export default GIFtionary;
