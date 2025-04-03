


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











// separate api

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const TitleContainer = styled.div`
//   margin: 20px 0;
//   font-size: 15px;
//   font-weight: bold;
//   color: #d2ff72;
//   background-color: rgb(39, 39, 39);
//   height: 35px;
//   padding: 10px;
//   padding-left: 30px;
//   border-radius: 8px;
//   border: 0.5px #5f5f5f solid;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   display: flex;
//   align-items: center;
// `;

// const TitleLabel = styled.span`
//   color: white;
//   margin-right: 10px;
//   font-size: 1rem;
// `;

// const TitleText = styled.span`
//   color: ${(props) => props.color || "white"};
//   font-size: 1rem;
// `;

// const API_BASE_URL = "http://127.0.0.1:5000";

// const PaperTitle = ({ file, email, onTitleFetched }) => {
//   const [title, setTitle] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (file && email) {
//       fetchTitle();
//     }
//   }, [file, email]);

//   const fetchTitle = async () => {
//     setLoading(true);
//     setError("");
//     setTitle("");

//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       const response = await fetch(`${API_BASE_URL}/api/extract-title`, {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });
//       if (!response.ok) throw new Error(`Failed to fetch title: ${response.status}`);
//       const data = await response.json();
//       const extractedTitle =
//         data.title && data.title !== "Title not found" && data.title.trim()
//           ? data.title
//           : "Untitled";
//       setTitle(extractedTitle);
//       if (onTitleFetched) {
//         onTitleFetched(extractedTitle);
//       }
//     } catch (err) {
//       console.error("Error fetching title:", err);
//       setError(err.message || "Failed to fetch title.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading title...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <TitleContainer>
//       <TitleLabel>Title:</TitleLabel>
//       <TitleText color={title && title !== "Untitled" ? "#D2FF72" : "white"}>
//         {title || "Untitled"}
//       </TitleText>
//     </TitleContainer>
//   );
// };

// export default PaperTitle;