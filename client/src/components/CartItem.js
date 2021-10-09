import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const cartUrl = `${process.env.REACT_APP_API_URL}/cart`;

function CartItem ({ specs }) {
    const [count, setCount] = useState(specs.count);

    const updateCount = async (laptopId, count) => {
        const res = await fetch(cartUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN
            },
            body: JSON.stringify({ laptopId, count })
        });

        console.log(await res.json());
    }

    const handleMinus = async () => {
        if (count < 2) return;
        await updateCount(specs._id, count - 1);
        setCount(count - 1);
    }

    const handlePlus = async () => {
        await updateCount(specs._id, count + 1);
        setCount(count + 1);
    }

    return (
        <div className="cart-item">
            <div className="cart-details">
                <div className="img">
                    <img src={specs.img} alt="img"/>
                </div>
                <div className="specs">
                    <h4>{specs.name}</h4>
                    <span>{specs.resolution}</span>
                    <span>{specs.processor}</span>
                    <span>{specs.graphics}</span>
                    <span>{specs.ram}</span>
                    <span>{specs.storage}</span>
                    <span>{specs.os}</span>
                </div>
            </div>
            <div className="cart-quantity">
                <button onClick={handleMinus}>
                    <i className="fas fa-minus"/>
                </button>
                <span className="quantity">{count}</span>
                <button onClick={handlePlus}>
                    <i className="fas fa-plus"/>
                </button>
            </div>
            <h4 className="cart-price">{specs.price}</h4>
            <h4 className="cart-total">{count * specs.price}</h4>
        </div>
    );
}

CartItem.propTypes = {
    specs: PropTypes.object
};

export default CartItem;
