import React, { useState } from 'react';

function Categories() {

	const [active, setActive] = useState(false);
	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']


	return (
		<div className="categories">
			<ul>
				{
					categories.map((data, index) => (
						<li key={index}
							onClick={() => setActive(index)}
							className={active === index ? 'active' : ''}
						>{data}</li>
					))
				}
			</ul>
		</div >
	);
}

export default Categories;