// // // Citations.jsx
// // import React, { useEffect, useState } from "react";
// // import styled from "styled-components";

// // const CitationsContainer = styled.div`
// //   margin-top: 20px;
// // `;

// // const CitationItem = styled.div`
// //   background-color: #f8f9fa;
// //   border: 1px solid #dee2e6;
// //   border-radius: 4px;
// //   padding: 10px;
// //   margin-bottom: 10px;
// // `;

// // const Citations = ({ file }) => {
// //   const [citations, setCitations] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchCitations = async () => {
// //       if (!file) return;

// //       setLoading(true);
// //       setError("");

// //       const citationFormData = new FormData();
// //       citationFormData.append("file", file);

// //       try {
// //         const response = await fetch("http://127.0.0.1:5000/api/extract-citations", {
// //           method: "POST",
// //           body: citationFormData,
// //           mode: "cors",
// //           credentials: "include",
// //           headers: {
// //             Accept: "application/json",
// //           },
// //         });

// //         if (!response.ok) {
// //           throw new Error(`Server responded with status: ${response.status}`);
// //         }

// //         const citationData = await response.json();
// //         setCitations(citationData.citations || []);
// //       } catch (error) {
// //         console.error("Error fetching citations:", error);
// //         setError(`Unable to fetch citations. ${error.message || "Please try again."}`);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCitations();
// //   }, [file]); // Run effect when the file prop changes

// //   return (
// //     <CitationsContainer>
// //       <h3>Extracted Citations</h3>
// //       {loading && <p>Loading citations...</p>}
// //       {error && <p style={{ color: "red" }}>{error}</p>}
// //       {citations.length > 0 ? (
// //         citations.map((citation, index) => (
// //           <CitationItem key={index}>
// //             {citation}
// //           </CitationItem>
// //         ))
// //       ) : (
// //         <p>No citations found.</p>
// //       )}
// //     </CitationsContainer>
// //   );
// // };

// // export default Citations;












// // // Citations.jsx
// // import React, { useEffect, useState } from "react";
// // import styled from "styled-components";

// // const Title = styled.h3`
// //   color: white;
// //   margin-bottom: 15px;
// //     font-size: 1rem;
// //     margin-top:10px;

// // `;

// // const CitationsContainer = styled.div`
// //   margin-top: 20px;
// //   max-height: 300px; /* Set a fixed height for the container */
// //   overflow-y: auto; /* Enable vertical scrolling */
// //   border: 0.5px #5f5f5f solid;  
// //   border-radius: 8px; /* Optional: Add rounded corners */
// //   padding: 10px; /* Optional: Add padding */
// //   background-color: rgb(37, 37, 37);
  

// //   /* Custom scrollbar styles */
// //   &::-webkit-scrollbar {
// //     width: 8px; /* Width of the scrollbar */
// //   }

// //   &::-webkit-scrollbar-track {
// //     background: rgb(50, 50, 50); /* Background of the scrollbar track */
// //     border-radius: 8px; /* Rounded corners for the track */
// //   }

// //   &::-webkit-scrollbar-thumb {
// //     background: #D2FF72; /* Color of the scrollbar thumb */
// //     border-radius: 8px; /* Rounded corners for the thumb */
// //   }

// //   &::-webkit-scrollbar-thumb:hover {
// //     background: #A2FF72; /* Color of the thumb on hover */
// //   }

// //   /* Firefox scrollbar styles */
// //   scrollbar-width: thin; /* Use a thin scrollbar */
// //   scrollbar-color: #D2FF72 rgb(50, 50, 50); /* Thumb color and track color */
// // `;

// // const CitationItem = styled.div`
// //   background-color: #ffffff;
// //   border: 1px solid #dee2e6;
// //   border-radius: 4px;
// //   padding: 10px;
// //   margin-bottom: 10px;
// //   font-size: 12px;
// //   color: rgb(37,37,37);
// // `;

// // const Citations = ({ file }) => {
// //   const [citations, setCitations] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchCitations = async () => {
// //       if (!file) return;

// //       setLoading(true);
// //       setError("");

// //       const citationFormData = new FormData();
// //       citationFormData.append("file", file);

// //       try {
// //         const response = await fetch("http://127.0.0.1:5000/api/extract-citations", {
// //           method: "POST",
// //           body: citationFormData,
// //           mode: "cors",
// //           credentials: "include",
// //           headers: {
// //             Accept: "application/json",
// //           },
// //         });

// //         if (!response.ok) {
// //           throw new Error(`Server responded with status: ${response.status}`);
// //         }

// //         const citationData = await response.json();
// //         setCitations(citationData.citations || []);
// //       } catch (error) {
// //         console.error("Error fetching citations:", error);
// //         setError(`Unable to fetch citations. ${error.message || "Please try again."}`);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCitations();
// //   }, [file]); // Run effect when the file prop changes

// //   return (
// //     <CitationsContainer>
// //       <Title>Extracted Citations</Title>
// //       {/* {loading && <p>Loading citations...</p>} */}
// //       {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
// //       {citations.length > 0 ? (
// //         citations.map((citation, index) => (
// //           <CitationItem key={index}>
// //             {citation}
// //           </CitationItem>
// //         ))
// //       ) : (
// //         <p>No citations found.</p>
// //       )}
// //     </CitationsContainer>
// //   );
// // };

// // export default Citations;

































import React from "react";
import styled from "styled-components";

const Title = styled.h3`
  color: white;
  margin-bottom: 15px;
  font-size: 1rem;
  margin-top: 10px;
`;

const CitationsContainer = styled.div`
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
  border: 0.5px #5f5f5f solid;
  border-radius: 8px;
  padding: 10px;
  background-color: rgb(37, 37, 37);
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgb(50, 50, 50);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #D2FF72;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #A2FF72;
  }
  scrollbar-width: thin;
  scrollbar-color: #D2FF72 rgb(50, 50, 50);
`;

const CitationItem = styled.div`
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 12px;
  color: rgb(37, 37, 37);
`;

const Citations = ({ citations }) => {
  console.log("Rendering Citations with:", citations);

  return (
    <CitationsContainer>
      <Title>Extracted Citations</Title>
      {citations.length > 0 ? (
        citations.map((citation, index) => (
          <CitationItem key={index}>{citation}</CitationItem>
        ))
      ) : (
        <p>No citations found.</p>
      )}
    </CitationsContainer>
  );
};

export default Citations;

































// writing api calls Headers, not in dashbaord
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const CitationsContainer = styled.div`
//   margin-top: 20px;
//   padding: 15px;
//   background: #fff;
//   border-radius: 8px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
// `;

// const CitationsTitle = styled.h3`
//   font-family: "Montserrat", serif;
//   font-weight: 500;
//   margin-bottom: 10px;
//   color: #333;
// `;

// const CitationList = styled.ul`
//   list-style-type: none;
//   padding: 0;
// `;

// const CitationItem = styled.li`
//   font-family: "Montserrat", serif;
//   font-size: 14px;
//   color: #666;
//   margin-bottom: 10px;
// `;

// const API_BASE_URL = "http://127.0.0.1:5000";

// const Citations = ({ file, email, onCitationsFetched }) => {
//   const [citations, setCitations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (file && email) {
//       fetchCitations();
//     }
//   }, [file, email]);

//   const fetchCitations = async () => {
//     setLoading(true);
//     setError("");
//     setCitations([]);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       const response = await fetch(`${API_BASE_URL}/api/extract-citations`, {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });
//       if (!response.ok) throw new Error(`Failed to fetch citations: ${response.status}`);
//       const data = await response.json();
//       setCitations(data.citations || []);
//       if (onCitationsFetched) {
//         onCitationsFetched(data.citations || []);
//       }
//     } catch (err) {
//       console.error("Error fetching citations:", err);
//       setError(err.message || "Failed to fetch citations.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading citations...</p>;
//   if (error) return <p>{error}</p>;
//   if (!citations.length) return null;

//   return (
//     <CitationsContainer>
//       <CitationsTitle>Citations</CitationsTitle>
//       <CitationList>
//         {citations.map((citation, index) => (
//           <CitationItem key={index}>{citation}</CitationItem>
//         ))}
//       </CitationList>
//     </CitationsContainer>
//   );
// };

// export default Citations;