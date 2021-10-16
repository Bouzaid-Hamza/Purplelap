import React from 'react';
import PropTypes from 'prop-types';

const NavLink = (props) => (
    <li className={props.classes}>
        <a href={props.url}
            onClick={props.click}>
            {props.icon}{props.name}
        </a>
        {props.children}
    </li>
);

NavLink.propTypes = {
    url: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.node,
    children: PropTypes.any,
    classes: PropTypes.string,
    click: PropTypes.func
};

export default NavLink;
