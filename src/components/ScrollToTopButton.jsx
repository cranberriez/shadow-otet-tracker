import React from 'react';

function ScrollToTopButton({ showScroll, onClick }) {
	return (
		<button className={`scroll-to-top ${showScroll ? 'show' : ''}`} onClick={onClick}>
			Scroll to Top
		</button>
	);
}

export default ScrollToTopButton;
