import React, { Component } from 'react';
import Card from './Card';
import Footer from './Footer';
import ImageSlider from './ImageSlider';
import '../styles/AboutUs.css';
import { Link } from 'react-router-dom';

class AboutUs extends Component {
    componentDidMount() {
        // Sticky header on scroll
        const selectHeader = document.querySelector('#header');
        const scrollTop = document.querySelector('.scroll-top');
    
        this.handleScroll = () => {
          if (selectHeader) {
            window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
          }
          if (scrollTop) {
            window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
          }
        };
    
        document.addEventListener('scroll', this.handleScroll);
    
        if (scrollTop) {
          scrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }
      }
    
      componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
        const scrollTop = document.querySelector('.scroll-top');
        if (scrollTop) {
          scrollTop.removeEventListener('click', this.handleScroll);
        }
      }
    
      render() {
        return (
            
        <section id="aboutuspage">
            <div className="about-us">
            <header id="header" className="header d-flex align-items-center fixed-top">
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo d-flex align-items-center">
              <img src="static/logo.svg.png" alt="IIT Dharwad Logo" />
              <h1>IIT Dharwad</h1>
            </div>
            <nav id="navbar" className="navbar">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="libcom.html">Library Committee</a></li>
                <li><a href="asklib.html">Ask a Librarian</a></li>
                <li><a href="/AboutUs">About</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </nav>
             
          </div>
        </header>
                <section className="intro-section">
                    <div className="row intro-container">
                        <div className="col-lg-6 order-2 order-lg-1 intro-image">
                            <img src="/images/staff.jpeg" alt="Introduction" />
                        </div>
                        <div className="col-lg-6 pt-4 pt-lg-0 order-1 order-lg-2 intro-text">
                            <h1 style={{ fontWeight: '700', fontSize: '40px' }}>Introduction</h1>
                            <p>Welcome to our library management system. Here, you can find information about our team, collection, policies, and how you can support us.</p>
                        </div>
                    </div>
                </section>
                <section className="cards-section" style={{  background: 'linear-gradient(to bottom, #fbf8f6 15%, #0b1116 15%, #0b1116 85%, #fbf8f6 85%)' }}>
                <div className="container">
                <div className="row gy-4">
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
                </div>
                </div>
                </section>
                <section className="vision-section">
                    <div className="row vision-container">
                        <div className="col-lg-6 pt-4 pt-lg-0 intro-text2">
                            <h1 style={{ fontWeight: '700', fontSize: '40px' }}>Vision</h1>
                            <p>Welcome to our library management system. Here, you can find information about our team, collection, policies, and how you can support us.</p>
                        </div>
                        <div className="col-lg-6 intro-image2" >
                            <img src="/images/vision.jpeg" alt="Vision" style={{ width: '100%' }} />
                        </div>
                    </div>
                </section>
                <ImageSlider />
                <section className="conclusion-section" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
                    <div className="row conclusion-container">
                        <div className='col-3'>
                        <p>Address in words.</p>
                        <p>blah blah blah</p>
                        </div>
                        <div className="col-9">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.5405837788308!2d74.91245637489173!3d15.509124685092116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf33005e13988b%3A0xf1f71dc79f0bdc6a!2sIIT%20DHARWAD%20LIBRARY!5e0!3m2!1sen!2sin!4v1717351437291!5m2!1sen!2sin"
                                style={{ border: '0', width: '100%', height: '340px' }}
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
            
        </section>
        );
    }
}

export default AboutUs;
