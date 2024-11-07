import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categoryId: 0,
	sort: { name: 'популярности ↓', sortProperty: 'rating', value: 'desc' },
}

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			console.log('setCategoryId', action)
			state.categoryId = action.payload
		},
		setSort(state, action) {
			console.log(action)
			state.sort = action.payload
		},
	},
})

export const {setCategoryId, setSort } = filterSlice.actions

export default filterSlice.reducer