import React from 'react';
import ItemLeft from './ItemLeft';
import ItemRight from './ItemRight';
import './item.css';

function Item({ item, checkedItems, onCheck }) {
  const isChecked = checkedItems[item.id] || (item.pieces && item.pieces.some(piece => checkedItems[piece.id]));
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

export default Item;