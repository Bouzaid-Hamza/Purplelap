import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavLink from './NavLink';

function DropDown (props) {
    const [fix, setFix] = useState('');

    const handleResize = () => {
        if (window.innerWidth > 720) setFix('stop-transition');
    }

    useEffect(() => {
        let mounted = true;
        window.addEventListener('resize', handleResize);
        return () => {
            mounted = false;
            window.removeEventListener('scroll', handleResize);
        }
    }, []);

    return (
        <li className='drop-menu'
            onMouseOver={() => setFix('')}>
            <a href={props.url}>{props.name}</a>
            <ul className={`drop-list ${fix}`}>
                {props.links.map((link, index) => <NavLink key={index} {...link} />)}
            </ul>
        </li>
    );
}

DropDown.propTypes = {
    name: PropTypes.string,
    url: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string
    }))
}

export default DropDown;
