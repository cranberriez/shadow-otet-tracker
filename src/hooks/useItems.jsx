import { useState, useEffect } from 'react';
import weaponsData from '../data/weapons.json';
import spellsData from '../data/spells.json';
import ashesOfWarData from '../data/ashes_of_war.json';
import spiritAshesData from '../data/spirit_ashes.json';
import talismansData from '../data/talismans.json';
import tearsData from '../data/tears.json';
import toolsData from '../data/tools.json';
import armorData from '../data/armor.json';

export const useItems = (initialSelectedCategories) => {
	const [items, setItems] = useState([]);
	const [checkedItems, setCheckedItems] = useState({});
	const [filters, setFilters] = useState({
		selectedCategories: initialSelectedCategories,
		showChecked: true,
		showSpoilers: false
	});
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
			...armorData
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

			return newCheckedItems;
		});
	};

	const handleFilterChange = (newFilters) => {
		setFilters(newFilters);
	};

	const extractNumber = (url) => {
		if (!url) return 0;
		const match = url.match(/(\d+)$/);
		return match ? parseInt(match[1], 10) : 0;
	};

	const filteredItems = items
		.filter(item => {
			const { selectedCategories, showChecked, showSpoilers } = filters;
			const isCategorySelected = selectedCategories[item.category];
			const isSpoiler = item.spoiler || false;
			
			if (!isCategorySelected) {
				return false;
			}
			if (!showChecked && checkedItems[item.id]) {
				return false;
			}
			if (!showSpoilers && isSpoiler) {
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
		filteredItems,
		scrollToTop,
		counts
	};
};
