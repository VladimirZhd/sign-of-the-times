import { configureStore } from '@reduxjs/toolkit';
import gifsReducer from './reducers/gifsReducer';

export default configureStore({
	reducer: {
		gifs: gifsReducer,
	},
});
