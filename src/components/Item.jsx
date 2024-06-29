import React from 'react';
import ItemLeft from './ItemLeft';
import ItemRight from './ItemRight';
import './item.css';

function Item({ item, checkedItems, onCheck }) {
	return (
		<div className="item">
			<ItemLeft item={item} checkedItems={checkedItems} onCheck={onCheck} />
			<ItemRight item={item} checkedItems={checkedItems} onCheck={onCheck} />
		</div>
	);
}

export default Item;
