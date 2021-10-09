import React, { useEffect, useState, useCallback } from 'react';
import NavLink from './NavLink';
import DropDown from './DropDown';
import MiniCart from './MiniCart';
import PropTypes from 'prop-types';

function NavBar ({ cart }) {
    const [fix, setFix] = useState('nav-border-bottom');

    const handleScroll = () => {
        setFix(window.scrollY > 110 ? 'nav-bar-color-change' : 'nav-border-bottom');
    }

    // const handleClick = (e) => {
    //     if (e.target.tagName.toLowerCase() === 'a') {
    //         const links = Array.from(e.target.closest('.nav-links').children);
    //         links.forEach(link => {
    //             if (e.target === link.firstChild) {
    //                 link.firstChild.classList.add('active');
    //             } else {
    //                 link.firstChild.classList.remove('active');
    //             }
    //         });
    //     }
    // }

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            handleScroll();
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            mounted = false;
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <nav className={`nav-bar ${fix}`}>
            <div className="logo"><i className="fas fa-laptop"/> PurpleLap</div>
            <div className="nav-content">
                <input type="checkbox" id="toggle-side-bar"/>
                {/* <ul className="nav-links" onClick={handleClick}> */}
                <ul className="nav-links">
                    <NavLink key='1' url='#home' name='HOME' />
                    <NavLink key='2' url='#about' name='ABOUT' />
                    <DropDown key='3' url='#category' name='CATEGORY' links={[
                        { url: '#ultraPortable', name: 'Ultraportable' },
                        { url: '#business', name: 'Business' },
                        { url: '#gaming', name: 'Gaming' },
                        { url: '#id-3D-Modeling', name: '3D-Modeling' }
                    ]} />
                    <NavLink key='4' url='#contact' name='CONTACT' />
                </ul>
                <MiniCart cart={cart} />
                <label htmlFor="toggle-side-bar" className="open-side-bar">
                    <i className="fas fa-bars"/>
                </label>
                <label htmlFor="toggle-side-bar" className="close-side-bar">
                    <i className="fas fa-times"/>
                </label>
            </div>
        </nav>
    );
}

NavBar.propTypes = {
    cart: PropTypes.array
}

export default NavBar;
