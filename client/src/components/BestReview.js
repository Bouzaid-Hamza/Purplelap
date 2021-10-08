import React from 'react';
import PropTypes from 'prop-types';

const BestReview = ({ review }) => (
    <div className="user-review" data-aos="fade-up" data-aos-duration="1000">
        <div className="user-img">
            <img src={review.userId.img} alt="best review"/>
        </div>
        <div>
            <h3 className="user-name">{review.userId.name}</h3>
            <em className="review">{review.content}</em>
        </div>
    </div>
);

BestReview.propTypes = {
    review: PropTypes.object
};

export default BestReview;
