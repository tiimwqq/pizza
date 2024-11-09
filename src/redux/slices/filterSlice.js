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
		setFilter(state, action) {

			state.sort = {
				name: action.payload.name || state.sort.name,
				sortProperty: action.payload.sortProperty || state.sort.sortProperty,
				value: action.payload.value || state.sort.value,
			}
			state.categoryId = Number(action.payload.categoryId || state.categoryId)
		}
	},
})

export const { setCategoryId, setSort, setFilter } = filterSlice.actions

export default filterSlice.reducer

