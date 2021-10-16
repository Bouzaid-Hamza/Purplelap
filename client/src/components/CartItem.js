import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CartItem ({ specs, onRemove }) {
    const [count, setCount] = useState(specs.count);

    const updateCount = async (laptopId, count) => {
        const res = await fetch('/api/cart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ laptopId, count })
        });

        const data = await res.json();
        console.log(data);
        if (data.message) setCount(data.count);
    }

    const handleMinus = async () => {
        if (count < 2) return;
        await updateCount(specs._id, count - 1);
    }

    const handlePlus = async () => {
        await updateCount(specs._id, count + 1);
    }

    const handleRemove = async () => {
        const res = await fetch(`/api/cart/${specs._id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        const data = await res.json();
        if (data.message) onRemove(specs._id);
    }

    return (
        <div className="cart-item">
            <div className="cart-details">
                <div className="img">
                    <img src={specs.img} alt="img"/>
                    <button onClick={handleRemove}>Remove</button>
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
    specs: PropTypes.object,
    onRemove: PropTypes.func
};

export default CartItem;
