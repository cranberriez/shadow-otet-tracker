import PropTypes from 'prop-types';
import ItemLeft from './ItemLeft';
import ItemRight from './ItemRight';
import './item.css';

function Item({ item, checkedItems, onCheck }) {
    const isChecked = checkedItems[item.id] || (item.pieces?.length && item.pieces.every(piece => checkedItems[piece.id]));
    const itemClass = ['item', (isChecked ? 'checked' : ''), ...item.tags].join(' ')

    const tagLabels = {
        boss: 'Boss',
        quest: 'Quest',
        missable: 'Missable',
        spoiler: 'Spoiler'
    };

    return (
        <div className={`${itemClass} ${item.category}`}>
            <ItemLeft item={item} checkedItems={checkedItems} onCheck={onCheck} />
            <ItemRight item={item} checkedItems={checkedItems} onCheck={onCheck} />
            <div className="tags">
                {item.tags
                    .filter(tag => tagLabels[tag])
                    .map(tag => (
                        <span key={tag} className={`tag ${tag}-tag`}>{tagLabels[tag]}</span>
                    ))}
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
