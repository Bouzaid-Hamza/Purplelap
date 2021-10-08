import React from 'react';
import PropTypes from 'prop-types';

const Category = ({ category }) => (
    <div className="category-item"
        id={!isNaN(category.name.charAt(0)) ? `id-${category.name}` : category.name}
        data-aos="flip-right"
        data-aos-duration="1000">
        <div className="category-name">{category.name}</div>
        <div className="category-img">
            <img src={category.img} alt="category-img"/>
        </div>
        <button className="first-btn">VIEW MORE</button>
    </div>
);

Category.propTypes = {
    category: PropTypes.object
};

export default Category;
