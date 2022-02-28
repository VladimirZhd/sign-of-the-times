import React, { useEffect, useState } from 'react';
import { getDocs, collection, query } from 'firebase/firestore';
import { db } from '../firebase';
import { map } from '@firebase/util';

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
			<div className='giftionary-wrapper'>GIF Dictionary Page</div>
			{gifs.length > 0 &&
				gifs.map((gif) => (
					<div key={gif.uid} className='result-wrapper'>
						<p className='Translations'>{gif.translation}</p>
						<img
							className='gifs'
							src={gif.gifUrl}
							key={gif.gifUid}
							alt='gif of a sign in sign language'
						/>
					</div>
				))}
		</>
	);
};

export default GIFtionary;
