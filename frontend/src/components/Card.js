import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css';

const Card = ({ title, image, text, link }) => {
    return (
        <section id="aboutuspage" className="col-lg-3 d-flex align-items-stretch">
        <Link to={link} className="card">
            <div className="card-image">
                <img src={image} alt={title} />
            </div>
            <div className="card-text">
                <p><strong>{title}</strong> - {text}</p>
            </div>
        </Link>
        </section>
    );
};

export default Card;
