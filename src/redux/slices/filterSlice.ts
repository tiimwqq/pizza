import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IfilterSlice, SortProps } from './types'

const initialState: IfilterSlice = {
	searchValue: '',
	categoryId: 0,
	sort: { name: 'популярности ↓', sortProperty: 'rating', value: 'desc' },
}

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
		setSort(state, action: PayloadAction<SortProps>) {
			state.sort = action.payload
		},
		setFilter(state, action: PayloadAction<IfilterSlice>) {

			const { searchValue, categoryId, sort } = action.payload;

			if (searchValue !== undefined) {
				state.searchValue = searchValue;
			}

			if (categoryId !== undefined) {
				state.categoryId = categoryId;
			}

			if (sort) {
				state.sort = {
				  ...state.sort,
				  ...sort,
				};
			  } else {
				state.sort = { name: 'популярности ↓', sortProperty: 'rating', value: 'desc' };
			  }
		}
	},
})

export const { setCategoryId, setSort, setFilter, setSearchValue } = filterSlice.actions

export default filterSlice.reducer

