import React from 'react';
import ItemLeft from './ItemLeft';
import ItemRight from './ItemRight';
import './item.css';

function Item({ item, checkedItems, onCheck }) {
	const isChecked = checkedItems[item.id] || (item.pieces && item.pieces.some(piece => checkedItems[piece.id]));
	const itemClass = `item ${isChecked ? 'checked' : ''} ${item.spoiler ? 'spoiler' : ''} ${item['quest-missable'] ? 'quest-missable' : ''}`;

	return (
		<div className={itemClass}>
			<ItemLeft item={item} checkedItems={checkedItems} onCheck={onCheck} />
			<ItemRight item={item} checkedItems={checkedItems} onCheck={onCheck} />
		</div>
	);
}

export default Item;
