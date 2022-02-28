import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav>
			<ul className='nav-bar'>
				<li className='nav_button'>
					<Link to='/'>Home</Link>
				</li>
				<li className='nav_button'>
					<Link to='/giftionary'>GIFtionary</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
