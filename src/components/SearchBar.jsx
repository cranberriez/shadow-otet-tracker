import PropTypes from 'prop-types';
import { debounce } from '../utils/debounce';
import './searchbar.css';

const tags = ['missable', 'quest', 'spoiler'];

function SearchBar({ filters, onSearchChange, onTagFilterChange }) {
    const handleInputChange = debounce((e) => {
        onSearchChange(e.target.value);
    }, 100); // Adjust the debounce delay as needed

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

SearchBar.propTypes = {
    filters: PropTypes.shape({
        searchQuery: PropTypes.string,
        selectedTags: PropTypes.array.isRequired,
    }).isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onTagFilterChange: PropTypes.func.isRequired,
};

export default SearchBar;
