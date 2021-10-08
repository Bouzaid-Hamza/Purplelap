import React from 'react';
import PropTypes from 'prop-types';

const NavLink = ({ url, name }) => <li><a href={url}>{name}</a></li>;

NavLink.propTypes = {
    url: PropTypes.string,
    name: PropTypes.string
};

export default NavLink;
