
// wokring code 6/4/25
// import React from "react";
// import styled from "styled-components";

// const Title = styled.h3`
//   color: white;
//   margin-bottom: 15px;
//   font-size: 1rem;
//   margin-top: 10px;
// `;

// const CitationsContainer = styled.div`
//   margin-top: 20px;
//   max-height: 300px;
//   overflow-y: auto;
//   border: 0.5px #5f5f5f solid;
//   border-radius: 8px;
//   padding: 10px;
//   background-color: rgb(37, 37, 37);
//   &::-webkit-scrollbar {
//     width: 8px;
//   }
//   &::-webkit-scrollbar-track {
//     background: rgb(50, 50, 50);
//     border-radius: 8px;
//   }
//   &::-webkit-scrollbar-thumb {
//     background: #D2FF72;
//     border-radius: 8px;
//   }
//   &::-webkit-scrollbar-thumb:hover {
//     background: #A2FF72;
//   }
//   scrollbar-width: thin;
//   scrollbar-color: #D2FF72 rgb(50, 50, 50);
// `;

// const CitationItem = styled.div`
//   background-color: #ffffff;
//   border: 1px solid #dee2e6;
//   border-radius: 4px;
//   padding: 10px;
//   margin-bottom: 10px;
//   font-size: 12px;
//   color: rgb(37, 37, 37);
// `;

// const Citations = ({ citations }) => {
//   console.log("Rendering Citations with:", citations);

//   return (
//     <CitationsContainer>
//       <Title>Extracted Citations</Title>
//       {citations.length > 0 ? (
//         citations.map((citation, index) => (
//           <CitationItem key={index}>{citation}</CitationItem>
//         ))
//       ) : (
//         <p>No citations found.</p>
//       )}
//     </CitationsContainer>
//   );
// };

// export default Citations;







































// attempt to convert citation styles
// import React, { useState } from "react";
// import styled from "styled-components";
// import Cite from "citation-js";

// // Styled components (unchanged)
// const Title = styled.h3`
//   color: white;
//   margin-bottom: 15px;
//   font-size: 1rem;
//   margin-top: 10px;
// `;

// const CitationsContainer = styled.div`
//   margin-top: 20px;
//   max-height: 300px;
//   overflow-y: auto;
//   border: 0.5px #5f5f5f solid;
//   border-radius: 8px;
//   padding: 10px;
//   background-color: rgb(37, 37, 37);
//   &::-webkit-scrollbar {
//     width: 8px;
//   }
//   &::-webkit-scrollbar-track {
//     background: rgb(50, 50, 50);
//     border-radius: 8px;
//   }
//   &::-webkit-scrollbar-thumb {
//     background: #d2ff72;
//     border-radius: 8px;
//   }
//   &::-webkit-scrollbar-thumb:hover {
//     background: #a2ff72;
//   }
//   scrollbar-width: thin;
//   scrollbar-color: #d2ff72 rgb(50, 50, 50);
// `;

// const CitationItem = styled.div`
//   background-color: #ffffff;
//   border: 1px solid #dee2e6;
//   border-radius: 4px;
//   padding: 10px;
//   margin-bottom: 10px;
//   font-size: 12px;
//   color: rgb(37, 37, 37);
// `;

// const StyleSelector = styled.div`
//   margin-bottom: 10px;
// `;

// const StyleButton = styled.button`
//   padding: 5px 10px;
//   margin-right: 5px;
//   background-color: ${(props) => (props.$active ? "#d2ff72" : "rgb(50, 50, 50)")};
//   color: ${(props) => (props.$active ? "black" : "white")};
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 12px;
//   &:hover {
//     background-color: ${(props) => (props.$active ? "#a2ff72" : "#5a6268")};
//   }
// `;

// // Preprocess raw citation text into a CSL-JSON-like object
// const preprocessCitation = (citation) => {
//   try {
//     // Example regex to extract common citation components
//     const match = citation.match(
//       /\[(\d+)\]\s*([^.,]+(?:,\s*[A-Z]\s*\.)*)\.\s*(.+?)\.\s*([^,]+),\s*(\d{4})/
//     );
//     if (match) {
//       const [, , authors, title, journal, year] = match;
//       const authorList = authors.split(/,\s*/).map((name) => {
//         const [family, given] = name.split(/\s+/).reverse();
//         return { family, given };
//       });
//       return {
//         type: "article-journal",
//         author: authorList,
//         title: title.trim(),
//         "container-title": journal.trim(),
//         issued: { "date-parts": [[parseInt(year)]] },
//       };
//     }
//     throw new Error("Unable to parse citation");
//   } catch (e) {
//     console.warn("Preprocessing failed for:", citation, e);
//     return null; // Return null if preprocessing fails
//   }
// };

// // Format citation using citation-js
// const formatCitation = (citation, style) => {
//   try {
//     const parsed = preprocessCitation(citation);
//     if (!parsed) return citation; // Fallback to original if preprocessing fails
//     const cite = new Cite(parsed);
//     return cite.format("bibliography", {
//       format: "text",
//       template: style.toLowerCase(), // e.g., "apa", "mla", "chicago-author-date", "ieee"
//     });
//   } catch (e) {
//     console.error("Citation formatting error:", e);
//     return citation; // Fallback to original if formatting fails
//   }
// };

// const Citations = ({ citations }) => {
//   const [selectedStyle, setSelectedStyle] = useState("Original");
//   const styles = ["Original", "APA", "MLA", "Chicago", "IEEE"];

//   console.log("Rendering Citations with:", citations);

//   // Format citations based on selected style
//   const formattedCitations = citations.map((citation) =>
//     selectedStyle === "Original" ? citation : formatCitation(citation, selectedStyle)
//   );

//   return (
//     <CitationsContainer>
//       <Title>Extracted Citations</Title>
//       <StyleSelector>
//         {styles.map((style) => (
//           <StyleButton
//             key={style}
//             $active={selectedStyle === style}
//             onClick={() => setSelectedStyle(style)}
//           >
//             {style}
//           </StyleButton>
//         ))}
//       </StyleSelector>
//       {citations.length > 0 ? (
//         formattedCitations.map((citation, index) => (
//           <CitationItem key={index}>{citation}</CitationItem>
//         ))
//       ) : (
//         <p>No citations found.</p>
//       )}
//     </CitationsContainer>
//   );
// };

// export default Citations;





















// working code of convsion for apa type - 11/4/25
// import React, { useState } from "react";
// import styled from "styled-components";
// import Cite from "citation-js";

// // Styled components
// const Title = styled.h3`
//   color: white;
//   margin-bottom: 15px;
//   font-size: 1rem;
//   margin-top: 10px;
//   position: sticky; /* Make title sticky */
//   top: 0; /* Stick to the top of the container */
//   background-color: rgb(37, 37, 37); /* Match container background */
//   z-index: 1; /* Ensure it stays above scrolling content */
//   padding: 8px 0; /* Add some padding for aesthetics */
// `;

// const CitationsContainer = styled.div`
//   margin-top: 20px;
//   max-height: 350px;
//   overflow-y: auto;
//   border: 0.5px #5f5f5f solid;
//   border-radius: 8px;
//   padding: 10px;
//   padding-top: 0;
//   background-color: rgb(37, 37, 37);
//   position: relative; /* Ensure sticky positioning works within this container */
//   &::-webkit-scrollbar {
//     width: 8px;
//   }
//   &::-webkit-scrollbar-track {
//     background: rgb(50, 50, 50);
//     border-radius: 8px;
//   }
//   &::-webkit-scrollbar-thumb {
//     background: #d2ff72;
//     border-radius: 8px;
//   }
//   &::-webkit-scrollbar-thumb:hover {
//     background: #a2ff72;
//   }
//   scrollbar-width: thin;
//   scrollbar-color: #d2ff72 rgb(50, 50, 50);
// `;

// const CitationItem = styled.div`
//   background-color: #ffffff;
//   border: 1px solid #dee2e6;
//   border-radius: 4px;
//   padding: 10px;
//   margin-bottom: 10px;
//   font-size: 12px;
//   color: rgb(37, 37, 37);
// `;

// const StyleSelector = styled.div`
//   margin-bottom: 10px;
//   position: sticky; /* Make style selector sticky */
//   top: 35px; /* Position below the title (adjust based on title height) */
//   background-color: rgb(37, 37, 37); /* Match container background */
//   z-index: 1; /* Ensure it stays above scrolling content */
//   padding: 5px 0; /* Add padding for spacing */
//   height: 40px;
// `;

// const StyleButton = styled.button`
//   padding: 5px 10px;
//   margin-right: 5px;
//   background-color: ${(props) => (props.$active ? "#d2ff72" : "rgb(50, 50, 50)")};
//   color: ${(props) => (props.$active ? "black" : "white")};
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 12px;
//   &:hover {
//     background-color: ${(props) => (props.$active ? "#a2ff72" : "#5a6268")};
//   }
// `;

// // Preprocess raw citation text into a CSL-JSON-like object
// const preprocessCitation = (citation) => {
//   try {
//     const match = citation.match(
//       /\[(\d+)\]\s*([^.,]+(?:,\s*[A-Z]\s*\.)*)\.\s*(.+?)\.\s*([^,]+),\s*(\d{4})/
//     );
//     if (match) {
//       const [, , authors, title, journal, year] = match;
//       const authorList = authors.split(/,\s*/).map((name) => {
//         const [family, given] = name.split(/\s+/).reverse();
//         return { family, given };
//       });
//       return {
//         type: "article-journal",
//         author: authorList,
//         title: title.trim(),
//         "container-title": journal.trim(),
//         issued: { "date-parts": [[parseInt(year)]] },
//       };
//     }
//     throw new Error("Unable to parse citation");
//   } catch (e) {
//     console.warn("Preprocessing failed for:", citation, e);
//     return null;
//   }
// };

// // Format citation using citation-js
// const formatCitation = (citation, style) => {
//   try {
//     const parsed = preprocessCitation(citation);
//     if (!parsed) return citation;
//     const cite = new Cite(parsed);
//     return cite.format("bibliography", {
//       format: "text",
//       template: style.toLowerCase(),
//     });
//   } catch (e) {
//     console.error("Citation formatting error:", e);
//     return citation;
//   }
// };

// const Citations = ({ citations }) => {
//   const [selectedStyle, setSelectedStyle] = useState("Original");
//   const styles = ["Original", "APA", "MLA", "Chicago", "IEEE"];

//   console.log("Rendering Citations with:", citations);

//   const formattedCitations = citations.map((citation) =>
//     selectedStyle === "Original" ? citation : formatCitation(citation, selectedStyle)
//   );

//   return (
//     <CitationsContainer>
//       <Title>Extracted Citations</Title>
//       <StyleSelector>
//         {styles.map((style) => (
//           <StyleButton
//             key={style}
//             $active={selectedStyle === style}
//             onClick={() => setSelectedStyle(style)}
//           >
//             {style}
//           </StyleButton>
//         ))}
//       </StyleSelector>
//       {citations.length > 0 ? (
//         formattedCitations.map((citation, index) => (
//           <CitationItem key={index}>{citation}</CitationItem>
//         ))
//       ) : (
//         <p>No citations found.</p>
//       )}
//     </CitationsContainer>
//   );
// };

// export default Citations;




































































// edge cases - apa wokring
// import React, { useState } from "react";
// import styled from "styled-components";
// import Cite from "citation-js";

// // Styled components (unchanged for brevity)
// const Title = styled.h3`
//   color: white;
//   margin-bottom: 15px;
//   font-size: 1rem;
//   margin-top: 10px;
//   position: sticky;
//   top: 0;
//   background-color: rgb(37, 37, 37);
//   z-index: 1;
//   padding: 8px 0;
// `;

// const CitationsContainer = styled.div`
//   margin-top: 20px;
//   max-height: 350px;
//   overflow-y: auto;
//   border: 0.5px #5f5f5f solid;
//   border-radius: 8px;
//   padding: 10px;
//   padding-top: 0;
//   background-color: rgb(37, 37, 37);
//   position: relative;
//   &::-webkit-scrollbar {
//     width: 8px;
//   }
//   &::-webkit-scrollbar-track {
//     background: rgb(50, 50, 50);
//     border-radius: 8px;
//   }
//   &::-webkit-scrollbar-thumb {
//     background: #d2ff72;
//     border-radius: 8px;
//   }
//   &::-webkit-scrollbar-thumb:hover {
//     background: #a2ff72;
//   }
//   scrollbar-width: thin;
//   scrollbar-color: #d2ff72 rgb(50, 50, 50);
// `;

// const CitationItem = styled.div`
//   background-color: #ffffff;
//   border: 1px solid #dee2e6;
//   border-radius: 4px;
//   padding: 10px;
//   margin-bottom: 10px;
//   font-size: 12px;
//   color: rgb(37, 37, 37);
// `;

// const StyleSelector = styled.div`
//   margin-bottom: 10px;
//   position: sticky;
//   top: 35px;
//   background-color: rgb(37, 37, 37);
//   z-index: 1;
//   padding: 5px 0;
//   height: 40px;
// `;

// const StyleButton = styled.button`
//   padding: 5px 10px;
//   margin-right: 5px;
//   background-color: ${(props) => (props.$active ? "#d2ff72" : "rgb(50, 50, 50)")};
//   color: ${(props) => (props.$active ? "black" : "white")};
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 12px;
//   &:hover {
//     background-color: ${(props) => (props.$active ? "#a2ff72" : "#5a6268")};
//   }
// `;

// // Preprocess raw citation text into CSL-JSON
// const preprocessCitation = (citation) => {
//   try {
//     // More flexible regex to handle various citation formats
//     const match = citation.match(
//       /\[(\d+)\]\s*(.+?)(?:\.\s*|\s+)(.+?)(?:\.\s*|\s+)([^,]+?)(?:,\s*|\s+)(\d{4})/
//     );
//     if (match) {
//       const [, , authorsRaw, title, journal, year] = match;
//       // Handle authors (e.g., "Doe J, Smith A" or "John Doe, Alice Smith")
//       const authorList = authorsRaw.split(/,\s*|\sand\s/).map((name) => {
//         const trimmedName = name.trim();
//         const parts = trimmedName.split(/\s+/);
//         if (parts.length === 1) {
//           return { family: parts[0] }; // Single name (e.g., "Doe")
//         }
//         const family = parts.pop(); // Last part as family name
//         const given = parts.join(" "); // Rest as given name
//         return { family, given: given || undefined };
//       });
//       return {
//         type: "article-journal",
//         author: authorList,
//         title: title.trim(),
//         "container-title": journal.trim(),
//         issued: { "date-parts": [[parseInt(year)]] },
//       };
//     }
//     console.warn("No regex match for:", citation);
//     return null; // Fallback to original if parsing fails
//   } catch (e) {
//     console.warn("Preprocessing failed for:", citation, e);
//     return null;
//   }
// };

// // Format citation using citation-js
// const formatCitation = (citation, style) => {
//   try {
//     const parsed = preprocessCitation(citation);
//     if (!parsed) {
//       return `${citation} (Format unavailable)`; // Indicate failure
//     }
//     const cite = new Cite(parsed);
//     // Use lowercase style names for citation-js compatibility
//     const formatted = cite.format("bibliography", {
//       format: "text",
//       template: style.toLowerCase(),
//     });
//     return formatted.trim();
//   } catch (e) {
//     console.error("Citation formatting error for:", citation, e);
//     return `${citation} (Error formatting)`; // Show error to user
//   }
// };

// const Citations = ({ citations }) => {
//   const [selectedStyle, setSelectedStyle] = useState("Original");
//   const styles = ["Original", "APA", "MLA", "Chicago", "IEEE"];

//   console.log("Raw citations from database:", citations);

//   const formattedCitations = citations.map((citation) =>
//     selectedStyle === "Original"
//       ? citation
//       : formatCitation(citation, selectedStyle)
//   );

//   return (
//     <CitationsContainer>
//       <Title>Extracted Citations</Title>
//       <StyleSelector>
//         {styles.map((style) => (
//           <StyleButton
//             key={style}
//             $active={selectedStyle === style}
//             onClick={() => setSelectedStyle(style)}
//           >
//             {style}
//           </StyleButton>
//         ))}
//       </StyleSelector>
//       {citations.length > 0 ? (
//         formattedCitations.map((citation, index) => (
//           <CitationItem key={index}>{citation}</CitationItem>
//         ))
//       ) : (
//         <CitationItem>No citations found.</CitationItem>
//       )}
//     </CitationsContainer>
//   );
// };

// export default Citations;

// export { preprocessCitation, formatCitation }; // Export for testing













































// trying chicago and ieee
import React, { useState } from "react";
import styled from "styled-components";
import Cite from "citation-js";
import "@citation-js/plugin-csl"; // Ensure CSL styles are available

// Styled components (unchanged for brevity)
const Title = styled.h3`
  color: white;
  margin-bottom: 15px;
  font-size: 1rem;
  margin-top: 10px;
  position: sticky;
  top: 0;
  background-color: rgb(37, 37, 37);
  z-index: 1;
  padding: 8px 0;
`;

const CitationsContainer = styled.div`
  margin-top: 20px;
  max-height: 350px;
  overflow-y: auto;
  border: 0.5px #5f5f5f solid;
  border-radius: 8px;
  padding: 15px;
  padding-top: 0;
  background-color: rgb(37, 37, 37);
  position: relative;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgb(50, 50, 50);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d2ff72;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #a2ff72;
  }
  scrollbar-width: thin;
  scrollbar-color: #d2ff72 rgb(50, 50, 50);
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

const StyleSelector = styled.div`
  margin-bottom: 10px;
  position: sticky;
  top: 35px;
  background-color: rgb(37, 37, 37);
  z-index: 1;
  padding: 5px 0;
  height: 40px;
`;

const StyleButton = styled.button`
  padding: 5px 10px;
  margin-right: 5px;
  background-color: ${(props) => (props.$active ? "#d2ff72" : "rgb(50, 50, 50)")};
  color: ${(props) => (props.$active ? "black" : "white")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background-color: ${(props) => (props.$active ? "#a2ff72" : "#5a6268")};
  }
`;

// Preprocess raw citation text into CSL-JSON
const preprocessCitation = (citation) => {
  try {
    const match = citation.match(
      /\[(\d+)\]\s*(.+?)(?:\.\s*|\s+)(.+?)(?:\.\s*|\s+)([^,]+?)(?:,\s*|\s+)(\d{4})/
    );
    if (match) {
      const [, , authorsRaw, title, journal, year] = match;
      const authorList = authorsRaw.split(/,\s*|\sand\s/).map((name) => {
        const trimmedName = name.trim();
        const parts = trimmedName.split(/\s+/);
        if (parts.length === 1) {
          return { family: parts[0] };
        }
        const family = parts.pop();
        const given = parts.join(" ");
        return { family, given: given || undefined };
      });
      return {
        type: "article-journal",
        author: authorList,
        title: title.trim(),
        "container-title": journal.trim(),
        issued: { "date-parts": [[parseInt(year)]] },
      };
    }
    console.warn("No regex match for:", citation);
    return null;
  } catch (e) {
    console.warn("Preprocessing failed for:", citation, e);
    return null;
  }
};

// Format citation using citation-js
const formatCitation = (citation, style) => {
  try {
    const parsed = preprocessCitation(citation);
    if (!parsed) {
      return `${citation} (Format unavailable)`;
    }
    const cite = new Cite(parsed);
    const styleMap = {
      "apa": "apa",
      "mla": "mla",
      "chicago (author-date)": "chicago-author-date", // Explicit Chicago variant
      "ieee": "ieee",
    };
    const template = styleMap[style.toLowerCase()] || style.toLowerCase();
    const formatted = cite.format("bibliography", {
      format: "text",
      template: template,
    });
    return formatted.trim();
  } catch (e) {
    console.error("Citation formatting error for:", citation, e);
    return `${citation} (Error formatting)`;
  }
};

const Citations = ({ citations }) => {
  const [selectedStyle, setSelectedStyle] = useState("Original");
  const styles = ["Original", "APA", "MLA", "Chicago (Author-Date)", "IEEE"];

  console.log("Raw citations from database:", citations);

  const formattedCitations = citations.map((citation) =>
    selectedStyle === "Original"
      ? citation
      : formatCitation(citation, selectedStyle)
  );

  return (
    <CitationsContainer>
      <Title>Extracted Citations</Title>
      <StyleSelector>
        {styles.map((style) => (
          <StyleButton
            key={style}
            $active={selectedStyle === style}
            onClick={() => setSelectedStyle(style)}
          >
            {style}
          </StyleButton>
        ))}
      </StyleSelector>
      {citations.length > 0 ? (
        formattedCitations.map((citation, index) => (
          <CitationItem key={index}>{citation}</CitationItem>
        ))
      ) : (
        <CitationItem>No citations found.</CitationItem>
      )}
    </CitationsContainer>
  );
};

export default Citations;

export { preprocessCitation, formatCitation };