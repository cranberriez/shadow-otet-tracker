import React from 'react';

const categories = [
  'Weapons',
  'Spells',
  'Ashes of War',
  'Spirit Ashes',
  'Talismans',
  'Tears',
  'Tools',
  'Armor',
];

function Filter({ filters, onFilterChange }) {
  const handleCategoryToggle = (category) => {
    const newSelectedCategories = { ...filters.selectedCategories };
    newSelectedCategories[category] = !newSelectedCategories[category];

    onFilterChange({ ...filters, selectedCategories: newSelectedCategories });
  };

  const handleSelectAll = () => {
    const newSelectedCategories = {};
    categories.forEach(category => {
      newSelectedCategories[category] = true;
    });
    onFilterChange({ ...filters, selectedCategories: newSelectedCategories });
  };

  const handleDeselectAll = () => {
    const newSelectedCategories = {};
    categories.forEach(category => {
      newSelectedCategories[category] = false;
    });
    onFilterChange({ ...filters, selectedCategories: newSelectedCategories });
  };

  return (
    <div className="filter">
      <button onClick={handleSelectAll}>Select All</button>
      <button onClick={handleDeselectAll}>Deselect All</button>
      {categories.map((category) => (
        <div
          key={category}
          className={`checkbox-container ${filters.selectedCategories[category] ? 'checked' : ''}`}
          onClick={() => handleCategoryToggle(category)}
        >
          {category}
        </div>
      ))}
      <div
        className={`checkbox-container ${filters.showChecked ? 'checked' : ''}`}
        onClick={() => onFilterChange({ ...filters, showChecked: !filters.showChecked })}
      >
        Show Checked
      </div>
      <div
        className={`checkbox-container ${filters.showSpoilers ? 'checked' : ''}`}
        onClick={() => onFilterChange({ ...filters, showSpoilers: !filters.showSpoilers })}
      >
        Show Spoiler Items
      </div>
    </div>
  );
}

export default Filter;
