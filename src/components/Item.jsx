import PropTypes from 'prop-types';
import ItemLeft from './ItemLeft';
import ItemRight from './ItemRight';
import './item.css';

function Item({ item, checkedItems, onCheck }) {
    const isChecked = checkedItems[item.id] || (item.pieces?.length && item.pieces.every(piece => checkedItems[piece.id]));
    const itemClass = `item ${isChecked ? 'checked' : ''} ${item.tags.includes('boss') ? 'boss' : ''} ${item.tags.includes('quest') ? 'quest' : ''} ${item.tags.includes('missable') ? 'missable' : ''} ${item.tags.includes('spoiler') ? 'spoiler' : ''}`;

    return (
        <div className={itemClass}>
            <ItemLeft item={item} checkedItems={checkedItems} onCheck={onCheck} />
            <ItemRight item={item} checkedItems={checkedItems} onCheck={onCheck} />
            <div className="tags">
                {item.tags.includes('boss') && <span className="tag boss-tag">Boss</span>}
                {item.tags.includes('quest') && <span className="tag quest-tag">Quest</span>}
                {item.tags.includes('missable') && <span className="tag missable-tag">Missable</span>}
                {item.tags.includes('spoiler') && <span className="tag spoiler-tag">Spoiler</span>}
            </div>
        </div>
    );
}

Item.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        pieces: PropTypes.array,
        tags: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    checkedItems: PropTypes.object.isRequired,
    onCheck: PropTypes.func.isRequired,
};

export default Item;
