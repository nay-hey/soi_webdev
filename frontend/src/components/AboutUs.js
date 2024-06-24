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
                            <p>Welcome to IIT Dharwad Library, a hub of knowledge and resources dedicated to supporting academic excellence and research. Our library offers an extensive collection of books, journals, and digital resources to cater to the diverse needs of our students, faculty, and staff. Explore our state-of-the-art facilities and discover a conducive environment for study, collaboration, and intellectual growth.</p>
                        </div>
                    </div>
                </section>
                <section className="cards-section" >
                <div className="container">
                <div className="row gy-4">
                    <Card
                        title="Team"
                        image="/images/staff.jpeg"
                        text="Meet our dedicated team members."
                        link="/AboutUs/team"
                    />
                    <Card
                        title="Our Collection"
                        image="/images/collection.jpeg"
                        text="Discover our extensive collection."
                        link="/AboutUs/collection"
                    />
                    <Card
                        title="Our Policy"
                        image="/images/policy.jpeg"
                        text="Read about our policies."
                        link="/AboutUs/policy"
                    />
                    <Card
                        title="Vision"
                        image="/images/fund.jpeg"
                        text="Take a look at our strategic framework."
                        link="/AboutUs/vision"
                    />
                </div>
                </div>
                </section>
                
                <ImageSlider />
                <section className="conclusion-section" >
                    <div className="row conclusion-container">
                        
                        <div className="col-9 map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.5405837788308!2d74.91245637489173!3d15.509124685092116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf33005e13988b%3A0xf1f71dc79f0bdc6a!2sIIT%20DHARWAD%20LIBRARY!5e0!3m2!1sen!2sin!4v1717351437291!5m2!1sen!2sin"
                                className="map-iframe"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title='lib'
                            ></iframe>
                        </div>
                        <div className='col-3 address-container'>
                        <p>Indian Institute of Technology Dharwad</p>
                        <p>Permanent Campus</p>
                        <p>Chikkamalligawad Village</p>
                        <p>Dharwad, Karnataka, India - 580007</p>
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
