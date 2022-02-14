import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import {getDocs, collection, query} from "firebase/firestore" 
import {db} from "../firebase"

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
		<NavBar/>
		<div className='GIFtionary-wrapper'>GIF Dictionary Page</div>
			
		</>
	);
};

export default GIFtionary;