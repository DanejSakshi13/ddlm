import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(37, 37, 37);
`;

const Card = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.32);
  width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: rgb(37, 37, 37);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: rgb(0, 0, 0);
  }
`;

const LinkText = styled.p`
  margin-top: 20px;
  color: #555;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
`;

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: fullName, email, password }),
      });

      if (response.ok) {
        navigate('/home'); // Redirect to home page
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (err) {
      setError('An error occurred.');
    }
  };

  return (
    <SignupContainer>
      <Card>
        <Title>Signup</Title>
        {error && <ErrorText>{error}</ErrorText>}
        <Input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button onClick={handleSignup}>Signup</Button>
        <LinkText>
          Already have an account? <a href="/login">Login</a>
        </LinkText>
      </Card>
    </SignupContainer>
  );
};

export default Signup;
