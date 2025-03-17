import React from 'react';
import { useNavigate } from 'react-router-dom'; // Add the navigate hook
import styled from 'styled-components';

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background:rgb(37, 37, 37);
  text-align: center;
  position: relative; /* For navbar positioning */
`;

const Navbar = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 15px;
`;

const NavButton = styled.button`
  background-color: transparent;
  border: 2px solid #D2FF72;
  color: #D2FF72;
  padding: 5px 15px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #D2FF72;
    color: rgb(37,37,37);
      border: 2px solid #D2FF72;

  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: white;
  font-weight: 900;
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: white;
  margin: 10px 200px;
`;

const GetStartedButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleGetStarted = () => {
    navigate('/home'); // Navigate to home page
  };

  const handleLogin = () => {
    navigate('/login'); // Navigate to login page
  };

  const handleSignup = () => {
    navigate('/signup'); // Navigate to signup page
  };

  return (
    <LandingPageContainer>
      <Navbar>
        <NavButton onClick={handleLogin}>Login</NavButton>
        <NavButton onClick={handleSignup}>Signup</NavButton>
      </Navbar>
      <Title>Welcome to ContextGPT</Title>
      <Description>
        A Data-Driven Language Model tailored to your input, offering precise tools like research paper summarization, analysis, and more.
      </Description>
      {/* <GetStartedButton onClick={handleGetStarted}>Get Started</GetStartedButton> */}
    </LandingPageContainer>
  );
};

export default LandingPage;
