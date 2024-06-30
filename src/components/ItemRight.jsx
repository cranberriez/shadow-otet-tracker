import PropTypes from 'prop-types';
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

                            <div className="image-container">
                                <img
                                    src={`https://eldenring.wiki.fextralife.com${piece.image}`}
                                    alt={piece.piece_name}
                                    className="item-image"
                                />
                            </div>

                            <a href={piece.url} target="_blank" rel="noopener noreferrer" className="item-link-icon">
                                <FaExternalLinkAlt />
                            </a>

                            <label htmlFor={`item-piece-${piece.id}`}>
                                {piece.piece_name}

                                <div className="item-text">
                                    {piece.location_text}
                                </div>
                            </label>


                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

ItemRight.propTypes = {
    item: PropTypes.shape({
        pieces: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                piece_name: PropTypes.string.isRequired,
                image: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                location_text: PropTypes.string.isRequired,
            })
        )
    }).isRequired,
    checkedItems: PropTypes.object.isRequired,
    onCheck: PropTypes.func.isRequired,
};

export default ItemRight;
