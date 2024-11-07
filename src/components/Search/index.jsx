import React, { useCallback, useContext, useState } from 'react';
import classes from './Search.module.scss'
import { SearchContext } from '../../App'
import debounce from 'lodash.debounce'

const Search = () => {
	const { setSearchValue } = useContext(SearchContext);
	const [value, setValue] = useState('')

	const debounceSearchInput = useCallback(
		debounce((str) => {
			setSearchValue(str)
			console.log(str)
		}, 400), [])

	const onClickInput = (e) => {
		setValue(e.target.value);
		debounceSearchInput(e.target.value)
	}

	return (
		<input
			value={value}
			onChange={(e) => onClickInput(e)}
			placeholder='поиск пицц...'
			className={classes.search} />
	);
};

export default Search;