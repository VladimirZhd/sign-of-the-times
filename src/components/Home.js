import React from 'react';

const Home = () => {
	var searched = document.getElementById("search");
    function Search(e) {
        document.getElementById("x").innerHTML = e.target.value;}
		function Submission() {
			document.getElementById("thanks").innerHTML = "Thank you, the translation has been put on the cloud";}
	return (
	<>
		<h1>
		The Hippest Gang Signs
		</h1>
		<input type="text" id="searcher" onChange={Search}/>
		<p id="x"> </p>
		<h3>Submit a translation</h3>
		<input type="file"
		id="sign" name="sign"
		accept="image/png, image/jpeg, image/gif"/>
		<p> Translation </p>
		<input type="text" id="word"/>
		<button onClick={Submission}>Submit</button><br/><br/><br/>
		<p id="thanks"></p>
	</>
	);
};

export default Home;
