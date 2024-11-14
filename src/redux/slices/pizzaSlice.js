import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchPizzas = createAsyncThunk(
	'pizzas/fetchPizzas',
	async ({ categoryId, sort, value, paginationId }) => {
		const { data } = await axios.get(`https://66f02d71f2a8bce81be53926.mockapi.io/pizzas?${categoryId ? `category=${categoryId}` : ''}&sortBy=${sort}&order=${value}&p=${paginationId + 1}&l=6`);

		return data
	},
)

const initialState = {
	items: [],
	status: ''
}

export const pizzaSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = 'loading'
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = 'success'

		});
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.items = []
			state.status = 'error'

		});
	}
})

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;


