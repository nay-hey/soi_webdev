// src/components/SimpleCard.js
import React from 'react';
import '../styles/SimpleCard.css';

const SimpleCard = ({ title, text }) => {
    return (
        <div className="simple-card">
            <div className="simple-card-text">
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default SimpleCard;
