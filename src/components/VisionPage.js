// src/components/VisionPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/VisionPage.css';
import Footer from './Footer';

const VisionPage = () => {
    return (
        <div className="vision-page">
            <header className="header">
                <h1>Our Framework</h1>
            </header>
            <nav className="vision-nav">
                <ul>
                    <li><a href="#purpose">Our Purpose</a></li>
                    <li><a href="#values">Our Values</a></li>
                    <li><a href="#vision">Our Vision</a></li>
                    <li><a href="#strategic-priorities">Strategic Priorities</a></li>
                </ul>
            </nav>
            <div className="vision-content">
                <section id="purpose">
                    <h2>Our Purpose</h2>
                    <p>
                        Our purpose is to provide a welcoming environment for learning and research, empowering our community with access to knowledge and resources. 
                        Our library serves as a dynamic center for intellectual engagement and the pursuit of academic excellence. We strive to foster a culture of curiosity 
                        and lifelong learning, where every member of our community can explore their interests, expand their horizons, and achieve their full potential.
                    </p>
                    <p>
                        By offering a diverse range of resources, programs, and services, we aim to support the educational and informational needs of all individuals. 
                        Whether you are a student, faculty member, researcher, or lifelong learner, our library is here to provide the tools and support you need to succeed.
                    </p>
                </section>
                <section id="values">
                    <h2>Our Values</h2>
                    <p>
                        We value inclusivity, accessibility, and the continuous pursuit of knowledge. Our commitment is to serve the community with integrity and dedication. 
                        We uphold the principles of free access to information, respect for individual privacy, and fostering a culture of curiosity and lifelong learning. 
                        We believe that everyone deserves the opportunity to learn and grow, regardless of their background or circumstances.
                    </p>
                    <p>
                        Our values guide everything we do, from the services we provide to the way we interact with our patrons. We are committed to creating a welcoming 
                        and supportive environment where everyone feels valued and respected. Our staff members are dedicated to helping you find the information and resources 
                        you need, and we continuously strive to improve our services to better meet your needs.
                    </p>
                </section>
                <section id="vision">
                    <h2>Our Vision</h2>
                    <p>
                        Our vision is to be a cornerstone of knowledge and a catalyst for lifelong learning, inspiring innovation and excellence in our community. 
                        We envision a future where our library remains at the forefront of educational and technological advancements, continually adapting to meet the 
                        evolving needs of our patrons. We aim to be a leader in the library community, known for our innovative services, exceptional resources, and commitment 
                        to excellence.
                    </p>
                    <p>
                        We are dedicated to providing a space where individuals can come together to learn, create, and share ideas. Our library will continue to evolve, 
                        embracing new technologies and innovative approaches to information sharing and learning. By staying true to our mission and values, we will create 
                        a brighter future for our community, one where knowledge is freely accessible and lifelong learning is a way of life.
                    </p>
                </section>
                <section id="strategic-priorities">
                    <h2>Strategic Priorities</h2>
                    <ul>
                        <li>
                            <strong>Enhancing Digital Access:</strong> Implementing advanced digital resources and ensuring seamless access to online databases and e-books. 
                            We will invest in cutting-edge technologies and digital platforms to enhance the user experience and make information more accessible than ever before.
                        </li>
                        <li>
                            <strong>Community Engagement:</strong> Hosting workshops, lectures, and cultural events that promote active community participation and engagement. 
                            Our goal is to create a vibrant community hub where individuals can come together to learn, share, and collaborate.
                        </li>
                        <li>
                            <strong>Supporting Research:</strong> Providing specialized support for academic research, including research consultations, interlibrary loan services, 
                            and access to scholarly journals. We are committed to supporting the research needs of our academic community and fostering a culture of inquiry and discovery.
                        </li>
                        <li>
                            <strong>Inclusive Spaces:</strong> Creating inclusive and accessible physical spaces that cater to the diverse needs of our community. 
                            We will ensure that our library is a welcoming and comfortable place for everyone, with spaces designed to support a variety of learning and working styles.
                        </li>
                        <li>
                            <strong>Sustainability:</strong> Implementing eco-friendly practices in library operations and promoting sustainability through educational initiatives. 
                            We are committed to reducing our environmental impact and promoting sustainable practices within our community.
                        </li>
                    </ul>
                </section>
            </div>
            <Link to="/" className="back-link">
                <button className="back-button">Back to About Us</button>
            </Link>
            <Footer />
        </div>
    );
};

export default VisionPage;
