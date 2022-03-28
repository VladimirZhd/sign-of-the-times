import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

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
				<div className='result-container' key={gif.uid}>
					<img src={gif.gifUrl} alt={gif.translation} />
					<p>{gif.translation.join(' ')}</p>
					<p>{gif.description.join(' ')}</p>
				</div>
			)}
		</>
	);
};

export default Details;
