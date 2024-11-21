import React, { useCallback, useState } from 'react';
import classes from './Search.module.scss'
import debounce from 'lodash.debounce'
import { setSearchValue } from '../../redux/slices/filterSlice';
import { useDispatch} from 'react-redux';

const Search = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState('')

	const debounceSearchInput = useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str))
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