import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

function ItemRight({ item, checkedItems, onCheck }) {
	const handlePieceCheck = (pieceId) => {
		onCheck(pieceId);
	};

	return (
		<div className="item-right">
			{item.pieces && item.pieces.length > 0 && (
				<div className="item-pieces">
					{item.pieces.map(piece => (
						<div key={piece.id} className="item-piece">
							<input
								type="checkbox"
								id={`item-piece-${piece.id}`}
								checked={checkedItems[piece.id] || false}
								onChange={() => handlePieceCheck(piece.id)}
							/>
							<label htmlFor={`item-piece-${piece.id}`}>
								{piece.piece_name}
							</label>
							
							<img
								src={`https://eldenring.wiki.fextralife.com${piece.image}`}
								alt={piece.piece_name}
								className="item-image"
							/>

							<a href={piece.url} target="_blank" rel="noopener noreferrer" className="item-link-icon">
								<FaExternalLinkAlt />
							</a>

							<div className="item-text">
								{piece.location_text}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default ItemRight;
