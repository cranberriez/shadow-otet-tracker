import React, { useState, useEffect } from 'react';

function ScrollToTopButton({ containerRef }) {
    const [showScroll, setShowScroll] = useState(false);

    const handleScroll = () => {
        if (containerRef.current.scrollTop > 300) {
            setShowScroll(true);
        } else {
            setShowScroll(false);
        }
    };

    const scrollToTop = () => {
        containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [containerRef]);

    return (
        <button className={`scroll-to-top ${showScroll ? 'show' : ''}`} onClick={scrollToTop}>
            Scroll to Top
        </button>
    );
}

export default ScrollToTopButton;
