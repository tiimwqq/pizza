
function Categories({ categoryId, setCategoryId }) {

	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']


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
}

export default Categories;