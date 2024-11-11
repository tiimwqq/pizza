import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	totalPrice: 0,
	items: []
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct(state, { payload }) {
			const findItem = state.items.find(obj => {
				return ((obj.id === payload.id) &&
					(obj.size === payload.size) &&
					(obj.type === payload.type))
			});
			findItem ? findItem.count++ : state.items.push({
				...payload, count: 1
			});
			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},
		minusProduct(state, { payload }) {
			const findItem = state.items.find(obj => {
				return ((obj.id === payload.id) &&
					(obj.size === payload.size) &&
					(obj.type === payload.type))
			});
			if (findItem && findItem.count > 1) {
				findItem.count--;
			} else if (findItem) {
				state.items = state.items.filter(obj => obj !== findItem);
			}

		},
		removeProduct(state, { payload }) {
			const findItem = state.items.find(obj => {
				return ((obj.id === payload.id) &&
					(obj.size === payload.size) &&
					(obj.type === payload.type))
			});
			state.items = state.items.filter(obj => obj !== findItem)
		},
		clearProduct(state) {
			state.items = [];
			state.totalPrice = 0;
		}
	},
})


export const { addProduct, removeProduct, clearProduct, minusProduct } = cartSlice.actions

export default cartSlice.reducer