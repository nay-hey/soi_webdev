// src/components/CardDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/CardDetail.css';

const cardDetails = {
    team: "Detailed information about our dedicated team members...",
    collection: "Our library houses a vast collection of books, journals, and digital resources...",
    policy: "Our policies ensure a smooth and fair experience for all members...",
    fund: "Learn how you can contribute to our library and support our mission..."
};

const CardDetail = () => {
    const { cardId } = useParams();
    const content = cardDetails[cardId] || "Content not found";

    return (
        <div className="card-detail">
            <h2>More about {cardId}</h2>
            <p>{content}</p>
        </div>
    );
};

export default CardDetail;
