import React from 'react';

function ItemCounter({ category, count }) {
	return (
		<div className="counter">
			{category}: {count.acquired} / {count.total}
		</div>
	);
}

export default ItemCounter;
