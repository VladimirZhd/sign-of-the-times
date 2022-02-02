import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';



var searched = document.getElementById("search");
function Search() {
	document.getElementById("x").innerHTML = document.getElementById("searcher").value;
}

function Submission() {
	document.getElementById("thanks").innerHTML = "Thank you, the translation has been put on the cloud";
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);


