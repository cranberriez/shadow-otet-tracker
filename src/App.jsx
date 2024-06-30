import React, { useState, useEffect } from 'react';
import './App.css';
import Filter from './components/Filter';
import ItemList from './components/ItemList';
import ScrollToTopButton from './components/ScrollToTopButton';
import SearchBar from './components/SearchBar';
import { useItems } from './hooks/useItems';

const initialSelectedCategories = {
  'Weapons': true,
  'Spells': true,
  'Ashes of War': true,
  'Spirit Ashes': true,
  'Talismans': true,
  'Tears': true,
  'Tools': true,
  'Armor': true,
  'Cookbooks': true,
  'Bell Bearings': true,
  'Scadutree Fragments': true,
  'Revered Spirit Ashes': true
};

function App() {
  const {
    items,
    checkedItems,
    filters,
    showScroll,
    handleCheck,
    handleFilterChange,
    handleSearchChange,
    handleTagFilterChange,
    filteredItems,
    scrollToTop,
    counts,
  } = useItems(initialSelectedCategories);

  const isAnyCategorySelected = Object.values(filters.selectedCategories).some((selected) => selected);

  return (
    <div className="App">
      <div className="sidebar">
        <Filter filters={filters} onFilterChange={handleFilterChange} counts={counts} />
      </div>
      <div className="content">
        <div className="fixed-container">
          <SearchBar 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            onSearchChange={handleSearchChange} 
            onTagFilterChange={handleTagFilterChange} 
          />
        </div>
        {!isAnyCategorySelected && <p className="no-category-message">Select an Item Category on the Left</p>}
        {isAnyCategorySelected && (
          <>
            <ItemList items={filteredItems} checkedItems={checkedItems} onCheck={handleCheck} />
            <ScrollToTopButton showScroll={showScroll} onClick={scrollToTop} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
