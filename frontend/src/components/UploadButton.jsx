

// // UploadButton.jsx
// import React, { useState, useRef } from 'react';
// import styled from 'styled-components';

// const UploadContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 200px;
//   flex-direction : column;
//   background-color:#e3f2fd;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   font-family: "Montserrat", serif;
//   width:80%;
//   margin-top:10%;
// `;

// const HiddenInput = styled.input`
//   display: none;
// `;

// const StyledButton = styled.label`
//   padding: 10px 20px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 16px;
//   transition: background-color 0.2s;
//   margin-top: 30px;

//   &:hover {
//     background-color: #0056b3;
//   }

//   &:disabled {
//     background-color: #cccccc;
//     cursor: not-allowed;
//   }
// `;

// const UploadButton = ({ onUploadComplete }) => {
//   const [loading, setLoading] = useState(false);
//   const inputRef = useRef(null);

//   const handleFileChange = async (event) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setLoading(true);
//     try {
//       await onUploadComplete(file);
//     } catch (error) {
//       console.error("Error handling file upload:", error);
//     } finally {
//       setLoading(false);
//       // Reset the input
//       if (inputRef.current) {
//         inputRef.current.value = '';
//       }
//     }
//   };

//   return (
//     <UploadContainer>
//       🚀 Upload Your Research Paper & Unlock Powerful Insights Instantly!
     
//       <HiddenInput 
//         ref={inputRef}
//         type="file" 
//         id="fileUpload" 
//         onChange={handleFileChange}
//         accept=".pdf"
//         disabled={loading}
//       />
      
//       <StyledButton htmlFor="fileUpload" disabled={loading}>
//         {loading ? "Analyzing..." : "Upload Document"}
//       </StyledButton>
//     </UploadContainer>
//   );
// };

// export default UploadButton;





















// ENHANCED
// UploadButton.jsx
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Importing an upload icon

const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px; /* Increased height for better spacing */
  flex-direction: column;
  background-color: #252525;
  // background: linear-gradient(135deg,#9ccfff,rgb(195, 217, 255)); /* Vibrant gradient background */
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
  font-family: "Montserrat", serif;
  width: 80%;
  border: 0.5px #5f5f5f solid;
  margin: 5% auto; /* Center the container */
  border-radius: 10px; /* Rounded corners */
  padding: 40px; /* Padding for inner spacing */
  position: relative; /* For positioning the animated effect */
  overflow: hidden; /* Hide overflow for the animated effect */
  transition: transform 0.3s ease; /* Smooth scaling effect */
  &:hover {
    transform: scale(1.05); /* Scale up on hover */
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const StyledButton = styled.label`
  display: flex;
  align-items: center; /* Center the icon and text vertically */
  padding: 15px 30px;
  background-color: #D2FF72; /* Semi-transparent white */
  color: #333;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  height:28px;
  font-size: 15px;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.3s; /* Smooth transition */
  margin-top: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Button shadow */
  
  &:hover {
    background-color:  #D2FF72; /* Fully white on hover */
    transform: translateY(-3px); /* Lift effect on hover */
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const UploadMessage = styled.p`
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px; /* Space between message and button */
  color: #ffffff; /* White text for better contrast */
  // font-weight: bold; /* Bold text */
`;

const AnimatedEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2); /* Light overlay */
  border-radius: 20px; /* Match the container's border radius */
  opacity: 0;
  transition: opacity 0.3s ease; /* Smooth transition for the overlay */
  
  ${StyledButton}:hover & {
    opacity: 1; /* Show overlay on button hover */
  }
`;

const UploadButton = ({ onUploadComplete }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      await onUploadComplete(file);
    } catch (error) {
      console.error("Error handling file upload:", error);
    } finally {
      setLoading(false);
      // Reset the input
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <UploadContainer>
      <UploadMessage>
        Upload Your Research Paper & Unlock Powerful Insights Instantly!
      </UploadMessage>
      
      <HiddenInput 
        ref={inputRef}
        type="file" 
        id="fileUpload" 
        onChange={handleFileChange}
        accept=".pdf"
        disabled={loading}
      />
      
      <StyledButton htmlFor="fileUpload" disabled={loading}>
        <CloudUploadIcon style={{ marginRight: '8px', fontSize: '30px' }} /> {/* Icon next to the text */}
        {loading ? "Analyzing..." : "Upload Document"}
        <AnimatedEffect /> {/* Animated overlay effect */}
      </StyledButton>
    </UploadContainer>
  );
};

export default UploadButton;





