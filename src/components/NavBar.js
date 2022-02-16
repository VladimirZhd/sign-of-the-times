import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<>	
		

		<ul className='nav-bar'>
			<li className="nav_button"><Link to="/"><button type="button" className='Home-Button' className='button'>Home</button></Link></li>
			<li className="nav_button"><Link to="/giftionary"><button type="button" className='GIFtionary-Button' className='button'>GIFtionary</button></Link></li>
		</ul>


		</>
	);
};

export default NavBar;