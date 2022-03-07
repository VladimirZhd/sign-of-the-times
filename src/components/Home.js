import React, { useState } from 'react';

const Home = () => {
	const [data, setData] = useState({
		searchPhrase: '',
		result: null,
		error: '',
		loading: false,
	});
	const { searchPhrase, error, loading, result } = data;

	const handleChange = (e) => {
		setData({ ...data, searchPhrase: e.target.value });
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
		} catch (error) {
			setData({ ...data, error: error.message });
		}
	};
	return (
		<>
			<div className='search-container'>
				<form onSubmit={handleSubmit}>
					<div className='search'>
						<label htmlFor='search'>Search</label>
						<input
							type='text'
							name='search'
							value={searchPhrase}
							onChange={handleChange}
						/>
					</div>
					{error && <p className='error'>{error}</p>}
					<button type='submit' className='btn'>
						{loading ? 'Searching' : 'Search'}
					</button>
				</form>
			</div>
			{result && (
				<div className='result-container'>
					<img src='#' alt='#' />
					<p>result.translation</p>
				</div>
			)}
		</>
	);
};

export default Home;
