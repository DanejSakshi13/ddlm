// import React from "react";
// import styled from "styled-components";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";

// const DownloadButtonContainer = styled.div`
//   margin: 20px 0;
//   text-align: center;
// `;

// const StyledButton = styled.button`
//   padding: 12px 30px;
//   background-color: #d2ff72;
//   color: rgb(37, 37, 37);
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   font-size: 16px;
//   font-family: "Montserrat", serif;
//   font-weight: 500;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.2s ease;
  
//   &:hover {
//     background-color: #c1ef61;
//     transform: translateY(-2px);
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   }
  
//   &:active {
//     transform: translateY(0);
//   }
  
//   svg {
//     margin-right: 8px;
//   }
// `;

// const DownloadBtn = ({ title, summary, keywords, citations, recommendations, images }) => {
//   const handleDownload = async () => {
//     try {
//       // Create new PDF document
//       const pdf = new jsPDF("p", "mm", "a4");
//       const pageWidth = pdf.internal.pageSize.getWidth();
      
//       // Add title
//       pdf.setFontSize(20);
//       pdf.setFont("helvetica", "bold");
//       const titleLines = pdf.splitTextToSize(title || "Untitled Paper", pageWidth - 20);
//       pdf.text(titleLines, 10, 20);
      
//       let currentY = 20 + titleLines.length * 10;

//       // Add summary
//       if (summary) {
//         currentY += 10;
//         pdf.setFontSize(16);
//         pdf.setFont("helvetica", "bold");
//         pdf.text("Summary", 10, currentY);
//         currentY += 8;
        
//         pdf.setFontSize(12);
//         pdf.setFont("helvetica", "normal");
//         const summaryLines = pdf.splitTextToSize(summary, pageWidth - 20);
//         pdf.text(summaryLines, 10, currentY);
//         currentY += summaryLines.length * 6 + 10;
//       }

//       // Add keywords
//       if (keywords && keywords.length > 0) {
//         // Check if we need a new page
//         if (currentY > 270) {
//           pdf.addPage();
//           currentY = 20;
//         }
        
//         pdf.setFontSize(16);
//         pdf.setFont("helvetica", "bold");
//         pdf.text("Keywords", 10, currentY);
//         currentY += 8;
        
//         pdf.setFontSize(12);
//         pdf.setFont("helvetica", "normal");
//         const keywordsText = keywords.join(", ");
//         const keywordsLines = pdf.splitTextToSize(keywordsText, pageWidth - 20);
//         pdf.text(keywordsLines, 10, currentY);
//         currentY += keywordsLines.length * 6 + 10;
//       }

//       // Add recommendations
//       if (recommendations && recommendations.length > 0) {
//         // Check if we need a new page
//         if (currentY > 240) {
//           pdf.addPage();
//           currentY = 20;
//         }
        
//         pdf.setFontSize(16);
//         pdf.setFont("helvetica", "bold");
//         pdf.text("Recommendations", 10, currentY);
//         currentY += 8;
        
//         pdf.setFontSize(12);
//         pdf.setFont("helvetica", "normal");
        
//         for (let i = 0; i < recommendations.length; i++) {
//           const rec = recommendations[i];
//           const recText = `${i + 1}. ${rec.title || rec}`;
//           const recLines = pdf.splitTextToSize(recText, pageWidth - 25);
          
//           // Check if we need a new page
//           if (currentY + recLines.length * 6 > 280) {
//             pdf.addPage();
//             currentY = 20;
//           }
          
//           pdf.text(recLines, 15, currentY);
//           currentY += recLines.length * 6 + 5;
//         }
        
//         currentY += 5;
//       }

//       // Add citations
//       if (citations && citations.length > 0) {
//         // Check if we need a new page
//         if (currentY > 240) {
//           pdf.addPage();
//           currentY = 20;
//         }
        
//         pdf.setFontSize(16);
//         pdf.setFont("helvetica", "bold");
//         pdf.text("Citations", 10, currentY);
//         currentY += 8;
        
//         pdf.setFontSize(12);
//         pdf.setFont("helvetica", "normal");
        
//         for (let i = 0; i < citations.length; i++) {
//           const citation = citations[i];
//           const citationText = `${i + 1}. ${citation}`;
//           const citationLines = pdf.splitTextToSize(citationText, pageWidth - 25);
          
//           // Check if we need a new page
//           if (currentY + citationLines.length * 6 > 280) {
//             pdf.addPage();
//             currentY = 20;
//           }
          
//           pdf.text(citationLines, 15, currentY);
//           currentY += citationLines.length * 6 + 5;
//         }
        
//         currentY += 5;
//       }

//       // Add images
//       if (images && images.length > 0) {
//         pdf.addPage();
//         currentY = 20;
        
//         pdf.setFontSize(16);
//         pdf.setFont("helvetica", "bold");
//         pdf.text("Figures & Tables", 10, currentY);
//         currentY += 15;
        
//         for (let i = 0; i < images.length; i++) {
//           const img = images[i];
          
//           if (img.image) {
//             // Check if we need a new page
//             if (currentY > 200) {
//               pdf.addPage();
//               currentY = 20;
//             }
            
//             // Add figure caption
//             pdf.setFontSize(10);
//             pdf.setFont("helvetica", "italic");
//             pdf.text(`Figure ${i + 1}: ${img.name || ""}`, 10, currentY);
//             currentY += 5;
            
//             try {
//               // Add the image - convert base64 string to image
//               const imgWidth = pageWidth - 20;
//               const imgHeight = 80; // Fixed height for images
              
//               pdf.addImage(img.image, 'JPEG', 10, currentY, imgWidth, imgHeight);
//               currentY += imgHeight + 15;
//             } catch (imgError) {
//               console.error("Error adding image to PDF:", imgError);
//               // Continue with next image if one fails
//             }
//           }
//         }
//       }

//       // Save PDF
//       const filename = `${title || 'Paper'}_Analysis.pdf`;
//       pdf.save(filename);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       alert("Failed to generate PDF. Please try again.");
//     }
//   };

//   return (
//     <DownloadButtonContainer>
//       <StyledButton onClick={handleDownload}>
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//         Download Analysis PDF
//       </StyledButton>
//     </DownloadButtonContainer>
//   );
// };

// export default DownloadBtn;















// import React from "react";
// import styled from "styled-components";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";

// const DownloadButtonContainer = styled.div`
//   margin: 20px 0;
//   text-align: center;
// `;

// const StyledButton = styled.button`
//   padding: 12px 30px;
//   background-color: #d2ff72;
//   color: rgb(37, 37, 37);
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   font-size: 16px;
//   font-family: "Montserrat", serif;
//   font-weight: 500;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.2s ease;
  
//   &:hover {
//     background-color: #c1ef61;
//     transform: translateY(-2px);
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   }
  
//   &:active {
//     transform: translateY(0);
//   }
  
//   svg {
//     margin-right: 8px;
//   }
// `;

// const DownloadBtn = ({ title, summary, keywords, citations, recommendations, images, authors }) => {
//   const handleDownload = async () => {
//     try {
//       // Create new PDF document
//       const pdf = new jsPDF("p", "mm", "a4");
//       const pageWidth = pdf.internal.pageSize.getWidth();
      
//       // Add title
//       pdf.setFontSize(20);
//       pdf.setFont("helvetica", "bold");
//       const titleLines = pdf.splitTextToSize(title || "Untitled Paper", pageWidth - 20);
//       pdf.text(titleLines, 10, 20);
      
//       let currentY = 20 + titleLines.length * 10;

//       // Add authors
//       if (authors && authors.length > 0) {
//         // Check if we need a new page
//         if (currentY > 270) {
//           pdf.addPage();
//           currentY = 20;
//         }
        
//         currentY += 10;
//         pdf.setFontSize(16);
//         pdf.setFont("helvetica", "bold");
//         pdf.text("Authors", 10, currentY);
//         currentY += 8;
        
//         pdf.setFontSize(12);
//         pdf.setFont("helvetica", "normal");
//         const authorsText = authors.join(", ");
//         const authorsLines = pdf.splitTextToSize(authorsText, pageWidth - 20);
//         pdf.text(authorsLines, 10, currentY);
//         currentY += authorsLines.length * 6 + 10;
//       }

//       // Add summary
//       if (summary) {
//         // Check if we need a new page
//         if (currentY > 270) {
//           pdf.addPage();
//           currentY = 20;
//         }
        
//         currentY += 10;
//         pdf.setFontSize(16);
//         pdf.setFont("helvetica", "bold");
//         pdf.text("Summary", 10, currentY);
//         currentY += 8;
        
//         pdf.setFontSize(12);
//         pdf.setFont("helvetica", "normal");
//         const summaryLines = pdf.splitTextToSize(summary, pageWidth - 20);
//         pdf.text(summaryLines, 10, currentY);
//         currentY += summaryLines.length * 6 + 10;
//       }

//       // Add keywords
//       if (keywords && keywords.length > 0) {
//         // Check if we need a new page
//         if (currentY > 270) {
//           pdf.addPage();
//           currentY = 20;
//         }
        
//         pdf.setFontSize(16);
//         pdf.setFont("helvetica", "bold");
//         pdf.text("Keywords", 10, currentY);
//         currentY += 8;
        
//         pdf.setFontSize(12);
//         pdf.setFont("helvetica", "normal");
//         const keywordsText = keywords.join(", ");
//         const keywordsLines = pdf.splitTextToSize(keywordsText, pageWidth - 20);
//         pdf.text(keywordsLines, 10, currentY);
//         currentY += keywordsLines.length * 6 + 10;
//       }

//       // Add recommendations
//       if (recommendations && recommendations.length > 0) {
//         // Check if we need a new page
//         if (currentY > 240) {
//           pdf.addPage();
//           currentY = 20;
//         }
        
//         pdf.setFontSize(16);
//         pdf.setFont("helvetica", "bold");
//         pdf.text("Recommendations", 10, currentY);
//         currentY += 8;
        
//         pdf.setFontSize(12);
//         pdf.setFont("helvetica", "normal");
        
//         for (let i = 0; i < recommendations.length; i++) {
//           const rec = recommendations[i];
//           const recText = `${i + 1}. ${rec.title || rec}`;
//           const recLines = pdf.splitTextToSize(recText, pageWidth - 25);
          
//           // Check if we need a new page
//           if (currentY + recLines.length * 6 > 280) {
//             pdf.addPage();
//             currentY = 20;
//           }
          
//           pdf.text(recLines, 15, currentY);
//           currentY += recLines.length * 6 + 5;
//         }
        
//         currentY += 5;
//       }

//       // Add citations
//       if (citations && citations.length > 0) {
//         // Check if we need a new page
//         if (currentY > 240) {
//           pdf.addPage();
//           currentY = 20;
//         }
        
//         pdf.setFontSize(16);
//         pdf.setFont("helvetica", "bold");
//         pdf.text("Citations", 10, currentY);
//         currentY += 8;
        
//         pdf.setFontSize(12);
//         pdf.setFont("helvetica", "normal");
        
//         for (let i = 0; i < citations.length; i++) {
//           const citation = citations[i];
//           const citationText = `${i + 1}. ${citation}`;
//           const citationLines = pdf.splitTextToSize(citationText, pageWidth - 25);
          
//           // Check if we need a new page
//           if (currentY + citationLines.length * 6 > 280) {
//             pdf.addPage();
//             currentY = 20;
//           }
          
//           pdf.text(citationLines, 15, currentY);
//           currentY += citationLines.length * 6 + 5;
//         }
        
//         currentY += 5;
//       }

//       // Add images
//       if (images && images.length > 0) {
//         // Check if we need a new page
//         if (currentY > 240) {
//           pdf.addPage();
//           currentY = 20;
//         } else {
//           pdf.addPage();
//           currentY = 20;
//         }
        
//         pdf.setFontSize(16);
//         pdf.setFont("helvetica", "bold");
//         pdf.text("Figures & Tables", 10, currentY);
//         currentY += 15;
        
//         for (let i = 0; i < images.length; i++) {
//           const img = images[i];
          
//           if (img.image) {
//             // Check if we need a new page
//             if (currentY > 200) {
//               pdf.addPage();
//               currentY = 20;
//             }
            
//             // Add figure caption
//             pdf.setFontSize(10);
//             pdf.setFont("helvetica", "italic");
//             pdf.text(`Figure ${i + 1}: ${img.name || ""}`, 10, currentY);
//             currentY += 5;
            
//             try {
//               // Add the image - convert base64 string to image
//               const imgWidth = pageWidth - 20;
//               const imgHeight = 80; // Fixed height for images
              
//               pdf.addImage(img.image, 'JPEG', 10, currentY, imgWidth, imgHeight);
//               currentY += imgHeight + 15;
//             } catch (imgError) {
//               console.error("Error adding image to PDF:", imgError);
//               // Continue with next image if one fails
//             }
//           }
//         }
//       }

//       // Save PDF
//       const filename = `${title || 'Paper'}_Analysis.pdf`;
//       pdf.save(filename);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       alert("Failed to generate PDF. Please try again.");
//     }
//   };

//   return (
//     <DownloadButtonContainer>
//       <StyledButton onClick={handleDownload}>
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//         Download Analysis PDF
//       </StyledButton>
//     </DownloadButtonContainer>
//   );
// };

// export default DownloadBtn;


























// better formatting of pdf
import React from "react";
import styled from "styled-components";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const DownloadButtonContainer = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const StyledButton = styled.button`
  padding: 12px 30px;
  background-color: #d2ff72;
  color: rgb(37, 37, 37);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-family: "Montserrat", serif;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #c1ef61;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    margin-right: 8px;
  }
`;

const DownloadPDFBtn = ({ title, summary, keywords, citations, recommendations, images, authors }) => {
  const handleDownload = async () => {
    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      let currentY = 20;

      // Title
      pdf.setFontSize(22);
      pdf.setFont("helvetica", "bold");
      const titleLines = pdf.splitTextToSize(title || "Untitled Paper", pageWidth - 20);
      pdf.text(titleLines, 10, currentY);
      currentY += titleLines.length * 10 + 15; // Extra spacing after title

      // Authors as a list
      if (authors && authors.length > 0) {
        if (currentY > 270) {
          pdf.addPage();
          currentY = 20;
        }

        pdf.setFontSize(18); // Bigger heading
        pdf.setFont("helvetica", "bold");
        pdf.text("Authors", 10, currentY);
        currentY += 10;

        pdf.setFontSize(12);
        pdf.setFont("helvetica", "normal");
        authors.forEach((author, index) => {
          const authorText = `${index + 1}. ${author}`;
          const authorLines = pdf.splitTextToSize(authorText, pageWidth - 25);
          if (currentY + authorLines.length * 6 > 280) {
            pdf.addPage();
            currentY = 20;
          }
          pdf.text(authorLines, 15, currentY); // Indented
          currentY += authorLines.length * 6 + 2; // Tighter spacing between authors
        });
        currentY += 10; // Space after section
      }

      // Summary
      if (summary) {
        if (currentY > 270) {
          pdf.addPage();
          currentY = 20;
        }

        pdf.setFontSize(18); // Bigger heading
        pdf.setFont("helvetica", "bold");
        pdf.text("Summary", 10, currentY);
        currentY += 10;

        pdf.setFontSize(12);
        pdf.setFont("helvetica", "normal");
        const summaryLines = pdf.splitTextToSize(summary, pageWidth - 20);
        pdf.text(summaryLines, 10, currentY);
        currentY += summaryLines.length * 6 + 10;
      }

      // Keywords
      if (keywords && keywords.length > 0) {
        if (currentY > 270) {
          pdf.addPage();
          currentY = 20;
        }

        pdf.setFontSize(18); // Bigger heading
        pdf.setFont("helvetica", "bold");
        pdf.text("Keywords", 10, currentY);
        currentY += 10;

        pdf.setFontSize(12);
        pdf.setFont("helvetica", "normal");
        const keywordsText = keywords.join(", ");
        const keywordsLines = pdf.splitTextToSize(keywordsText, pageWidth - 20);
        pdf.text(keywordsLines, 10, currentY);
        currentY += keywordsLines.length * 6 + 10;
      }

      // Recommendations
      if (recommendations && recommendations.length > 0) {
        if (currentY > 260) {
          pdf.addPage();
          currentY = 20;
        }

        pdf.setFontSize(18); // Bigger heading
        pdf.setFont("helvetica", "bold");
        pdf.text("Recommendations", 10, currentY);
        currentY += 10;

        pdf.setFontSize(12);
        pdf.setFont("helvetica", "normal");
        recommendations.forEach((rec, index) => {
          const recText = `${index + 1}. ${rec.title || rec}`;
          const recLines = pdf.splitTextToSize(recText, pageWidth - 25);
          if (currentY + recLines.length * 6 > 280) {
            pdf.addPage();
            currentY = 20;
          }
          pdf.text(recLines, 15, currentY); // Indented
          currentY += recLines.length * 6 + 5;
        });
        currentY += 10;
      }

      // Citations
      if (citations && citations.length > 0) {
        if (currentY > 260) {
          pdf.addPage();
          currentY = 20;
        }

        pdf.setFontSize(18); // Bigger heading
        pdf.setFont("helvetica", "bold");
        pdf.text("Citations", 10, currentY);
        currentY += 10;

        pdf.setFontSize(12);
        pdf.setFont("helvetica", "normal");
        citations.forEach((citation, index) => {
          const citationText = `${index + 1}. ${citation}`;
          const citationLines = pdf.splitTextToSize(citationText, pageWidth - 25);
          if (currentY + citationLines.length * 6 > 280) {
            pdf.addPage();
            currentY = 20;
          }
          pdf.text(citationLines, 15, currentY); // Indented
          currentY += citationLines.length * 6 + 5;
        });
        currentY += 10;
      }

      // Images
      if (images && images.length > 0) {
        if (currentY > 240) {
          pdf.addPage();
          currentY = 20;
        } else {
          pdf.addPage();
          currentY = 20;
        }

        pdf.setFontSize(18); // Bigger heading
        pdf.setFont("helvetica", "bold");
        pdf.text("Figures & Tables", 10, currentY);
        currentY += 15;

        for (let i = 0; i < images.length; i++) {
          const img = images[i];
          if (img.image) {
            if (currentY > 200) {
              pdf.addPage();
              currentY = 20;
            }

            pdf.setFontSize(10);
            pdf.setFont("helvetica", "italic");
            pdf.text(`Figure ${i + 1}: ${img.name || ""}`, 10, currentY);
            currentY += 5;

            try {
              const imgWidth = pageWidth - 20;
              const imgHeight = 80;
              pdf.addImage(img.image, "JPEG", 10, currentY, imgWidth, imgHeight);
              currentY += imgHeight + 15;
            } catch (imgError) {
              console.error("Error adding image to PDF:", imgError);
            }
          }
        }
      }

      // Save PDF
      const filename = `${title || "Paper"}_Analysis.pdf`;
      pdf.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <DownloadButtonContainer>
      <StyledButton onClick={handleDownload}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Download Analysis PDF
      </StyledButton>
    </DownloadButtonContainer>
  );
};

export default DownloadPDFBtn;