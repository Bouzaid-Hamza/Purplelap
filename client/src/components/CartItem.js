import React, { useState } from 'react';
import PropTypes from 'prop-types';

const cartUrl = `${process.env.REACT_APP_API_URL}/cart`;

// const updateCount = async (laptopId, count) => {
//     const res = await fetch(cartUrl, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN
//         },
//         body: JSON.stringify({ laptopId, count })
//     });
//
//     return await res.json();
// }
//
// const countReducer = (state, action) => {
//     switch (action.type) {
//     case 'MINUS':
//         if (state < 2) return state;
//         updateCount(action.laptopId, state - 1)
//             .then(r => console.log(r));
//         return state - 1;
//     case 'PLUS':
//         updateCount(action.laptopId, state + 1)
//             .then(r => console.log(r));
//         return state + 1;
//     default:
//         return state;
//     }
// }

function CartItem ({ specs }) {
    // const [count, dispatch] = useReducer(countReducer, specs.count);
    // const handleMinus = () => {
    //     dispatch({ type: 'MINUS', laptopId: specs._id });
    // }
    // const handlePlus = () => {
    //     dispatch({ type: 'PLUS', laptopId: specs._id });
    // }

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
