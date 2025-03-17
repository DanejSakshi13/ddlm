// // src/components/Summarizer.jsx
// import React from 'react';
// import styled from 'styled-components';

// const Section = styled.div`
//   padding: 20px;
//   background-color: #ffffff;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const Title = styled.h3`
//   color: #333;
//   margin-bottom: 10px;
// `;

// const Content = styled.p`
//   color: #555;
// `;

// const Summarizer = ({ summary }) => {
//   return (
//     <Section>
//       <Title>Summary</Title>
//       <Content>{summary}</Content>
//     </Section>
//   );
// };

// export default Summarizer;



// import React from 'react';
// import styled from 'styled-components';

// const Section = styled.div`
//   padding: 20px;
//   background-color: #ffffff;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   margin-top: 20px;
// `;

// const Title = styled.h3`
//   color: #333;
//   margin-bottom: 10px;
// `;

// const Content = styled.p`
//   color: #555;
//   white-space: pre-wrap;
// `;

// const Summarizer = ({ summary }) => {
//   return (
//     <Section>
//       <Title>Summary</Title>
//       <Content>{summary}</Content>
//     </Section>
//   );
// };

// export default Summarizer;

























// Summarizer.jsx
import React from 'react';
import styled from 'styled-components';

const SummarySection = styled.div`
  padding: 30px;
  background-color:rgb(37, 37, 37);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 93%;
  margin-top: 20px;
    transition: all 0.2s ease;
    border: 0.5px #5f5f5f solid;
    font-family: "Montserrat", serif;

   &:hover {
    transform: scale(1.01);
    // background-color:rgb(255, 255, 255);
  }
`;

const Title = styled.h3`
  color: white;
  margin-bottom: 15px;
  font-size: 1rem;
  margin-top:0;
`;

const Content = styled.p`
  color: white;
  line-height: 1.6;
  white-space: pre-wrap;
  font-size:0.80rem;
`;

const Summarizer = ({ summary }) => {
  if (!summary) return null;

  return (
    <SummarySection>
      <Title>Summary</Title>
      <Content>{summary}</Content>
    </SummarySection>
  );
};

export default Summarizer;