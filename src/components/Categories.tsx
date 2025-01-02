import React from "react";

type CategoriesProps = {
	categoryId: number;
	setCategoryId: (id: number) => void
}

const Categories: React.FC<CategoriesProps> = React.memo(({ categoryId, setCategoryId }) => {

	const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

	return (
		<div className="categories">
			<ul>
				{
					categories.map((data, index) => (
						<li key={index}
							onClick={() => setCategoryId(index)}
							className={categoryId === index ? 'active' : ''}
						>{data}</li>
					))
				}
			</ul>
		</div >
	);
})

export default Categories;