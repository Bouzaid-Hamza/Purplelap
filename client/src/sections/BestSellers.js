import React, { useEffect, useRef, useState } from 'react';
import Title from '../components/Title';
import BestSeller from '../components/BestSeller';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { bssParams } from '../objects/swiperParams';
import PropTypes from 'prop-types';

SwiperCore.use([Navigation, Pagination, Autoplay]);

function BestSellers ({ cartFn }) {
    const [bestSellers, setBestSellers] = useState([]);
    const { inCart, refreshCart } = cartFn;
    const swiper = useRef();

    useEffect(async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/bestSellers`, {
            method: 'GET',
            headers: {
                'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN
            }
        });

        setBestSellers(await res.json());
    }, []);

    return (
        <section className='best-sellers-section'>
            <Title>BEST SELLERS</Title>
            <div className='wrapper'>
                <div className='best-sellers-content'
                    onMouseEnter={() => swiper.current.swiper.autoplay.stop()}
                    onMouseLeave={() => swiper.current.swiper.autoplay.start()}>
                    <Swiper {...bssParams} ref={swiper}>
                        {bestSellers.map((bs, index) =>
                            <SwiperSlide key={index}>
                                <BestSeller inCart={inCart(bs._id)}
                                    refreshCart={refreshCart}
                                    specs={bs} />
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

BestSellers.propTypes = {
    cartFn: PropTypes.object
}

export default BestSellers;
