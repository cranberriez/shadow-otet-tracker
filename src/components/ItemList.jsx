import PropTypes from 'prop-types';
import Item from './Item';

function ItemList({ items, checkedItems, onCheck }) {
    return (
        <div>
            {items.map(item => (
                <Item
                    key={item.id}
                    item={item}
                    checkedItems={checkedItems}
                    onCheck={onCheck}
                />
            ))}
        </div>
    );
}

ItemList.propTypes = {
    items: PropTypes.array.isRequired,
    checkedItems: PropTypes.object.isRequired,
    onCheck: PropTypes.func.isRequired,
};

export default ItemList;
