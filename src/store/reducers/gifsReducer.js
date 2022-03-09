import { createSlice } from '@reduxjs/toolkit';

export const gifsSlice = createSlice({
	name: 'gifs',
	initialState: {
		data: [],
	},
	reducers: {
		updateGifs: (state, action) => {
			const records = action.payload;

			if (!records?.length) {
				return;
			}

			state.data = records;
			state.lastRetrieved = new Date().getTime();
		},
		clearGifs: (state) => {
			state.data = [];
			state.lastRetrieved = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const { updateGifs, clearGifs } = gifsSlice.actions;

export default gifsSlice.reducer;
