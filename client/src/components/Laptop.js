import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';

function Laptop (props) {
    console.log('Laptop : ', props.specs.name);
    const { specs, type, dataLabel, inCart, refreshCart } = props;
    const [buttonText, setButtonText] = useState('ADD TO CART');
    const { authenticated } = useAuth();

    const addToCart = async (laptopId, category) => {
        if (!authenticated) {
            return console.log('you need login first');
        }

        const prevText = buttonText;
        setButtonText(<i className="fas fa-sync-alt"/>);

        const res = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ laptopId, category })
        });

        setButtonText(prevText);
        console.log(await res.json());
    };

    const handleClick = async () => {
        await addToCart(specs._id, specs.category);
        await refreshCart();
    }

    useEffect(() => {
        if (inCart) setButtonText('INSIDE THE CART');
    }, [inCart]);

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
                {buttonText}
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
