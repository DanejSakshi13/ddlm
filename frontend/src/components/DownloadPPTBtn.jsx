// import React from "react";
// import styled from "styled-components";
// import PptxGenJS from "pptxgenjs";

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
//   font-size: 12px;
//   font-family: "Montserrat", serif;
//   font-weight: 500;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.2s ease;

//   &:hover {
//     background-color: #61c1ef;
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

// const DownloadPPTBtn = ({ title, summary, keywords, citations, recommendations, images, authors }) => {
//   const handleDownloadPPT = async () => {
//     try {
//       const pptx = new PptxGenJS();
//       pptx.layout = "LAYOUT_WIDE"; // 13.33x7.5 inches

//       // Slide 1: Title Slide
//       let slide = pptx.addSlide();
//       slide.addText("Title", {
//         x: 0.5,
//         y: 0.5,
//         fontSize: 36,
//         bold: true,
//         color: "363636",
//         align: "center",
//       });
//       slide.addText(title || "Untitled Paper", {
//         x: 0.5,
//         y: 2.0,
//         w: 12.33,
//         fontSize: 24,
//         color: "363636",
//         align: "center",
//         valign: "middle",
//       });

//       // Slide 2: Authors
//       if (authors && authors.length > 0) {
//         slide = pptx.addSlide();
//         slide.addText("Authors", {
//           x: 0.5,
//           y: 0.5,
//           fontSize: 36,
//           bold: true,
//           color: "363636",
//           align: "center",
//         });
//         const authorsText = authors.map((author, index) => `${index + 1}. ${author}`).join("\n");
//         slide.addText(authorsText, {
//           x: 0.5,
//           y: 2.0,
//           w: 12.33,
//           fontSize: 18,
//           color: "363636",
//           align: "left",
//           valign: "middle",
//         });
//       }

//       // Slide 3: Summary
//       if (summary) {
//         slide = pptx.addSlide();
//         slide.addText("Summary", {
//           x: 0.5,
//           y: 0.5,
//           fontSize: 36,
//           bold: true,
//           color: "363636",
//           align: "center",
//         });
//         slide.addText(summary, {
//           x: 0.5,
//           y: 2.0,
//           w: 12.33,
//           fontSize: 18,
//           color: "363636",
//           align: "left",
//           valign: "middle",
//         });
//       }

//       // Slide 4: Keywords
//       if (keywords && keywords.length > 0) {
//         slide = pptx.addSlide();
//         slide.addText("Keywords", {
//           x: 0.5,
//           y: 0.5,
//           fontSize: 36,
//           bold: true,
//           color: "363636",
//           align: "center",
//         });
//         const keywordsText = keywords.join(", ");
//         slide.addText(keywordsText, {
//           x: 0.5,
//           y: 2.0,
//           w: 12.33,
//           fontSize: 18,
//           color: "363636",
//           align: "left",
//           valign: "middle",
//         });
//       }

//       // Slide 5: Recommendations
//       if (recommendations && recommendations.length > 0) {
//         slide = pptx.addSlide();
//         slide.addText("Recommendations", {
//           x: 0.5,
//           y: 0.5,
//           fontSize: 36,
//           bold: true,
//           color: "363636",
//           align: "center",
//         });
//         const recText = recommendations.map((rec, index) => `${index + 1}. ${rec.title || rec}`).join("\n");
//         slide.addText(recText, {
//           x: 0.5,
//           y: 2.0,
//           w: 12.33,
//           fontSize: 18,
//           color: "363636",
//           align: "left",
//           valign: "middle",
//         });
//       }

//       // Slide 6: Citations
//       if (citations && citations.length > 0) {
//         slide = pptx.addSlide();
//         slide.addText("Citations", {
//           x: 0.5,
//           y: 0.5,
//           fontSize: 36,
//           bold: true,
//           color: "363636",
//           align: "center",
//         });
//         const citationsText = citations.map((citation, index) => `${index + 1}. ${citation}`).join("\n");
//         slide.addText(citationsText, {
//           x: 0.5,
//           y: 2.0,
//           w: 12.33,
//           fontSize: 18,
//           color: "363636",
//           align: "left",
//           valign: "middle",
//         });
//       }

//       // Slide 7: Figures & Tables
//       if (images && images.length > 0) {
//         images.forEach((img, index) => {
//           if (img.image) {
//             slide = pptx.addSlide();
//             slide.addText("Figures & Tables", {
//               x: 0.5,
//               y: 0.5,
//               fontSize: 36,
//               bold: true,
//               color: "363636",
//               align: "center",
//             });
//             slide.addText(`Figure ${index + 1}: ${img.name || ""}`, {
//               x: 0.5,
//               y: 1.5,
//               fontSize: 18,
//               italic: true,
//               color: "363636",
//               align: "left",
//             });
//             try {
//               slide.addImage({
//                 data: img.image,
//                 x: 0.5,
//                 y: 2.5,
//                 w: 12.33,
//                 h: 4.0,
//               });
//             } catch (imgError) {
//               console.error("Error adding image to PPT:", imgError);
//               slide.addText("Image could not be loaded", {
//                 x: 0.5,
//                 y: 2.5,
//                 fontSize: 18,
//                 color: "FF0000",
//                 align: "left",
//               });
//             }
//           }
//         });
//       }

//       // Save PPTX
//       const filename = `${title || "Paper"}_Analysis.pptx`;
//       await pptx.writeFile({ fileName: filename });
//     } catch (error) {
//       console.error("Error generating PPT:", error);
//       alert("Failed to generate PPT. Please try again.");
//     }
//   };

//   return (
//     <DownloadButtonContainer>
//       <StyledButton onClick={handleDownloadPPT}>
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//         Download Analysis PPT
//       </StyledButton>
//     </DownloadButtonContainer>
//   );
// };

// export default DownloadPPTBtn;
























// making ppt more aesthetic
// import React from "react";
// import styled from "styled-components";
// import PptxGenJS from "pptxgenjs";

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
//   font-size: 12px;
//   font-family: "Montserrat", serif;
//   font-weight: 500;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.2s ease;

//   &:hover {
//     background-color: #61c1ef;
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

// const DownloadPPTBtn = ({ title, summary, keywords, citations, recommendations, images, authors }) => {
//   const handleDownloadPPT = async () => {
//     try {
//       const pptx = new PptxGenJS();
//       pptx.layout = "LAYOUT_WIDE";
//       pptx.defineSlideMaster({
//         title: "MASTER_SLIDE",
//         background: { color: "F5F5F5" },
//         objects: [
//           {
//             rect: {
//               x: 0,
//               y: 0,
//               w: "100%",
//               h: 0.5,
//               fill: { color: "2E7D32" },
//             },
//           },
//         ],
//       });

//       // Slide 1: Title Slide
//       let slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
//       slide.addText(title || "Untitled Paper", {
//         x: 0.5,
//         y: 1.0,
//         w: 12.33,
//         h: 2.0,
//         fontSize: 40,
//         fontFace: "Montserrat",
//         bold: true,
//         color: "2E7D32",
//         align: "center",
//         valign: "middle",
//         shadow: { type: "outer", color: "CCCCCC", offset: 2, angle: 45 },
//       });

//       // Slide 2: Authors
//       if (authors && authors.length > 0) {
//         slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
//         slide.addText("Authors", {
//           x: 0.5,
//           y: 0.7,
//           w: 12.33,
//           fontSize: 36,
//           fontFace: "Montserrat",
//           bold: true,
//           color: "2E7D32",
//           align: "center",
//         });
//         const authorsText = authors.map((author, index) => `${index + 1}. ${author}`).join("\n");
//         slide.addText(authorsText, {
//           x: 0.5,
//           y: 2.0,
//           w: 12.33,
//           fontSize: 18,
//           fontFace: "Montserrat",
//           color: "424242",
//           align: "left",
//           valign: "middle",
//           lineSpacing: 24,
//         });
//       }

//       // Slide 3: Summary
//       if (summary) {
//         slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
//         slide.addText("Summary", {
//           x: 0.5,
//           y: 0.7,
//           w: 12.33,
//           fontSize: 36,
//           fontFace: "Montserrat",
//           bold: true,
//           color: "2E7D32",
//           align: "center",
//         });
//         slide.addText(summary, {
//           x: 0.5,
//           y: 2.0,
//           w: 12.33,
//           fontSize: 18,
//           fontFace: "Montserrat",
//           color: "424242",
//           align: "left",
//           valign: "middle",
//           lineSpacing: 24,
//         });
//       }

//       // Slide 4: Keywords
//       if (keywords && keywords.length > 0) {
//         slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
//         slide.addText("Keywords", {
//           x: 0.5,
//           y: 0.7,
//           w: 12.33,
//           fontSize: 36,
//           fontFace: "Montserrat",
//           bold: true,
//           color: "2E7D32",
//           align: "center",
//         });
//         const keywordsText = keywords.join(", ");
//         slide.addText(keywordsText, {
//           x: 0.5,
//           y: 2.0,
//           w: 12.33,
//           fontSize: 18,
//           fontFace: "Montserrat",
//           color: "424242",
//           align: "left",
//           valign: "middle",
//           italic: true,
//         });
//       }

//       // Slide 5: Recommendations
//       if (recommendations && recommendations.length > 0) {
//         slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
//         slide.addText("Recommendations", {
//           x: 0.5,
//           y: 0.7,
//           w: 12.33,
//           fontSize: 36,
//           fontFace: "Montserrat",
//           bold: true,
//           color: "2E7D32",
//           align: "center",
//         });
//         const recText = recommendations
//           .map((rec, index) => `${index + 1}. ${rec.title || rec}`)
//           .join("\n");
//         slide.addText(recText, {
//           x: 0.5,
//           y: 2.0,
//           w: 12.33,
//           fontSize: 18,
//           fontFace: "Montserrat",
//           color: "424242",
//           align: "left",
//           valign: "middle",
//           lineSpacing: 24,
//         });
//       }

//       // Slide 6: Citations (First 5 only)
//       if (citations && citations.length > 0) {
//         slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
//         slide.addText("Citations", {
//           x: 0.5,
//           y: 0.7,
//           w: 12.33,
//           fontSize: 36,
//           fontFace: "Montserrat",
//           bold: true,
//           color: "2E7D32",
//           align: "center",
//         });
//         const citationsText = citations
//           .slice(0, 5)
//           .map((citation, index) => `${index + 1}. ${citation}`)
//           .join("\n");
//         slide.addText(citationsText, {
//           x: 0.5,
//           y: 2.0,
//           w: 12.33,
//           fontSize: 18,
//           fontFace: "Montserrat",
//           color: "424242",
//           align: "left",
//           valign: "middle",
//           lineSpacing: 24,
//         });
//       }

//       // Slide 7+: Figures & Tables
//       console.log("Images prop in PPT:", images); // Debug
//       if (images && images.length > 0) {
//         images.forEach((img, index) => {
//           if (img.image) {
//             slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
//             slide.addText("Figures & Tables", {
//               x: 0.5,
//               y: 0.7,
//               w: 12.33,
//               fontSize: 36,
//               fontFace: "Montserrat",
//               bold: true,
//               color: "2E7D32",
//               align: "center",
//             });
//             slide.addText(`Figure ${index + 1}: ${img.name || ""}`, {
//               x: 0.5,
//               y: 1.5,
//               w: 12.33,
//               fontSize: 18,
//               fontFace: "Montserrat",
//               italic: true,
//               color: "616161",
//               align: "left",
//             });
//             try {
//               console.log(`Adding image ${index}:`, img.image.substring(0, 50)); // Debug
//               // Ensure base64 string has the correct prefix
//               const imageData = img.image.startsWith("data:image")
//                 ? img.image
//                 : `data:image/jpeg;base64,${img.image}`; // Default to JPEG if no prefix
//               slide.addImage({
//                 data: imageData,
//                 x: 0.5,
//                 y: 2.5,
//                 w: 12.33,
//                 h: 4.5,
//                 sizing: { type: "contain", w: 12.33, h: 4.5 },
//               });
//             } catch (imgError) {
//               console.error("Error adding image to PPT:", imgError, "Image data:", img.image);
//               slide.addText("Image could not be loaded", {
//                 x: 0.5,
//                 y: 2.5,
//                 w: 12.33,
//                 fontSize: 18,
//                 fontFace: "Montserrat",
//                 color: "FF0000",
//                 align: "left",
//               });
//             }
//           }
//         });
//       }

//       // Save PPTX
//       const filename = `${title || "Paper"}_Analysis.pptx`;
//       await pptx.writeFile({ fileName: filename });
//     } catch (error) {
//       console.error("Error generating PPT:", error);
//       alert("Failed to generate PPT. Please try again.");
//     }
//   };

//   return (
//     <DownloadButtonContainer>
//       <StyledButton onClick={handleDownloadPPT}>
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//         Download Analysis PPT
//       </StyledButton>
//     </DownloadButtonContainer>
//   );
// };

// export default DownloadPPTBtn;
































// adding  thaknyou
import React from "react";
import styled from "styled-components";
import PptxGenJS from "pptxgenjs";

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
    background-color: #61c1ef;
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

const DownloadPPTBtn = ({ title, summary, keywords, citations, recommendations, images, authors }) => {
  const handleDownloadPPT = async () => {
    try {
      const pptx = new PptxGenJS();
      pptx.layout = "LAYOUT_WIDE";
      pptx.defineSlideMaster({
        title: "MASTER_SLIDE",
        background: { color: "F5F5F5" },
        objects: [
          {
            rect: {
              x: 0,
              y: 0,
              w: "100%",
              h: 0.5,
              fill: { color: "2E7D32" },
            },
          },
        ],
      });

      // Slide 1: Title Slide
      let slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
      slide.addText(title || "Untitled Paper", {
        x: 0.5,
        y: 1.0,
        w: 12.33,
        h: 2.0,
        fontSize: 40,
        fontFace: "Montserrat",
        bold: true,
        color: "2E7D32",
        align: "center",
        valign: "middle",
        shadow: { type: "outer", color: "CCCCCC", offset: 2, angle: 45 },
      });

      // Slide 2: Introduction (First)
      slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
      slide.addText("Introduction", {
        x: 0.5,
        y: 0.7,
        w: 12.33,
        fontSize: 36,
        fontFace: "Montserrat",
        bold: true,
        color: "2E7D32",
        align: "center",
      });

      // Slide 3: Introduction (Second)
      slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
      slide.addText("Introduction", {
        x: 0.5,
        y: 0.7,
        w: 12.33,
        fontSize: 36,
        fontFace: "Montserrat",
        bold: true,
        color: "2E7D32",
        align: "center",
      });

      // Slide 4: Authors
      if (authors && authors.length > 0) {
        slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
        slide.addText("Authors", {
          x: 0.5,
          y: 0.7,
          w: 12.33,
          fontSize: 36,
          fontFace: "Montserrat",
          bold: true,
          color: "2E7D32",
          align: "center",
        });
        const authorsText = authors.map((author, index) => `${index + 1}. ${author}`).join("\n");
        slide.addText(authorsText, {
          x: 0.5,
          y: 2.0,
          w: 12.33,
          fontSize: 18,
          fontFace: "Montserrat",
          color: "424242",
          align: "left",
          valign: "middle",
          lineSpacing: 24,
        });
      }

      // Slide 5: Summary
      if (summary) {
        slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
        slide.addText("Summary", {
          x: 0.5,
          y: 0.7,
          w: 12.33,
          fontSize: 36,
          fontFace: "Montserrat",
          bold: true,
          color: "2E7D32",
          align: "center",
        });
        slide.addText(summary, {
          x: 0.5,
          y: 2.0,
          w: 12.33,
          fontSize: 18,
          fontFace: "Montserrat",
          color: "424242",
          align: "left",
          valign: "middle",
          lineSpacing: 24,
        });
      }

      // Slide 6: Keywords
      if (keywords && keywords.length > 0) {
        slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
        slide.addText("Keywords", {
          x: 0.5,
          y: 0.7,
          w: 12.33,
          fontSize: 36,
          fontFace: "Montserrat",
          bold: true,
          color: "2E7D32",
          align: "center",
        });
        const keywordsText = keywords.join(", ");
        slide.addText(keywordsText, {
          x: 0.5,
          y: 2.0,
          w: 12.33,
          fontSize: 18,
          fontFace: "Montserrat",
          color: "424242",
          align: "left",
          valign: "middle",
          italic: true,
        });
      }

      // Slide 7: Recommendations
      if (recommendations && recommendations.length > 0) {
        slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
        slide.addText("Recommendations", {
          x: 0.5,
          y: 0.7,
          w: 12.33,
          fontSize: 36,
          fontFace: "Montserrat",
          bold: true,
          color: "2E7D32",
          align: "center",
        });
        const recText = recommendations
          .map((rec, index) => `${index + 1}. ${rec.title || rec}`)
          .join("\n");
        slide.addText(recText, {
          x: 0.5,
          y: 2.0,
          w: 12.33,
          fontSize: 18,
          fontFace: "Montserrat",
          color: "424242",
          align: "left",
          valign: "middle",
          lineSpacing: 24,
        });
      }

      // Slide 8: Citations (First 5 only)
      if (citations && citations.length > 0) {
        slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
        slide.addText("Citations", {
          x: 0.5,
          y: 0.7,
          w: 12.33,
          fontSize: 36,
          fontFace: "Montserrat",
          bold: true,
          color: "2E7D32",
          align: "center",
        });
        const citationsText = citations
          .slice(0, 5)
          .map((citation, index) => `${index + 1}. ${citation}`)
          .join("\n");
        slide.addText(citationsText, {
          x: 0.5,
          y: 2.0,
          w: 12.33,
          fontSize: 18,
          fontFace: "Montserrat",
          color: "424242",
          align: "left",
          valign: "middle",
          lineSpacing: 24,
        });
      }

      // Slide 9+: Figures & Tables
      if (images && images.length > 0) {
        images.forEach((img, index) => {
          if (img.image) {
            slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
            slide.addText("Figures & Tables", {
              x: 0.5,
              y: 0.7,
              w: 12.33,
              fontSize: 36,
              fontFace: "Montserrat",
              bold: true,
              color: "2E7D32",
              align: "center",
            });
            slide.addText(`Figure ${index + 1}: ${img.name || ""}`, {
              x: 0.5,
              y: 1.5,
              w: 12.33,
              fontSize: 18,
              fontFace: "Montserrat",
              italic: true,
              color: "616161",
              align: "left",
            });
            try {
              console.log(`Adding image ${index}:`, img.image.substring(0, 50));
              const imageData = img.image.startsWith("data:image")
                ? img.image
                : `data:image/jpeg;base64,${img.image}`;
              slide.addImage({
                data: imageData,
                x: 0.5,
                y: 2.5,
                w: 12.33,
                h: 4.5,
                sizing: { type: "contain", w: 12.33, h: 4.5 },
              });
            } catch (imgError) {
              console.error("Error adding image to PPT:", imgError, "Image data:", img.image);
              slide.addText("Image could not be loaded", {
                x: 0.5,
                y: 2.5,
                w: 12.33,
                fontSize: 18,
                fontFace: "Montserrat",
                color: "FF0000",
                align: "left",
              });
            }
          }
        });
      }

      // Final Slide: Thank You
      slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });
      slide.addText("Thank You", {
        x: 0.5,
        y: 2.5,
        w: 12.33,
        fontSize: 48,
        fontFace: "Montserrat",
        bold: true,
        color: "2E7D32",
        align: "center",
        valign: "middle",
      });

      // Save PPTX
      const filename = `${title || "Paper"}_Analysis.pptx`;
      await pptx.writeFile({ fileName: filename });
    } catch (error) {
      console.error("Error generating PPT:", error);
      alert("Failed to generate PPT. Please try again.");
    }
  };

  return (
    <DownloadButtonContainer>
      <StyledButton onClick={handleDownloadPPT}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Download Analysis PPT
      </StyledButton>
    </DownloadButtonContainer>
  );
};

export default DownloadPPTBtn;