import { useState, useEffect } from 'react';
import weaponsData from '../data/weapons.json';
import spellsData from '../data/spells.json';
import ashesOfWarData from '../data/ashes_of_war.json';
import spiritAshesData from '../data/spirit_ashes.json';
import talismansData from '../data/talismans.json';
import tearsData from '../data/tears.json';
import toolsData from '../data/tools.json';
import armorData from '../data/armor.json';
import bellbearingData from '../data/bell_bearings.json';
import cookbookData from '../data/cookbooks.json';
import reveredData from '../data/revered_spirit_ashes.json';
import scadutreeData from '../data/scadutree_fragments.json';

export const useItems = (initialSelectedCategories) => {
    const [items, setItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [filters, setFilters] = useState({
        selectedCategories: initialSelectedCategories,
        selectedTags: [],
        showChecked: true,
        showSpoilers: false
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        // Combine the data from all JSON files
        const combinedData = [
            ...weaponsData,
            ...spellsData,
            ...ashesOfWarData,
            ...spiritAshesData,
            ...talismansData,
            ...tearsData,
            ...toolsData,
            ...armorData,
            ...bellbearingData,
            ...cookbookData,
            ...reveredData,
            ...scadutreeData
        ];
        setItems(combinedData);

        // Load checked items from localStorage
        const storedCheckedItems = JSON.parse(localStorage.getItem('checkedItems')) || {};
        setCheckedItems(storedCheckedItems);

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Save checked items to localStorage
        localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
    }, [checkedItems]);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowScroll(true);
        } else {
            setShowScroll(false);
        }
    };

    const handleCheck = (id) => {
        setCheckedItems((prevCheckedItems) => {
            const newCheckedItems = { ...prevCheckedItems, [id]: !prevCheckedItems[id] };

            // If the item is an armor set with pieces
            const item = items.find(item => item.id === id);
            if (item && item.pieces && item.pieces.length > 0) {
                item.pieces.forEach(piece => {
                    newCheckedItems[piece.id] = !prevCheckedItems[id];
                });
            }

            // If the item is a piece, check if all pieces are now checked and mark the set as checked
            if (!item || (item && item.pieces.length === 0)) {
                const setItemId = Math.floor(id);
                const setItem = items.find(item => item.id === setItemId);
                if (setItem && setItem.pieces) {
                    const allPiecesChecked = setItem.pieces.every(piece =>
                        piece.id === id ? newCheckedItems[piece.id] : prevCheckedItems[piece.id]
                    );
                    newCheckedItems[setItemId] = allPiecesChecked;
                }
            } else {
                // If the item is a set, uncheck the set if any piece is unchecked
                const setItemId = item.id;
                const allPiecesChecked = item.pieces.every(piece => newCheckedItems[piece.id]);
                newCheckedItems[setItemId] = allPiecesChecked;
            }

            return newCheckedItems;
        });
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    const handleTagFilterChange = (tag) => {
        setFilters((prevFilters) => {
            const newSelectedTags = prevFilters.selectedTags.includes(tag)
                ? prevFilters.selectedTags.filter((t) => t !== tag)
                : [...prevFilters.selectedTags, tag];
            return { ...prevFilters, selectedTags: newSelectedTags };
        });
    };

    const extractNumber = (url) => {
        if (!url) return 0;
        const match = url.match(/(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
    };

    const filteredItems = items
        .filter(item => {
            const { selectedCategories, selectedTags, showChecked, showSpoilers } = filters;
            const isCategorySelected = selectedCategories[item.category];
            const isSpoiler = item.tags.includes('spoiler');
            const hasTags = selectedTags.every(tag => item.tags.includes(tag));
            const matchesSearchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());

            if (!isCategorySelected) {
                return false;
            }
            if (!showChecked && checkedItems[item.id]) {
                return false;
            }
            if (!showSpoilers && isSpoiler) {
                return false;
            }
            if (selectedTags.length > 0 && !hasTags) {
                return false;
            }
            if (!matchesSearchQuery) {
                return false;
            }
            return true;
        })
        .sort((a, b) => extractNumber(a.url) - extractNumber(b.url));

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getCountsByCategory = () => {
        const counts = {
            'Weapons': { total: 0, acquired: 0 },
            'Spells': { total: 0, acquired: 0 },
            'Ashes of War': { total: 0, acquired: 0 },
            'Spirit Ashes': { total: 0, acquired: 0 },
            'Talismans': { total: 0, acquired: 0 },
            'Tears': { total: 0, acquired: 0 },
            'Tools': { total: 0, acquired: 0 },
            'Armor': { total: 0, acquired: 0 },
            'Bell Bearings': { total: 0, acquired: 0 },
            'Cookbooks': { total: 0, acquired: 0 },
            'Revered Spirit Ashes': { total: 0, acquired: 0 },
            'Scadutree Fragments': { total: 0, acquired: 0 },
        };

        items.forEach(item => {
            if (item.category !== 'Armor' || (item.pieces && item.pieces.length === 0)) {
                counts[item.category].total += 1;
                if (checkedItems[item.id]) {
                    counts[item.category].acquired += 1;
                }
            }
            if (item.pieces && item.pieces.length > 0) {
                counts[item.category].total += item.pieces.length;
                item.pieces.forEach(piece => {
                    if (checkedItems[piece.id]) {
                        counts[item.category].acquired += 1;
                    }
                });
            }
        });

        return counts;
    };

    const counts = getCountsByCategory();

    return {
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
        counts
    };
};
