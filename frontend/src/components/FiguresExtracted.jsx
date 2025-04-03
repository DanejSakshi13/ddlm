import React from "react";
import styled from "styled-components";

const FiguresContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const FiguresTitle = styled.h3`
  font-family: "Montserrat", serif;
  font-weight: 500;
  margin-bottom: 10px;
  color: #333;
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

const FiguresExtracted = ({ images }) => {
  if (!images || images.length === 0) {
    return null; // Don’t render if no images
  }

  return (
    <FiguresContainer>
      <FiguresTitle>Extracted Figures</FiguresTitle>
      <ImageGrid>
        {images.map((image, index) => (
          <FigureItem key={index}>
            <FigureImage
              src={`data:image/png;base64,${image.image}`} // Base64 image data
              alt={image.name}
            />
            <FigureCaption>{image.name}</FigureCaption>
          </FigureItem>
        ))}
      </ImageGrid>
    </FiguresContainer>
  );
};

export default FiguresExtracted;















// separate api call not in dashbaord
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const FiguresContainer = styled.div`
//   margin-top: 20px;
//   padding: 15px;
//   background: #fff;
//   border-radius: 8px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
// `;

// const FiguresTitle = styled.h3`
//   font-family: "Montserrat", serif;
//   font-weight: 500;
//   margin-bottom: 10px;
//   color: #333;
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

// const API_BASE_URL = "http://127.0.0.1:5000";

// const FiguresExtracted = ({ file, email, onImagesFetched }) => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (file && email) {
//       fetchImages();
//     }
//   }, [file, email]);

//   const fetchImages = async () => {
//     setLoading(true);
//     setError("");
//     setImages([]);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("email", email);
//       const response = await fetch(`${API_BASE_URL}/api/paper-analysis`, {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });
//       if (!response.ok) throw new Error(`Failed to fetch images: ${response.status}`);
//       const data = await response.json();
//       setImages(data.analysis.images || []);
//       if (onImagesFetched) {
//         onImagesFetched(data.analysis.images || []);
//       }
//     } catch (err) {
//       console.error("Error fetching images:", err);
//       setError(err.message || "Failed to fetch images.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading images...</p>;
//   if (error) return <p>{error}</p>;
//   if (!images.length) return null;

//   return (
//     <FiguresContainer>
//       <FiguresTitle>Extracted Figures</FiguresTitle>
//       <ImageGrid>
//         {images.map((image, index) => (
//           <FigureItem key={index}>
//             <FigureImage
//               src={`data:image/png;base64,${image.image}`}
//               alt={image.name}
//             />
//             <FigureCaption>{image.name}</FigureCaption>
//           </FigureItem>
//         ))}
//       </ImageGrid>
//     </FiguresContainer>
//   );
// };

// export default FiguresExtracted;