import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ children }) => (
    <h4 className='title'
        data-aos='fade-up'
        data-aos-duration='1000'>
        {children}
    </h4>
);

Title.propTypes = {
    children: PropTypes.node
};

export default Title;
