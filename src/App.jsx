import React, { useState, useEffect } from 'react';
import './App.css';
import Filter from './components/Filter';
import ItemList from './components/ItemList';
import ItemCounter from './components/ItemCounter';
import ScrollToTopButton from './components/ScrollToTopButton';
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
};

function App() {
	const {
		items,
		checkedItems,
		filters,
		showScroll,
		handleCheck,
		handleFilterChange,
		filteredItems,
		scrollToTop,
		counts
	} = useItems(initialSelectedCategories);

    const isAnyCategorySelected = Object.values(filters.selectedCategories).some(selected => selected);

	return (
		<div className="App">
			<div className="sidebar">
				<Filter filters={filters} onFilterChange={handleFilterChange} />
				<div className="counters">
					{Object.keys(counts).map(category => (
						<ItemCounter key={category} category={category} count={counts[category]} />
					))}
				</div>
			</div>
			<div className="content">
                {!isAnyCategorySelected && <p className="no-category-message">Select an Item Category on the Left</p>}
                {isAnyCategorySelected && (
                <>
                    <ItemList items={filteredItems} checkedItems={checkedItems} onCheck={handleCheck} />
                    <ScrollToTopButton showScroll={showScroll} onClick={scrollToTop} />
                </>)}
			</div>
		</div>
	);
}

export default App;
