import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Admin = () => {
	const [data, setData] = useState({
		translation: '',
		error: '',
		loading: false,
	});
	const [image, setImage] = useState(null);

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
	const handleSubmit = async (e) => {
		try {
			console.log(storage);
			e.preventDefault();
			let url = '';
			let imagePath = '';
			if (image) {
				const imageRef = ref(
					storage,
					`gifs/${new Date().getTime()}-${image.name}`
				);
				const snap = await uploadBytes(imageRef, image);
				const dlUrl = await getDownloadURL(
					ref(storage, snap.ref.fullPath)
				);
				imagePath = snap.ref.fullPath;
				url = dlUrl;
			}

			const newDoc = await addDoc(collection(db, 'gifs'), {
				translation: translation,
				gifUrl: url,
				gifPath: imagePath,
			});

			await updateDoc(doc(db, 'gifs', newDoc.id), {
				uid: newDoc.id,
			});

			setData({
				translation: '',
				error: '',
				loading: false,
			});

			setImage(null);
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
						{loading ? 'Submitting' : 'Submit'}
					</button>
				</form>
			</div>
		</>
	);
};

export default Admin;
