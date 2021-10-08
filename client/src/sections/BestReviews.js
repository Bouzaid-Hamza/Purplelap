import React, { useEffect, useState, useRef } from 'react';
import Title from '../components/Title';
import BestReview from '../components/BestReview';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { brsParams } from '../objects/swiperParams';

SwiperCore.use([Pagination, Autoplay]);

function BestReviews () {
    const [bestReviews, setBestReviews] = useState([]);
    const swiper = useRef();

    useEffect(async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/bestReviews`, {
            method: 'GET',
            headers: {
                'X-Auth-Token': process.env.REACT_APP_X_AUTH_TOKEN
            }
        });

        setBestReviews(await res.json());
    }, []);

    return (
        <section className="users-reviews-section">
            <Title>CLIENTS REVIEWS</Title>
            <div className="users-reviews-content">
                <h2 data-aos="fade-up" data-aos-duration="1000">What Client’s Say</h2>
                <p data-aos="fade-up" data-aos-duration="1000">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quos dicta recusandae odit voluptas ducimus assumenda ut
                    architecto blanditiis fuga accusantium.
                </p>
                <div className='users-reviews'
                    onMouseEnter={() => swiper.current.swiper.autoplay.stop()}
                    onMouseLeave={() => swiper.current.swiper.autoplay.start()}>
                    <Swiper {...brsParams} ref={swiper}>
                        {bestReviews.map((br, index) => (
                            <SwiperSlide key={index}>
                                <BestReview review={br} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        </section>
    );
}

export default BestReviews;
