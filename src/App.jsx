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

	return (
		<div className="App">
			<Filter filters={filters} onFilterChange={handleFilterChange} />
			<div className="counters">
				{Object.keys(counts).map(category => (
					<ItemCounter key={category} category={category} count={counts[category]} />
				))}
			</div>
			<ItemList items={filteredItems} checkedItems={checkedItems} onCheck={handleCheck} />
			<ScrollToTopButton showScroll={showScroll} onClick={scrollToTop} />
		</div>
	);
}

export default App;
