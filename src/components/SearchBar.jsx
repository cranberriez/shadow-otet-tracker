import React from 'react';
import './searchbar.css';

const tags = ['missable', 'quest', 'spoiler'];

function SearchBar({ filters, onSearchChange, onTagFilterChange }) {
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
      />
      <div className="tag-buttons">
        {tags.map(tag => (
          <button
            key={tag}
            className={`tag-button ${filters.selectedTags.includes(tag) ? 'active' : ''} ${tag}-tag`}
            onClick={() => onTagFilterChange(tag)}
          >
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
