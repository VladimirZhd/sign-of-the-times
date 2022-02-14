import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<>	
		

		<ul className='nav-bar'>
			<li><Link to="/"><button type="button" className='Home-Button' className='button'>Home</button></Link></li>
			<li><Link to="/giftionary"><button type="button" className='GIFtionary-Button' className='button'>GIFtionary</button></Link></li>
		</ul>

		<div className='nav-bar'>This is the header.</div>


		</>
	);
};

export default NavBar;