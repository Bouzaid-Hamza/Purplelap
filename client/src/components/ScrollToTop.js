import React, { useEffect, useState } from 'react';

function ScrollToTop () {
    const [toggle, setToggle] = useState('hide-stt');

    const handleScroll = () => {
        setToggle(window.scrollY > 1200 ? 'show-stt' : 'hide-stt');
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        let mounted = true;
        if (mounted) window.addEventListener('scroll', handleScroll);
        return () => {
            mounted = false;
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return (
        <button className={`scroll-to-top ${toggle}`}
            onClick={scrollToTop}>
            <i className="fas fa-arrow-up" />
        </button>
    );
}

export default ScrollToTop;
