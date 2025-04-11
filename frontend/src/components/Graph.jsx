import React from "react";
import styled from "styled-components";



const GraphContainer = styled.div`
  text-align: center;
  margin-left: 130px;
  background-color:rgb(37, 37, 37);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  min-height: 50px; /* Ensures a small default height */
  padding: 10px; /* Adds spacing */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0.5px #5f5f5f solid;

`;


const GraphImage = styled.img`
  max-width: 90%;
  max-height: 320px; /* Restrict max height */
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 15px;
`;


const NoDataMessage = styled.p`
  color:#D2FF72;;
  // font-weight: bold;
  padding:0;
  margin:0;
  font-size:0.80rem;

`;

const Title = styled.h3`
  color: white;
  // margin-bottom: 15px;
  font-size: 1rem;
  padding:0;
  margin-top:10px;
  margin-left:25px;
  text-align:left;
  margin-bottom:0px;
`;

const Graph = ({ graphUrl }) => {
  return (
    <GraphContainer>
      <Title>Extracted Table Graph</Title>
      {graphUrl === "no-data" ? (
        <NoDataMessage>No numeric data available for visualization</NoDataMessage>
      ) : graphUrl ? (
        <GraphImage src={graphUrl} alt="Extracted Table Graph" />
      ) : null}
    </GraphContainer>
  );
};

export default Graph;









// updated api call
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const GraphContainer = styled.div`
//   text-align: center;
//   margin-left: 130px;
//   background-color: rgb(37, 37, 37);
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   max-width: 80%;
//   min-height: 50px;
//   padding: 10px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   border: 0.5px #5f5f5f solid;
// `;

// const GraphImage = styled.img`
//   max-width: 90%;
//   max-height: 320px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   margin-bottom: 15px;
// `;

// const NoDataMessage = styled.p`
//   color: #d2ff72;
//   padding: 0;
//   margin: 0;
//   font-size: 0.80rem;
// `;

// const Title = styled.h3`
//   color: white;
//   font-size: 1rem;
//   padding: 0;
//   margin-top: 10px;
//   margin-left: 25px;
//   text-align: left;
//   margin-bottom: 0px;
// `;

// const API_BASE_URL = "http://127.0.0.1:5000";

// const Graph = ({ file, email, onGraphFetched }) => {
//   const [graphUrl, setGraphUrl] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (file && email) {
//       fetchGraph();
//     }
//   }, [file, email]);

//   const fetchGraph = async () => {
//     setLoading(true);
//     setError("");
//     setGraphUrl(null);

//     try {
//       const formData = new FormData();
//       formData.append("pdf", file);
//       const response = await fetch(`${API_BASE_URL}/api/table-extract`, {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });
//       if (!response.ok) throw new Error(`Failed to fetch graph: ${response.status}`);
//       let graphUrl = "";
//       if (response.headers.get("content-type")?.includes("image")) {
//         const blob = await response.blob();
//         graphUrl = URL.createObjectURL(blob);
//       } else {
//         const data = await response.json();
//         if (data.message === "No numeric data available for visualization") graphUrl = "no-data";
//       }
//       setGraphUrl(graphUrl);
//       if (onGraphFetched) {
//         onGraphFetched(graphUrl);
//       }
//     } catch (err) {
//       console.error("Error fetching graph:", err);
//       setError(err.message || "Failed to fetch graph.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading graph...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <GraphContainer>
//       <Title>Extracted Table Graph</Title>
//       {graphUrl === "no-data" ? (
//         <NoDataMessage>No numeric data available for visualization</NoDataMessage>
//       ) : graphUrl ? (
//         <GraphImage src={graphUrl} alt="Extracted Table Graph" />
//       ) : null}
//     </GraphContainer>
//   );
// };

// export default Graph;