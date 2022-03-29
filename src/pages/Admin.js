import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Admin = () => {
	// create state variables for admin page
	const [data, setData] = useState({
		translation: '',
		description: '',
		error: '',
		loading: false,
	});
	const [gif, setGif] = useState(null);
	const [image, setImage] = useState(null);

	// Extract variables from state
	const { translation, description, error, loading } = data;

	// Handle input change
	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	// Handle file upload
	const handleGifChange = (e) => {
		setGif(e.target.files[0]);
	};

	// Handle file upload
	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		try {
			setData({ ...data, loading: true });
			// Prevent page reload on submit
			e.preventDefault();
			let imageUrl = '';
			let imagePath = '';
			let gifPath = '';
			let gifUrl = '';
			// check for errors
			if (!translation || !image || !description) {
				setData({ ...data, error: 'All fields are required.' });
				return;
			}

			// Split inputs
			const translationArray = translation.split(' ');
			const descriptionArray = description.split(' ');

			// If the image was added then upload it to the storage
			if (image) {
				// Create image reference
				const imageRef = ref(
					storage,
					`images/${new Date().getTime()}-${image.name}`
				);
				// save snapshot of uploaded image
				const snap = await uploadBytes(imageRef, image);
				// save download url to use it in `img` tag to display gif
				const dlUrl = await getDownloadURL(
					ref(storage, snap.ref.fullPath)
				);
				// save image path to delete gif if record is deleted in the database
				imagePath = snap.ref.fullPath;
				imageUrl = dlUrl;
			}
			if (gif) {
				// Create image reference
				const gifRef = ref(
					storage,
					`gifs/${new Date().getTime()}-${gif.name}`
				);
				// save snapshot of uploaded image
				const snap = await uploadBytes(gifRef, gif);
				// save download url to use it in `img` tag to display gif
				const dlUrl = await getDownloadURL(
					ref(storage, snap.ref.fullPath)
				);
				// save image path to delete gif if record is deleted in the database
				gifPath = snap.ref.fullPath;
				gifUrl = dlUrl;
			}
			// Add a new record to the database
			const newDoc = await addDoc(collection(db, 'gifs'), {
				translation: translationArray,
				description: descriptionArray,
				gifUrl: gifUrl,
				gifPath: gifPath,
				imageUrl: imageUrl,
				imagePath: imagePath,
			});
			// Update the record to include auto created unique id
			await updateDoc(doc(db, 'gifs', newDoc.id), {
				uid: newDoc.id,
			});
			// set state to default
			setData({
				translation: '',
				description: '',
				error: '',
				loading: false,
			});
			// set image to null
			setImage(null);
			setGif(null);
		} catch (error) {
			setData({ ...data, error: error.message });
		}
	};
	return (
		<>
			<div className='admin-container'>
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
					<div className='description'>
						<label htmlFor='description'>Description</label>
						<input
							type='text'
							name='description'
							value={description}
							onChange={handleChange}
						/>
					</div>
					<div className='gif-selection'>
						<div className='gif-btn'>
							<label htmlFor='gif'>Gif</label>
							<input
								type='file'
								accept='image/*'
								name='gif'
								value={gif}
								onChange={handleGifChange}
							/>
						</div>
						<div className='image-btn'>
							<label htmlFor='image'>Image</label>
							<input
								type='file'
								accept='image/*'
								name='image'
								value={image}
								onChange={handleImageChange}
							/>
						</div>
					
						{error && <p className='error'>{error}</p>}
						<button className='admin-btn' type='submit'>
							{loading ? 'Submitting' : 'Submit'}
						</button>

					</div>
				</form>
			</div>
			</div>
		</>
	);
};

export default Admin;
