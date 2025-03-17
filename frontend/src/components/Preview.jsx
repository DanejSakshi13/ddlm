// import React, { useEffect, useRef, useState } from "react";
// import styled from "styled-components";
// import * as pdfjs from "pdfjs-dist";
// import "pdfjs-dist/build/pdf.worker.entry"; // Ensures the worker is loaded correctly

// const PreviewContainer = styled.div`
//   flex: 1.5;
//   background: #f8f9fa;
//   padding: 10px;
//   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   overflow-y: auto;
// `;

// const PreviewCanvas = styled.canvas`
//   width: 100%;
//   max-width: 400px;
//   border: 1px solid #ccc;
// `;

// const Preview = ({ file }) => {
//   const canvasRef = useRef(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!file) return;

//     const renderPDF = async () => {
//       setLoading(true);
//       const fileUrl = URL.createObjectURL(file);
//       const pdf = await pdfjs.getDocument(fileUrl).promise;
//       const page = await pdf.getPage(1); // Get first page
//       const viewport = page.getViewport({ scale: 1.5 });

//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");

//       canvas.width = viewport.width;
//       canvas.height = viewport.height;

//       const renderContext = { canvasContext: context, viewport };
//       await page.render(renderContext).promise;

//       setLoading(false);
//     };

//     renderPDF();
//   }, [file]);

//   if (!file) return null;

//   return (
//     <PreviewContainer>
//       <h3>PDF Preview</h3>
//       {loading ? <p>Loading...</p> : <PreviewCanvas ref={canvasRef} />}
//     </PreviewContainer>
//   );
// };

// export default Preview;


import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// Import pdfjs correctly
import * as pdfjsLib from 'pdfjs-dist';

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const PreviewContainer = styled.div`
  flex: 1.5;
  background: #f8f9fa;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PreviewCanvas = styled.canvas`
  border: 1px solid #e0e0e0;
  max-width: 100%;
`;

const Preview = ({ file }) => {
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!file) return;

    const loadPDF = async () => {
      try {
        // Create blob URL
        const url = URL.createObjectURL(file);
        
        // Load the PDF
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        
        // Get the first page
        const page = await pdf.getPage(1);
        
        // Set scale and get viewport
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
        
        // Get canvas context
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        // Set canvas dimensions
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Render PDF page
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          background: 'rgb(255, 255, 255)',
        };
        
        await page.render(renderContext).promise;
        
        // Clean up
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error loading PDF:', error);
        setError(error.message);
      }
    };

    loadPDF();
  }, [file]);

  if (!file) return null;

  return (
    <PreviewContainer>
      {error ? (
        <div>Error loading PDF: {error}</div>
      ) : (
        <PreviewCanvas ref={canvasRef} />
      )}
    </PreviewContainer>
  );
};

export default Preview;