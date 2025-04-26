

// perfect code that extracts in secions wise 11/4/25
// import React from "react";
// import styled from "styled-components";

// const FiguresContainer = styled.div`
//   margin-top: 20px;
//   padding: 15px;
//   background-color: rgb(37, 37, 37);
//   border-radius: 8px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//   border: 0.5px #5f5f5f solid;
// `;

// const FiguresTitle = styled.h3`
//   font-family: "Montserrat", serif;
//   margin-bottom: 10px;
//   color: white;
//   font-size: 1rem;
//   margin-top: 10px;
// `;

// const ImageGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//   gap: 10px;
// `;

// const FigureItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   border: 1px white solid;
//   background-color: white;
//   padding: 5px;
// `;

// const FigureImage = styled.img`
//   max-width: 100%;
//   height: auto;
//   border-radius: 4px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// `;

// const FigureCaption = styled.p`
//   font-family: "Montserrat", serif;
//   font-size: 12px;
//   color: #666;
//   margin-top: 5px;
//   text-align: center;
// `;

// const FiguresExtracted = ({ visualContent }) => {
//   if (!visualContent || visualContent.length === 0) {
//     return null;
//   }

//   return (
//     <FiguresContainer>
//       <FiguresTitle>Extracted Visual Content</FiguresTitle>
//       <ImageGrid>
//         {visualContent.map((item, index) => {
//           // Ensure base64 string is prefixed correctly
//           const src = item.image.startsWith("data:image")
//             ? item.image
//             : `data:image/png;base64,${item.image}`;
//           return (
//             <FigureItem key={index}>
//               <FigureImage src={src} alt={item.name} onError={() => console.error(`Failed to load image: ${item.name}`)} />
//               <FigureCaption>{item.name}</FigureCaption>
//             </FigureItem>
//           );
//         })}
//       </ImageGrid>
//     </FiguresContainer>
//   );
// };

// export default FiguresExtracted;













import React from "react";
import styled from "styled-components";

const FiguresContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: rgb(37, 37, 37);
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 0.5px #5f5f5f solid;
`;

const FiguresTitle = styled.h3`
  font-family: "Montserrat", serif;
  margin-bottom: 10px;
  color: white;
  font-size: 1rem;
  margin-top: 10px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
`;

const FigureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px white solid;
  background-color: white;
  padding: 5px;
`;

const FigureImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FigureCaption = styled.p`
  font-family: "Montserrat", serif;
  font-size: 12px;
  color: #666;
  margin-top: 5px;
  text-align: center;
`;

const FiguresExtracted = ({ visualContent }) => {
  if (!visualContent || visualContent.length === 0) {
    return null;
  }

  return (
    <FiguresContainer>
      <FiguresTitle>Extracted Visual Content</FiguresTitle>
      <ImageGrid>
        {visualContent.map((item, index) => {
          // Add base64 prefix for proper image rendering
          const src = `data:image/png;base64,${item.image}`;
          return (
            <FigureItem key={index}>
              <FigureImage
                src={src}
                alt={item.name}
                onError={(e) => console.error(`Failed to load image: ${item.name}`, e)}
              />
              <FigureCaption>{item.name}</FigureCaption>
            </FigureItem>
          );
        })}
      </ImageGrid>
    </FiguresContainer>
  );
};

export default FiguresExtracted;











// trying the google lens logic
// import React, { useState } from "react";
// import styled from "styled-components";

// const FiguresContainer = styled.div`
//   margin-top: 20px;
//   padding: 15px;
//   background-color: rgb(37, 37, 37);
//   border-radius: 8px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//   border: 0.5px #5f5f5f solid;
// `;

// const FiguresTitle = styled.h3`
//   font-family: "Montserrat", serif;
//   margin-bottom: 10px;
//   color: white;
//   font-size: 1rem;
//   margin-top: 10px;
// `;

// const ImageGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//   gap: 10px;
// `;

// const FigureItem = styled.div`
//   position: relative; /* For positioning the lens and tooltip */
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   border: 1px white solid;
//   background-color: white;
//   padding: 5px;
//   &:hover .lens-icon {
//     opacity: 1;
//   }
//   &:hover .explanation {
//     display: block;
//   }
// `;

// const FigureImage = styled.img`
//   max-width: 100%;
//   height: auto;
//   border-radius: 4px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   cursor: pointer; /* Indicate interactivity */
// `;

// const FigureCaption = styled.p`
//   font-family: "Montserrat", serif;
//   font-size: 12px;
//   color: #666;
//   margin-top: 5px;
//   text-align: center;
// `;

// const LensIcon = styled.div`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   width: 30px;
//   height: 30px;
//   background: url("https://img.icons8.com/ios-filled/50/000000/search.png") no-repeat center;
//   background-size: contain;
//   opacity: 0;
//   transition: opacity 0.2s ease;
//   cursor: pointer;
// `;

// const ExplanationTooltip = styled.div`
//   display: none;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: rgba(0, 0, 0, 0.8);
//   color: white;
//   padding: 10px;
//   border-radius: 4px;
//   max-width: 80%;
//   font-family: "Montserrat", serif;
//   font-size: 12px;
//   z-index: 10;
//   text-align: center;
// `;

// const FiguresExtracted = ({ visualContent }) => {
//   const [explanations, setExplanations] = useState({}); // Store explanations for each image

//   if (!visualContent || visualContent.length === 0) {
//     return null;
//   }

//   // Mock function to simulate Google Lens query
//   const fetchExplanation = async (imageName, imageSrc) => {
//     // Placeholder for actual Google Lens API or custom backend call
//     // For now, return a mock explanation based on the image name
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(`This figure (${imageName}) appears to be a visual representation of data extracted from the document. It likely illustrates trends or patterns relevant to the paper's content.`);
//       }, 1000); // Simulate network delay
//     });
//   };

//   const handleLensClick = async (index, imageName, imageSrc) => {
//     if (!explanations[index]) {
//       const explanation = await fetchExplanation(imageName, imageSrc);
//       setExplanations((prev) => ({
//         ...prev,
//         [index]: explanation,
//       }));
//     }
//   };

//   return (
//     <FiguresContainer>
//       <FiguresTitle>Extracted Visual Content</FiguresTitle>
//       <ImageGrid>
//         {visualContent.map((item, index) => {
//           const src = item.image.startsWith("data:image")
//             ? item.image
//             : `data:image/png;base64,${item.image}`;
//           return (
//             <FigureItem key={index}>
//               <FigureImage
//                 src={src}
//                 alt={item.name}
//                 onError={() => console.error(`Failed to load image: ${item.name}`)}
//               />
//               <LensIcon
//                 className="lens-icon"
//                 onClick={() => handleLensClick(index, item.name, src)}
//                 title="Analyze with Lens"
//               />
//               {explanations[index] && (
//                 <ExplanationTooltip className="explanation">
//                   {explanations[index]}
//                 </ExplanationTooltip>
//               )}
//               <FigureCaption>{item.name}</FigureCaption>
//             </FigureItem>
//           );
//         })}
//       </ImageGrid>
//     </FiguresContainer>
//   );
// };

// export default FiguresExtracted;