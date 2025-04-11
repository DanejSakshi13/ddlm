// import React from 'react';
// import styled from 'styled-components';

// const Section = styled.div`
//   padding: 20px;
//   background-color: rgb(39, 39, 39);
//   border-radius: 8px;
//   /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
//   border: 0.5px #5f5f5f solid;

// `;

// const Title = styled.h3`
//   color: #ffffff;
//   margin-bottom: 10px;
//   font-size: 1rem;
// `;

// const Content = styled.ul`
//   color: #555;
//   font-weight: bold;
//   list-style: none;
//   padding: 0;
// `;

// const AuthorItem = styled.li`
//   margin-bottom: 5px;
// `;

// const Author = ({ authors }) => {
//   return (
//     <Section>
//       <Title>Authors</Title>
//       <Content>
//         {authors && authors.length > 0 ? (
//           authors.map((author, index) => (
//             <AuthorItem key={index}>{author}</AuthorItem>
//           ))
//         ) : (
//           <AuthorItem>No authors found</AuthorItem>
//         )}
//       </Content>
//     </Section>
//   );
// };

// export default Author;


import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  padding: 10px 20px 20px 20px;
  background-color: rgb(39, 39, 39);
  border-radius: 8px;
  border: 0.5px #5f5f5f solid;
`;

const Title = styled.h3`
  margin-top: 5px;
  color: #ffffff;
  margin-bottom: 10px;
  font-size: 1rem;
`;

const Content = styled.div`  /* Changed from ul to div */
  color: #555;
  font-size:0.80rem;
  display: flex;            /* Use flexbox for horizontal layout */
  flex-wrap: wrap;          /* Allow wrapping if authors exceed container width */
  gap: 15px;                /* Space between authors */
  padding: 0;
`;

const AuthorItem = styled.span`  /* Changed from li to span */
  color: #ffffff;     
  border: 0.1px #d2ff72 solid;
  padding: 5px;
  border-radius: 5px;

`;

const Author = ({ authors }) => {
  return (
    <Section>
      <Title>Authors</Title>
      <Content>
        {authors && authors.length > 0 ? (
          authors.map((author, index) => (
            <AuthorItem key={index}>{author}</AuthorItem>
          ))
        ) : (
          <AuthorItem>No authors found</AuthorItem>
        )}
      </Content>
    </Section>
  );
};

export default Author;