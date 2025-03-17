// // src/components/Keywords.jsx
// import React from 'react';
// import styled from 'styled-components';

// const Section = styled.div`
//   padding: 20px;
//   background-color: #e3f2fd;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const Title = styled.h3`
//   color: #333;
//   margin-bottom: 10px;
// `;

// const KeywordsList = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 8px;
// `;

// const KeywordTag = styled.span`
//   background-color: #2196f3;
//   color: white;
//   padding: 5px 10px;
//   border-radius: 15px;
//   font-size: 14px;
// `;

// const Keywords = ({ keywords }) => {
//   return (
//     <Section>
//       <Title>Keywords</Title>
//       <KeywordsList>
//         {keywords.map((word, index) => (
//           <KeywordTag key={index}>{word}</KeywordTag>
//         ))}
//       </KeywordsList>
//     </Section>
//   );
// };

// export default Keywords;





// Keywords.jsx
//working code
// import React from 'react';
// import styled from 'styled-components';

// const KeywordsSection = styled.div`
//   padding: 20px;
//   background-color: #e3f2fd;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   margin-top: 20px;
// `;

// const Title = styled.h3`
//   color: #333;
//   margin-bottom: 15px;
//   font-size: 1.2rem;
// `;

// const KeywordsList = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 8px;
// `;

// const KeywordTag = styled.span`
//   background-color: #2196f3;
//   color: white;
//   padding: 6px 12px;
//   border-radius: 15px;
//   font-size: 14px;
//   transition: transform 0.2s;

//   &:hover {
//     transform: scale(1.05);
//   }
// `;

// const Keywords = ({ keywords = [] }) => {
//   if (!keywords.length) return null;

//   return (
//     <KeywordsSection>
//       <Title>Keywords</Title>
//       <KeywordsList>
//         {keywords.map((word, index) => (
//           <KeywordTag key={`${word}-${index}`}>{word}</KeywordTag>
//         ))}
//       </KeywordsList>
//     </KeywordsSection>
//   );
// };

// export default Keywords;













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