import React from 'react';
import PropTypes from 'prop-types';

const NavLink = (props) => (
    <li {...props}>
        <a href={props.url}>{props.icon}{props.name}</a>
        {props.children}
    </li>
);

NavLink.propTypes = {
    url: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.node,
    children: PropTypes.any
};

export default NavLink;
