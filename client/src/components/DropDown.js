import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function DropDown ({ children }) {
    const dropdownRef = useRef();

    const handleResize = () => {
        if (dropdownRef.current) {
            dropdownRef.current.classList.add('stop-transition');
            setTimeout(() => {
                dropdownRef.current.classList.remove('stop-transition');
            }, 20);
        }
    }

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            window.addEventListener('resize', handleResize);
        }
        return () => {
            mounted = false;
            window.removeEventListener('scroll', handleResize);
        }
    }, []);

    return (
        <ul className='drop-list' ref={dropdownRef}>
            {children}
        </ul>
    );
}

DropDown.propTypes = {
    children: PropTypes.any
}

export default DropDown;
