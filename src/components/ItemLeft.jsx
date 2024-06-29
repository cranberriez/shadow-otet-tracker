import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

function ItemLeft({ item, checkedItems, onCheck }) {
	const handleCheck = () => {
		onCheck(item.id);
	};

	return (
		<div className="item-left">
			<input
				type="checkbox"
				id={`item-${item.id}`}
				checked={checkedItems[item.id] || false}
				onChange={handleCheck}
			/>
			<label htmlFor={`item-${item.id}`}>
				{item.name}
			</label>
			
			<div className="image-container">
				<img
					src={`https://eldenring.wiki.fextralife.com${item.image}`}
					alt={item.name}
					className="item-image"
				/>
			</div>

			<a href={item.url} target="_blank" rel="noopener noreferrer" className="item-link-icon">
				<FaExternalLinkAlt />
			</a>

			<div className="item-text">
				{item.location_text}
			</div>
		</div>
	);
}

export default ItemLeft;
