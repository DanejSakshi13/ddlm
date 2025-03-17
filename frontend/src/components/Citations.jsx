// // Citations.jsx
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";

// const CitationsContainer = styled.div`
//   margin-top: 20px;
// `;

// const CitationItem = styled.div`
//   background-color: #f8f9fa;
//   border: 1px solid #dee2e6;
//   border-radius: 4px;
//   padding: 10px;
//   margin-bottom: 10px;
// `;

// const Citations = ({ file }) => {
//   const [citations, setCitations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchCitations = async () => {
//       if (!file) return;

//       setLoading(true);
//       setError("");

//       const citationFormData = new FormData();
//       citationFormData.append("file", file);

//       try {
//         const response = await fetch("http://127.0.0.1:5000/api/extract-citations", {
//           method: "POST",
//           body: citationFormData,
//           mode: "cors",
//           credentials: "include",
//           headers: {
//             Accept: "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Server responded with status: ${response.status}`);
//         }

//         const citationData = await response.json();
//         setCitations(citationData.citations || []);
//       } catch (error) {
//         console.error("Error fetching citations:", error);
//         setError(`Unable to fetch citations. ${error.message || "Please try again."}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCitations();
//   }, [file]); // Run effect when the file prop changes

//   return (
//     <CitationsContainer>
//       <h3>Extracted Citations</h3>
//       {loading && <p>Loading citations...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {citations.length > 0 ? (
//         citations.map((citation, index) => (
//           <CitationItem key={index}>
//             {citation}
//           </CitationItem>
//         ))
//       ) : (
//         <p>No citations found.</p>
//       )}
//     </CitationsContainer>
//   );
// };

// export default Citations;












// Citations.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Title = styled.h3`
  color: white;
  margin-bottom: 15px;
    font-size: 1rem;
    margin-top:10px;

`;

const CitationsContainer = styled.div`
  margin-top: 20px;
  max-height: 300px; /* Set a fixed height for the container */
  overflow-y: auto; /* Enable vertical scrolling */
  border: 0.5px #5f5f5f solid;  
  border-radius: 8px; /* Optional: Add rounded corners */
  padding: 10px; /* Optional: Add padding */
  background-color: rgb(37, 37, 37);
  

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: rgb(50, 50, 50); /* Background of the scrollbar track */
    border-radius: 8px; /* Rounded corners for the track */
  }

  &::-webkit-scrollbar-thumb {
    background: #D2FF72; /* Color of the scrollbar thumb */
    border-radius: 8px; /* Rounded corners for the thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #A2FF72; /* Color of the thumb on hover */
  }

  /* Firefox scrollbar styles */
  scrollbar-width: thin; /* Use a thin scrollbar */
  scrollbar-color: #D2FF72 rgb(50, 50, 50); /* Thumb color and track color */
`;

const CitationItem = styled.div`
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 12px;
  color: rgb(37,37,37);
`;

const Citations = ({ file }) => {
  const [citations, setCitations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCitations = async () => {
      if (!file) return;

      setLoading(true);
      setError("");

      const citationFormData = new FormData();
      citationFormData.append("file", file);

      try {
        const response = await fetch("http://127.0.0.1:5000/api/extract-citations", {
          method: "POST",
          body: citationFormData,
          mode: "cors",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const citationData = await response.json();
        setCitations(citationData.citations || []);
      } catch (error) {
        console.error("Error fetching citations:", error);
        setError(`Unable to fetch citations. ${error.message || "Please try again."}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCitations();
  }, [file]); // Run effect when the file prop changes

  return (
    <CitationsContainer>
      <Title>Extracted Citations</Title>
      {/* {loading && <p>Loading citations...</p>} */}
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      {citations.length > 0 ? (
        citations.map((citation, index) => (
          <CitationItem key={index}>
            {citation}
          </CitationItem>
        ))
      ) : (
        <p>No citations found.</p>
      )}
    </CitationsContainer>
  );
};

export default Citations;