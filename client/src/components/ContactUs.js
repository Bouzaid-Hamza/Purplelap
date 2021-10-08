import React, { useRef } from 'react';

function ContactUs () {
    const email = useRef();
    const subject = useRef();
    const message = useRef();

    const handleSubmit = async e => {
        e.preventDefault();

        const res = await fetch(`${process.env.REACT_APP_API_URL}/contactUs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.current.value,
                subject: subject.current.value,
                message: message.current.value
            })
        });

        console.log(await res.json());
    }

    return (
        <section className="contact-us-section" id="contact">
            <h4 className="title" data-aos="fade-up" data-aos-duration="1000">
                CONTACT US
            </h4>
            <div className="contact-us-content" data-aos="fade-up" data-aos-duration="1000">
                <div className="contact-info">
                    <h4>Feel Free To Contact With Us !</h4>
                    <div>
                        <i className="fa fa-phone"/>
                        <span>+880 1680 597617</span>
                    </div>
                    <div>
                        <i className="fa fa-envelope"/>
                        <span>contact@yourdomain.net</span>
                    </div>
                    <div>
                        <i className="fa fa-map-marker"/>
                        <span>327 Collins Street Melbourne, Australia</span>
                    </div>
                    <div>
                        <i className="fa fa-globe"/>
                        <span>www.yourdomain.net</span>
                    </div>
                </div>
                <div className="email-form">
                    <h4>Send Us A Message</h4>
                    <form id="email_form" onSubmit={handleSubmit}>
                        <input ref={email} type="text" name="reply_to" placeholder="Your Email"/>
                        <input ref={subject} type="text" name="subject" placeholder="Subject"/>
                        <textarea ref={message} name="text" placeholder="Message"/>
                        <input className="first-btn" id="submit_form" type="submit" value="SEND"/>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ContactUs;
