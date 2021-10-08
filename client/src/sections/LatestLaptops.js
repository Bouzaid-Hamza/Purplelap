import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import LatestLaptop from '../components/LatestLaptop';
import PropTypes from 'prop-types';

function LatestLaptops ({ cartFn }) {
    const [latestLaptops, setLatestLaptops] = useState([]);
    const { inCart, refreshCart } = cartFn;

    useEffect(async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/latestLaptops`, {
            method: 'GET',
            headers: {
                'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN
            }
        });

        setLatestLaptops(await res.json());
    }, []);

    return (
        <section className="latest-products-section">
            <Title>LATEST PRODUCTS</Title>
            <div className="latest-products-container">
                {latestLaptops.map((lat, index) =>
                    <LatestLaptop key={index}
                        specs={lat}
                        refreshCart={refreshCart}
                        inCart={inCart(lat._id)} />
                )}
            </div>
        </section>
    );
}

LatestLaptops.propTypes = {
    cartFn: PropTypes.object
}

export default LatestLaptops;
