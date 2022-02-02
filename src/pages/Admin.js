import React, { useState } from 'react';

const Admin = () => {
	const [data, setData] = useState({
		translation: '',
		error: '',
		loading: false,
	});
	const [image, setImage] = useState();

	// Extract variables from state
	const { translation, error, loading } = data;

	// Handle input change
	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	// Handle file upload
	const handleImageChange = (e) => {
		console.log(e);
		setImage(e.target.files[0]);
	};

	// Handle form submission
	const handleSubmit = (e) => {
		try {
			e.preventDefault();
		} catch (error) {
			setData({ ...data, error: error.message });
		}
	};
	return (
		<>
			<div className='admin-wrapper'>
				<h2 className='admin-title'>Add a new sign</h2>
				<form className='admin-form' onSubmit={handleSubmit}>
					<div className='translation'>
						<label htmlFor='translation'>Translation</label>
						<input
							type='text'
							name='translation'
							value={translation}
							onChange={handleChange}
						/>
					</div>
					<div className='gif'>
						<input
							type='file'
							accept='image/*'
							name='gif'
							onChange={handleImageChange}
						/>
					</div>
					{error && <p className='error'>{error}</p>}
					<button className='btn' type='submit'>
						Submit
					</button>
				</form>
			</div>
		</>
	);
};

export default Admin;
