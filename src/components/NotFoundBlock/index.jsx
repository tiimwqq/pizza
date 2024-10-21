import React from 'react';

import styles from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {

console.log(styles)

	return (
		<div>
			<h1 className={styles.root}>ничего не найдено😕</h1>
		</div>
	);
};

export default NotFoundBlock;