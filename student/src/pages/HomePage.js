// src/pages/HomePage.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: rgba(240, 244, 248, 0.8);
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: #004085;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  color: #0056b3;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  color: #6c757d;
  font-size: 1.25rem;
  max-width: 800px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 300px;
  text-align: left;
`;

const CardTitle = styled.h3`
  color: #0056b3;
  margin-bottom: 1rem;
`;

const CardContent = styled.p`
  color: #6c757d;
`;

const HomePage = () => (
  <Container>
    <MainContent>
      <Title>Welcome to the College Library Management System</Title>
      <Subtitle>Your Gateway to Knowledge</Subtitle>
      <Description>
        Explore a vast collection of books, journals, and digital resources.
        Manage your loans, track your borrowing history, and stay updated with
        the latest library events. Our system provides easy access to all the
        resources you need for your academic success.
      </Description>
      <CardContainer>
        <Card>
          <CardTitle>Extensive Resources</CardTitle>
          <CardContent>
            Access a wide range of books, journals, and digital materials to support your studies.
          </CardContent>
        </Card>
        <Card>
          <CardTitle>User-Friendly Interface</CardTitle>
          <CardContent>
            Our system is designed to be intuitive and easy to use, making it simple to find what you need.
          </CardContent>
        </Card>
        <Card>
          <CardTitle>24/7 Support</CardTitle>
          <CardContent>
            Get help whenever you need it with our round-the-clock support services.
          </CardContent>
        </Card>
      </CardContainer>
    </MainContent>
  </Container>
);

export default HomePage;
