// Card component
import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/Card.css'; 

// Card component definition, destructuring props for clarity
const Card = ({ title, image, text, link }) => {
    return (
        // Main section for the card
        <section id="aboutuspage" className="col-lg-3 d-flex align-items-stretch">
            {/* Card container with a link wrapping the entire card */}
            <a href={link} className="card">
                {/* Container for the card image */}
                <div className="card-image">
                    {/* Image element with src and alt attributes */}
                    <img src={image} alt={title} />
                </div>
                {/* Container for the card text */}
                <div className="card-text">
                   
                    <p><strong>{title}</strong> - {text}</p>
                </div>
            </a>
        </section>
    );
};

export default Card;
