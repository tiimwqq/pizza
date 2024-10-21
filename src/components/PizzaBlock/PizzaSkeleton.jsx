import React from "react"
import ContentLoader from "react-content-loader"

const PizzaSkeleton = (props) => (
	<ContentLoader
	className="pizza-block"
		speed={2}
		width={280}
		height={465}
		viewBox="0 0 280 465"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<circle cx="138" cy="138" r="136" />
		<rect x="12" y="300" rx="10" ry="10" width="259" height="15" />
		<rect x="12" y="329" rx="10" ry="10" width="259" height="72" />
		<rect x="126" y="421" rx="21" ry="21" width="148" height="43" />
		<rect x="14" y="433" rx="6" ry="6" width="78" height="21" />
	</ContentLoader>
)

export default PizzaSkeleton