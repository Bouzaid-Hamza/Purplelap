import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavLink from './NavLink';
import DropDown from './DropDown';
import MiniCart from './MiniCart';
import ProfileIcon from './ProfileIcon';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function NavBar ({ cart, noFix }) {
    const [fix, setFix] = useState('nav-border-bottom');
    const { authenticated } = useAuth();
    console.log('NavBar');

    const handleScroll = () => {
        setFix(window.scrollY > 110 ? 'nav-bar-color-change' : 'nav-border-bottom');
    }

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
        <nav className={`nav-bar ${noFix ? 'nav-bar-color-change' : fix}`}>
            <Link to='/'>
                <div className="logo">
                    <i className="fas fa-laptop"/> PurpleLap
                </div>
            </Link>
            <div className="nav-content">
                <input type="checkbox" id="toggle-side-bar"/>
                <ul className="nav-links">
                    <NavLink url='/#home' name='HOME' icon={<i className="fas fa-home"/>} />
                    <NavLink url='/#about' name='ABOUT' icon={<i className="fas fa-question"/>} />
                    <NavLink className='drop-menu' url='/#category' name='CATEGORY'>
                        <DropDown>
                            <NavLink url='/#ultraPortable' name='Ultra Portable' icon={<i className="fas fa-tablet"/>} />
                            <NavLink url='/#business' name='Business' icon={<i className="fas fa-briefcase"/>} />
                            <NavLink url='/#gaming' name='Gaming' icon={<i className="fas fa-gamepad"/>} />
                            <NavLink url='/#id-3D-Modeling' name='3D-Modeling' icon={<i className="fab fa-unity"/>} />
                        </DropDown>
                    </NavLink>
                    <NavLink url='/#contact' name='CONTACT' icon={<i className="fas fa-phone-alt"/>} />
                </ul>
                {cart ? <MiniCart cart={cart} /> : ''}
                {authenticated ? <ProfileIcon /> : ''}
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
    cart: PropTypes.array,
    noFix: PropTypes.bool
}

export default React.memo(NavBar);
