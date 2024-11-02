import React from 'react';
import classes from './Search.module.scss'


const Search = ({searchValue, setSearchValue}) => {


	return (
		<input
			value={searchValue}
			onChange={(e) => setSearchValue(e.target.value)}
			placeholder='поиск пицц...'
			className={classes.search} />
	);
};

export default Search;