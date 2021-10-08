import React from 'react';
import PropTypes from 'prop-types';

const cartUrl = `${process.env.REACT_APP_API_URL}/cart`;

function Laptop (props) {
    const { specs, type, dataLabel, inCart, refreshCart } = props;

    const addToCart = async (laptopId, category) => {
        const res = await fetch(cartUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN
            },
            body: JSON.stringify({ laptopId, category })
        });

        console.log(await res.json());
    };

    const handleClick = async () => {
        await addToCart(specs._id, specs.category);
        await refreshCart();
    }

    return (
        <div id={specs._id}
            className={`product ${type}`}
            data-aos="fade-up"
            data-aos-duration="1000"
            data-label={dataLabel}>
            <div className="product-img">
                <img src={specs.img} alt="laptop-img"/>
            </div>
            <div className="product-info">
                <div className="price">$ {specs.price}</div>
                <div>
                    <div className="product-name">{specs.name}</div>
                    <ul className="product-specs">
                        <li className="resolution">{specs.resolution}</li>
                        <li className="processor">{specs.processor}</li>
                        <li className="graphics">{specs.graphics}</li>
                        <li className="ram">{specs.ram}</li>
                        <li className="storage">{specs.storage}</li>
                        <li className="system">{specs.os}</li>
                    </ul>
                </div>
            </div>
            <button className="first-btn"
                disabled={inCart}
                onClick={handleClick}>
                {inCart ? 'INSIDE THE CART' : 'ADD TO CART'}
            </button>
        </div>
    );
}

Laptop.propTypes = {
    specs: PropTypes.object,
    type: PropTypes.string,
    dataLabel: PropTypes.string,
    inCart: PropTypes.bool,
    refreshCart: PropTypes.func
};

export default React.memo(Laptop, (prev, next) => prev.inCart === next.inCart);
