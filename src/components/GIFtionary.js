import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import {getDocs, collection, query} from "firebase/firestore" 
import {db} from "../firebase"
import { map } from '@firebase/util';

const GIFtionary = () => {
	const [gifs, setGifs] = useState([])
	useEffect(()=>{
		const gifQuery = query(collection(db, "gifs"))
		getDocs(gifQuery).then(querySnapshot=>{
			const data = []
			querySnapshot.forEach(doc=>{
				data.push(doc.data())
			})
			setGifs(data)
		})
	},[])
	return (
		
		<>
		<div className='GIFtionary-wrapper'>GIF Dictionary Page</div>
			{gifs.length > 0 && gifs.map(gif => (
				<div>
					<img src={gif.gifUrl} alt="gif of a sign in sign language"/>
					<p>{gif.translation}</p>
				</div>
			))}
		</>
	);
};

export default GIFtionary;