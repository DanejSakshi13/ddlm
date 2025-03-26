// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';

// const TitleContainer = styled.div`
//   margin: 20px 0;
//   font-size: 15px;
//   font-weight: bold;
//   color: #D2FF72;
//   background-color: rgb(39, 39, 39);
//   height: 35px;
//   padding: 10px;
//   padding-left: 30px;
//   border-radius: 8px;
//   border: 0.5px #5f5f5f solid;

//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   display: flex; /* Use flexbox for layout */
//   align-items: center; /* Center items vertically */
// `;

// const TitleLabel = styled.span`
//   color: white;
//   margin-right: 10px; /* Space between label and title */
//   font-size: 1rem;
// `;

// const TitleText = styled.span`
//   color: ${(props) => props.color || 'white'}; /* Use color prop or default to white */
//   font-size: 1rem;
// `;

// const PaperTitle = ({ title }) => {
//   const [title, setTitle] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTitle = async () => {
//       if (!file) return;

//       setLoading(true);
//       setError("");

//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         const response = await fetch("http://127.0.0.1:5000/api/extract-title", {
//           method: "POST",
//           body: formData,
//           mode: "cors",
//           credentials: "include",
//           headers: {
//             Accept: "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Server responded with status: ${response.status}`);
//         }

//         const data = await response.json();
//         if(data.title)
//         setTitle(data.title || "Title not found");
//       } catch (error) {
//         setError(`Error fetching title: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTitle();
//   }, [file]);

//   return (
//     <TitleContainer>
//       <TitleLabel>Title:</TitleLabel>
//       {/* {loading && <TitleText>Loading title...</TitleText>}
//       {/* {error && <TitleText>{error}</TitleText>} Set color for error */}
//       {/* {title && <TitleText color="#D2FF72">{title}</TitleText>} */} */
//       {title ? <TitleText color="#D2FF72">{title}</TitleText> : <TitleText>Title not available</TitleText>}

//     </TitleContainer>
//   );
// };

// export default PaperTitle;






























import React from "react";
import styled from "styled-components";

const TitleContainer = styled.div`
  margin: 20px 0;
  font-size: 15px;
  font-weight: bold;
  color: #d2ff72;
  background-color: rgb(39, 39, 39);
  height: 35px;
  padding: 10px;
  padding-left: 30px;
  border-radius: 8px;
  border: 0.5px #5f5f5f solid;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
`;

const TitleLabel = styled.span`
  color: white;
  margin-right: 10px;
  font-size: 1rem;
`;

const TitleText = styled.span`
  color: ${(props) => props.color || "white"};
  font-size: 1rem;
`;

const PaperTitle = ({ title }) => {
  return (
    <TitleContainer>
      <TitleLabel>Title:</TitleLabel>
      <TitleText color={title && title !== "Untitled" ? "#D2FF72" : "white"}>
        {title || "Untitled"}
      </TitleText>
    </TitleContainer>
  );
};

export default PaperTitle;