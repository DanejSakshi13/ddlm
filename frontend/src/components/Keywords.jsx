


import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  padding-left: 20px ;
  padding-bottom:20px;
  background-color:rgb(37, 37, 37);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  // margin-top: 20px;
  width:125%;
  font-family: "Montserrat", serif;
  border: 0.5px #5f5f5f solid;

`;

const Title = styled.h3`
  color: white;
  margin-bottom: 15px;
    font-size: 1rem;
    margin-top:10px;

`;

const KeywordsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const KeywordTag = styled.span`
  background-color: #D2FF72;
  color: rgb(37,37,37);
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 14px;
  transition: all 0.2s ease;
  font-size:0.9vw;

  
  &:hover {
    transform: scale(1.05);
    // background-color:rgb(0, 0, 0);
    // color:white;
  }
`;

const Keywords = ({ keywords = [] }) => {
  if (!keywords.length) return null;

  return (
    <Section>
      <Title>Keywords</Title>
      <KeywordsList>
        {keywords.map((word, index) => (
          <KeywordTag key={`${word}-${index}`}>
            {word}
          </KeywordTag>
        ))}
      </KeywordsList>
    </Section>
  );
};

export default Keywords;










// separate keywords api calls 

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const Section = styled.div`
//   padding-left: 20px;
//   padding-bottom: 20px;
//   background-color: rgb(37, 37, 37);
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   width: 125%;
//   font-family: "Montserrat", serif;
//   border: 0.5px #5f5f5f solid;
// `;

// const Title = styled.h3`
//   color: white;
//   margin-bottom: 15px;
//   font-size: 1rem;
//   margin-top: 10px;
// `;

// const KeywordsList = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
// `;

// const KeywordTag = styled.span`
//   background-color: #d2ff72;
//   color: rgb(37, 37, 37);
//   padding: 6px 12px;
//   border-radius: 15px;
//   font-size: 0.9vw;
//   transition: all 0.2s ease;
//   &:hover {
//     transform: scale(1.05);
//   }
// `;

// const API_BASE_URL = "http://127.0.0.1:5000";

// const Keywords = ({ file, email, onKeywordsFetched }) => {
//   const [keywords, setKeywords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (file && email) {
//       fetchKeywords();
//     }
//   }, [file, email]);

//   const fetchKeywords = async () => {
//     setLoading(true);
//     setError("");
//     setKeywords([]);

//     try {
//       const formData = new FormData();
//       formData.append("pdf", file);
//       formData.append("email", email);
//       const response = await fetch(`${API_BASE_URL}/api/keywords/`, {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });
//       if (!response.ok) throw new Error(`Failed to fetch keywords: ${response.status}`);
//       const data = await response.json();
//       setKeywords(data.keywords || []);
//       if (onKeywordsFetched) {
//         onKeywordsFetched(data.keywords || []);
//       }
//     } catch (err) {
//       console.error("Error fetching keywords:", err);
//       setError(err.message || "Failed to fetch keywords.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading keywords...</p>;
//   if (error) return <p>{error}</p>;
//   if (!keywords.length) return null;

//   return (
//     <Section>
//       <Title>Keywords</Title>
//       <KeywordsList>
//         {keywords.map((word, index) => (
//           <KeywordTag key={`${word}-${index}`}>{word}</KeywordTag>
//         ))}
//       </KeywordsList>
//     </Section>
//   );
// };

// export default Keywords;