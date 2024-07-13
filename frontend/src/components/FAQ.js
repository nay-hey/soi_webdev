//faq content component
import React, { useState } from 'react';
import '../styles/FAQ.css'; 

const FAQ = () => {
    // State to control the visibility of the "Show More" section
    const [showMore, setShowMore] = useState(false);
    
    // State to control the visibility of each question's answer
    const [visibleQuestions, setVisibleQuestions] = useState(Array(10).fill(false));

    // Function to toggle the visibility of a specific question's answer
    const toggleAnswer = (index) => {
        const updatedVisibility = [...visibleQuestions];
        updatedVisibility[index] = !updatedVisibility[index];
        setVisibleQuestions(updatedVisibility);
    };

    // Function to toggle the visibility of the "Show More" section
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    // Array of FAQ questions and answers
    const questions = [
        { question: "What are the library's opening hours?", answer: "The library is open from 8 AM to 10 PM from Monday to Saturday." },
        { question: "How can I renew borrowed books?", answer: "You can renew borrowed books online through your library account or by visiting the library." },
        { question: "What is the late fee for overdue books?", answer: "The late fee is $1 per day for each overdue book." },
        { question: "Can I reserve a study room?", answer: "Yes, you can reserve a study room online or at the library reception." },
        { question: "How do I get a library card?", answer: "Library cards are issued at the library reception. Please bring a valid ID." },
        { question: "Can I access online journals?", answer: "Yes, online journals are accessible through the library's digital resources portal." },
        { question: "Is there a photocopying service available?", answer: "Yes, photocopying services are available at a nominal charge." },
        { question: "How can I suggest a book for purchase?", answer: "You can suggest a book for purchase through the library's recommendation form available on our website." },
        { question: "Are there any library tours available?", answer: "Yes, library tours are conducted on the first Monday of every month." },
        { question: "Can I access the library's digital archives?", answer: "Yes, the digital archives are accessible through the library's website." }
    ];

    // Determine the list of questions to display based on the state of "showMore"
    const displayedQuestions = showMore ? questions : questions.slice(0, 5);

    return (
        <div className="faq">
            {/*--------- FAQ Title------- */}
            <h2>Frequently Asked Questions</h2>
            
            {/*-- List of FAQ questions and answers-- */}
            <ul>
                {displayedQuestions.map((item, index) => (
                    <li key={index} className="faq-item" onClick={() => toggleAnswer(index)}>
                        <div className="faq-question">
                            {item.question}
                            {/* Arrow indicator for expandable answers */}
                            <span className="arrow">{visibleQuestions[index] ? '▲' : '▼'}</span>
                        </div>
                        {/* Conditional rendering of the answer based on visibility state */}
                        {visibleQuestions[index] && <div className="faq-answer">{item.answer}</div>}
                    </li>
                ))}
            </ul>
            
            {/* Toggle button to show more or less questions */}
            <div className="show-more" onClick={toggleShowMore}>
                {showMore ? 'Show Less' : 'Show More'}
            </div>
        </div>
    );
};

export default FAQ;
