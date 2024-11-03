import React from 'react';
import  './Pagination.module.scss'

const Pagination = ({paginationId, setPaginationId}) => {
	return (
		<div className='pagination_wrapper'>
			{[...new Array(3)].map((_, i) => (
				<button
				onClick={() => setPaginationId(i)} 
				key={i} 
				className={paginationId === i ? "pagination_btn active" : 'pagination_btn'}>
					{i + 1}
				</button>
			))}
		</div>
	);
};

export default Pagination;