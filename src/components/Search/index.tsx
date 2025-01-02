import React, { useCallback, useState } from 'react';
import classes from './Search.module.scss'
import debounce from 'lodash.debounce'
import { setSearchValue } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

const Search: React.FC = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState('')

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounceSearchInput = useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str))
		}, 400), [])

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		debounceSearchInput(e.target.value)
	}

	return (
		<input
			value={value}
			onChange={(e) => onChangeInput(e)}
			placeholder='поиск пицц...'
			className={classes.search} />
	);
};

export default Search;