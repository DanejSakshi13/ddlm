import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  padding: 20px;
  background-color: #fff3e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  color: #333;
  margin-bottom: 10px;
`;

const Content = styled.p`
  color: #555;
  font-weight: bold;
`;

const Author = ({ author }) => {
  return (
    <Section>
      <Title>Author</Title>
      <Content>{author}</Content>
    </Section>
  );
};

export default Author;
