import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';



var searched = document.getElementById("search");
function Search() {
	document.getElementById("x").innerHTML = document.getElementById("searcher").value;
}



ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);


