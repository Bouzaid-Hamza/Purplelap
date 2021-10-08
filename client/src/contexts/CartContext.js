import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CartContext = React.createContext({});
const cartUrl = `${process.env.REACT_APP_API_URL}/cart`;

export const useCart = () => useContext(CartContext);

export default function CartProvider ({ children }) {
    const [cart, setCart] = useState([]);
    const laptopsInCart = cart.map(item => item._id);

    const isInsideCart = (laptopId) => laptopsInCart.includes(laptopId);

    const refreshCart = async () => {
        const res = await fetch(cartUrl, {
            method: 'GET',
            headers: {
                'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN
            }
        });

        setCart(await res.json());
    }

    useEffect(async () => {
        await refreshCart();
    }, []);

    const value = { cart, refreshCart, isInsideCart }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

CartProvider.propTypes = {
    children: PropTypes.any
};
