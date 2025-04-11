import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const RecommendationsContainer = styled.div`
  width: 95%;
  margin: 20px 0;
  padding: 20px;
  background-color:rgb(37, 37, 37);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 0.5px #5f5f5f solid;
  font-family: "Montserrat", serif;

`;

const RecommendationItem = styled.div`
  width: 97.5%;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  margin-bottom: 10px;
  color: rgb(255, 255, 255);
  font-size: 1rem;
`;

const PaperTitle  = styled.p`
margin-top: -2px;
margin-bottom: 1px;
color: rgb(37,37,37);
font-size: 0.80rem;
font-weight: bold;
`;

const PublicationDate = styled.p`
/* margin-top: -2px; */
  margin: 0;
  color: rgb(37,37,37);
  font-size: 0.9rem;
  font-size: 0.7rem;
`;

const Link = styled.a`
  margin: 4px 0;
  color: #007bff;
  text-decoration: none;
  font-size: 0.8rem;
  &:hover {
    text-decoration: underline;
  }
`;


const Recommendations = ({ keywords, recommendations: propRecommendations }) => {
    const [recommendations, setRecommendations] = useState(propRecommendations || []);
    const [loading, setLoading] = useState(!propRecommendations);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!propRecommendations) {
        const fetchRecommendations = async () => {
          try {
            const response = await fetch('http://127.0.0.1:5000/api/recommend/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ keywords }),
            });
            if (!response.ok) {
              throw new Error(`Failed to fetch recommendations: ${response.status}`);
            }
            const data = await response.json();
            setRecommendations(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
  
        if (keywords.length > 0) {
          fetchRecommendations();
        }
      }
    }, [keywords, propRecommendations]);

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p>Error: {error}</p>;
  if (recommendations.length === 0) return <p>No recommendations found.</p>;

  return (
    <RecommendationsContainer>
      <Title>Recommended/Related Papers</Title>
      {recommendations.map((rec, index) => (
        <RecommendationItem key={index}>
          <PaperTitle>{rec.title}</PaperTitle>
          <PublicationDate>Published: {rec.published}</PublicationDate>
          <Link href={rec.url} target="_blank" rel="noopener noreferrer">Read More</Link>
        </RecommendationItem>
      ))}
    </RecommendationsContainer>
  );
};

export default Recommendations;
