import React from 'react';
import Title from '../components/Title';

const Features = () => (
    <section className="features-section" id='about'>
        <Title>FEATURES</Title>
        <div className="features-content">
            <div className="feature-item" data-aos="slide-right" data-aos-duration="1000">
                <i className="fa fa-umbrella"/>
                <h4 className="feature-name">24/7 Support</h4>
                <p className="feature-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Quidem obcaecati inventore eaque.
                </p>
            </div>
            <div className="feature-item" data-aos="zoom-in" data-aos-duration="1000" >
                <i className="fa fa-lock"/>
                <h4 className="feature-name">Advanced Security</h4>
                <p className="feature-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Quidem obcaecati inventore eaque.
                </p>
            </div>
            <div className="feature-item" data-aos="zoom-in" data-aos-duration="1000" >
                <i className="fa fa-rocket"/>
                <h4 className="feature-name">Fast Delevery</h4>
                <p className="feature-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Quidem obcaecati inventore eaque.
                </p>
            </div>
            <div className="feature-item" data-aos="slide-left" data-aos-duration="1000" >
                <i className="fa fa-check"/>
                <h4 className="feature-name">High Quality Products</h4>
                <p className="feature-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Quidem obcaecati inventore eaque.
                </p>
            </div>
        </div>
    </section>
);

export default Features;
