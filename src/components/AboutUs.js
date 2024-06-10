import React, { Component } from 'react';
import Card from './Card';
import Footer from './Footer';
import ImageSlider from './ImageSlider';
import '../styles/AboutUs.css';

class AboutUs extends Component {
    render() {
        return (
            <div className="about-us">
                <header className="header">
                    <h1>About Us</h1>
                </header>
                <section className="intro-section">
                    <div className="intro-container">
                        <div className="intro-image">
                            <img src="/images/staff.jpeg" alt="Introduction" />
                        </div>
                        <div className="intro-text">
                            <h2>Introduction</h2>
                            <p>Welcome to our library management system. Here, you can find information about our team, collection, policies, and how you can support us.</p>
                        </div>
                    </div>
                </section>
                <section className="cards-section">
                    <Card
                        title="Team"
                        image="/images/staff.jpeg"
                        text="Meet our dedicated team members."
                        link="/team"
                    />
                    <Card
                        title="Our Collection"
                        image="/images/collection.jpeg"
                        text="Discover our extensive collection."
                        link="/collection"
                    />
                    <Card
                        title="Our Policy"
                        image="/images/policy.jpeg"
                        text="Read about our policies."
                        link="/policy"
                    />
                    <Card
                        title="Vision"
                        image="/images/fund.jpeg"
                        text="Take a look at our strategic framework."
                        link="/vision"
                    />
                </section>
                <section className="vision-section">
                    <div className="vision-container">
                        <div className="intro-text2">
                            <h2>Vision</h2>
                            <p>Welcome to our library management system. Here, you can find information about our team, collection, policies, and how you can support us.</p>
                        </div>
                        <div className="intro-image2">
                            <img src="/images/vision.jpeg" alt="Vision" />
                        </div>
                    </div>
                </section>
                <ImageSlider />
                <section className="conclusion-section">
                    <div className="conclusion-container">
                        <p>Address in words.</p>
                        <p>blah blah blah</p>
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.5405837788308!2d74.91245637489173!3d15.509124685092116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf33005e13988b%3A0xf1f71dc79f0bdc6a!2sIIT%20DHARWAD%20LIBRARY!5e0!3m2!1sen!2sin!4v1717351437291!5m2!1sen!2sin"
                                width="1200"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title='lib'
                            ></iframe>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}

export default AboutUs;
