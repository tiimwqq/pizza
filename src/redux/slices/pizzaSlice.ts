import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface IpizzaItems {
	id: string;
	title: string;
	imageUrl: string;
	price: number;
	types: number[];
	sizes: number[];
}

enum initialStateStatus {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

interface IpizzaInitialState {
	items: IpizzaItems[];
	status: initialStateStatus
}

type fetchPizzasArgs = {
	categoryId: number;
	sort: string;
	value: string;
	paginationId: number;
}

export const fetchPizzas = createAsyncThunk<IpizzaItems[], fetchPizzasArgs>(
	'pizzas/fetchPizzas',
	async ({ categoryId, sort, value, paginationId }) => {
		const { data } = await axios.get<IpizzaItems[]>(`https://66f02d71f2a8bce81be53926.mockapi.io/pizzas?${categoryId ? `category=${categoryId}` : ''}&sortBy=${sort}&order=${value}&p=${paginationId + 1}&l=6`);
		return data
	},
)



const initialState: IpizzaInitialState = {
	items: [],
	status: initialStateStatus.LOADING
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
			state.status = initialStateStatus.LOADING
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = initialStateStatus.SUCCESS

		});
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.items = []
			state.status = initialStateStatus.ERROR

		});
	}
})

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;


