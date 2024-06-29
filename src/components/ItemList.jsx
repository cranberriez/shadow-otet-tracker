import React from 'react';
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

export default ItemList;
