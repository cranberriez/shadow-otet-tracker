import PropTypes from 'prop-types';

function ScrollToTopButton({ showScroll, onClick }) {
    return (
        <button className={`scroll-to-top ${showScroll ? 'show' : ''}`} onClick={onClick}>
            Scroll to Top
        </button>
    );
}

ScrollToTopButton.propTypes = {
    showScroll: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ScrollToTopButton;
