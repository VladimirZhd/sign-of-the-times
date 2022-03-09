import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';

const GIFtionary = () => {
	let gifs = useSelector((state) => state.gifs.data);

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
							<Card
								border='secondary'
								style={{ width: '18rem', margin: '1rem' }}
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
						))}

					{/* </Row> */}
				</Row>
			</Container>
		</>
	);
};

export default GIFtionary;
