// ImageSlider component
import React from 'react';
import Slider from 'react-slick'; // Importing the react-slick slider component
import 'slick-carousel/slick/slick.css'; // Importing slick carousel base styles
import 'slick-carousel/slick/slick-theme.css'; // Importing slick carousel theme styles
import '../styles/ImageSlider.css'; // Importing custom styles for the image slider

const ImageSlider = () => {
    // Configuration settings for the react-slick slider
    const settings = {
        dots: true, // Display navigation dots below the slider
        infinite: true, // Enable infinite looping of slides
        speed: 500, // Transition speed in milliseconds
        slidesToShow: 1, // Number of slides to show at once
        slidesToScroll: 1, // Number of slides to scroll at once
        autoplay: true, // Enable automatic sliding
        autoplaySpeed: 20000, // Time interval for automatic sliding in milliseconds
    };

    // Array of image paths to be displayed in the slider
    const images = [
        '/images/staff1.jpg',
        '/images/staff2.jpg',
        '/images/staff3.jpg',
    ];

    return (
        // Main section 
        <section id="aboutuspage" style={{ backgroundColor: '#0b1116' }}>
            <div className="slider-container">
                {/*-------- Title of the image slider----- */}
                <h2>Gallery</h2>
 {/*-------- Implementing the Slider component with the specified settings---------- */}
                <Slider {...settings}>
           {/*---- Map over the images array to create a slide for each image---- */}
                    {images.map((image, index) => (
                        <div key={index}>
                       {/*----- Display each image------ */}
                            <img src={image} alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default ImageSlider;
