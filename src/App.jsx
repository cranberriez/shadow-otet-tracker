import React, { useRef, useState } from 'react';
import './App.css';
import Filter from './components/Filter';
import ItemList from './components/ItemList';
import ScrollToTopButton from './components/ScrollToTopButton';
import SearchBar from './components/SearchBar';
import Links from './components/Links';
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
        checkedItems,
        filters,
        handleCheck,
        handleFilterChange,
        handleSearchChange,
        handleTagFilterChange,
        filteredItems,
        counts,
    } = useItems(initialSelectedCategories);

    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const contentRef = useRef(null); // reference to content for scroll to top button

    const toggleMobileSidebar = () => {
        setMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const isAnyCategorySelected = Object.values(filters.selectedCategories).some((selected) => selected);

    return (
        <div className={`App ${isMobileSidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="sidebar">
                <Filter filters={filters} onFilterChange={handleFilterChange} counts={counts} />
                <Links />
            </div>
            <button className="burger-menu" onClick={toggleMobileSidebar}>
                {isMobileSidebarOpen ? '✖' : '☰'}
            </button>
            <div className="content" ref={contentRef}>
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
                        <ScrollToTopButton containerRef={contentRef} />
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
