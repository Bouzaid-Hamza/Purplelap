import React from 'react';
import PropTypes from 'prop-types';

const MiniLaptop = ({ specs }) => (
    <div className="mini-product">
        <div className="mini-img">
            <img src={specs.img} alt="laptop img" />
        </div>
        <div className="mini-infos">
            <h5>{specs.name}</h5>
            <p>{specs.processor} ....</p>
            <p>{specs.price}</p>
            <h5 className="mini-laptop-count">x {specs.count}</h5>
        </div>
    </div>
);

MiniLaptop.propTypes = {
    specs: PropTypes.object
}

export default MiniLaptop;
