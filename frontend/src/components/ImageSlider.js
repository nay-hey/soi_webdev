// src/components/ImageSlider.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/ImageSlider.css';

const ImageSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 20000,
    };

    const images = [
        '/images/staff1.jpg',
        '/images/staff2.jpg',
        '/images/staff3.jpg',
    ];

    return (
        <section id="aboutuspage">
        <div className="slider-container">
            <h2>Gallery</h2>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
    </section>
    );
};

export default ImageSlider;
