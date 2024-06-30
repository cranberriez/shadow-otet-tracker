import PropTypes from 'prop-types';
import './filter.css';

const categories = [
    'Weapons',
    'Spells',
    'Ashes of War',
    'Spirit Ashes',
    'Talismans',
    'Tears',
    'Tools',
    'Armor',
    'Cookbooks',
    'Bell Bearings',
    'Scadutree Fragments',
    'Revered Spirit Ashes'
];

function Filter({ filters, onFilterChange, counts }) {
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
            <div className='all-button-container'>
                <button onClick={handleSelectAll}>Select All</button>
                <button onClick={handleDeselectAll}>Deselect All</button>
            </div>
            {categories.map((category) => (
                <div
                    key={category}
                    className={`checkbox-container ${filters.selectedCategories[category] ? 'checked' : ''}`}
                    onClick={() => handleCategoryToggle(category)}
                >
                    <p>{category}</p>
                    <p>{counts[category].acquired} / {counts[category].total}</p>
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
            <div>
                Spoiler Items Include Boss & NPC Drops. THIS IS A SPOILER WARNING
            </div>
        </div>
    );
}

Filter.propTypes = {
    filters: PropTypes.shape({
        selectedCategories: PropTypes.object.isRequired,
        showChecked: PropTypes.bool.isRequired,
        showSpoilers: PropTypes.bool.isRequired,
    }).isRequired,
    onFilterChange: PropTypes.func.isRequired,
    counts: PropTypes.object.isRequired,
};

export default Filter;
