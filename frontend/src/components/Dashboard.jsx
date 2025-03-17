
// Dashboard.jsx
//working code
// import React, { useState } from "react";
// import styled from "styled-components";
// import UploadButton from "./UploadButton";
// import Summarizer from "./Summarizer";
// import Keywords from "./Keywords";

// const DashboardContainer = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
//   padding: 20px;
// `;

// const LoadingIndicator = styled.div`
//   text-align: center;
//   margin: 20px 0;
//   color: #666;
// `;

// const ErrorMessage = styled.div`
//   color: #dc3545;
//   background-color: #f8d7da;
//   padding: 10px;
//   border-radius: 4px;
//   margin: 10px 0;
// `;

// const Dashboard = () => {
//   const [summary, setSummary] = useState("");
//   const [keywords, setKeywords] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleUpload = async (file) => {
//     if (!file) return;
    
//     setLoading(true);
//     setError("");
//     setSummary("");
//     setKeywords([]);

//     try {
//       // Handle summary request
//       const summaryFormData = new FormData();
//       summaryFormData.append("file", file);
//       summaryFormData.append("word_limit", 150);

//       const summaryResponse = await fetch("http://127.0.0.1:5000/api/summarize-pdf", {
//         method: "POST",
//         body: summaryFormData,
//         mode: 'cors',
//         credentials: 'include',
//         headers: {
//           'Accept': 'application/json',
//         }
//       });

//       if (!summaryResponse.ok) {
//         throw new Error(`Server responded with status: ${summaryResponse.status}`);
//       }

//       const summaryData = await summaryResponse.json();

//       // Handle keywords request
//       const keywordFormData = new FormData();
//       keywordFormData.append("pdf", file);

//       const keywordResponse = await fetch("http://127.0.0.1:5000/api/keywords/", {
//         method: "POST",
//         body: keywordFormData,
//         mode: 'cors',
//         credentials: 'include',
//         headers: {
//           'Accept': 'application/json',
//         }
//       });

//       if (!keywordResponse.ok) {
//         throw new Error(`Server responded with status: ${keywordResponse.status}`);
//       }

//       const keywordData = await keywordResponse.json();

//       // Update state with results
//       setSummary(summaryData.summary || "");
//       setKeywords(keywordData.keywords || []);
//     } catch (error) {
//       console.error("Error processing file:", error);
//       setError(
//         `Unable to process the document. ${
//           error.message || 'Please try again.'
//         }`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <DashboardContainer>
//       <UploadButton onUploadComplete={handleUpload} />
      
//       {loading && (
//         <LoadingIndicator>Analyzing document...</LoadingIndicator>
//       )}
      
//       {error && (
//         <ErrorMessage>{error}</ErrorMessage>
//       )}
      
//       {!loading && !error && (
//         <>
//           <Summarizer summary={summary} />
//           <Keywords keywords={keywords} />
//         </>
//       )}
//     </DashboardContainer>
//   );
// };

// export default Dashboard;



















/*

// Dashboard.jsx
//BEST WORKING
import React, { useState } from "react";
import styled from "styled-components";
import UploadButton from "./UploadButton";
import Summarizer from "./Summarizer";
import Keywords from "./Keywords";

const DashboardContainer = styled.div`
  max-width: 800px;
  margin-left: 20px;
  padding: 20px;
`;

const LoadingIndicator = styled.div`
  text-align: center;
  margin: 20px 0;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  background-color: #f8d7da;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
`;

const ResetButton = styled.button`
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #5a6268;
  }
`;

const Dashboard = () => {
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    if (!file) return;
    
    setLoading(true);
    setError("");
    setSummary("");
    setKeywords([]);

    try {
      // Handle summary request
      const summaryFormData = new FormData();
      summaryFormData.append("file", file);
      summaryFormData.append("word_limit", 150);

      const summaryResponse = await fetch("http://127.0.0.1:5000/api/summarize-pdf", {
        method: "POST",
        body: summaryFormData,
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!summaryResponse.ok) {
        throw new Error(`Server responded with status: ${summaryResponse.status}`);
      }

      const summaryData = await summaryResponse.json();

      // Handle keywords request
      const keywordFormData = new FormData();
      keywordFormData.append("pdf", file);

      const keywordResponse = await fetch("http://127.0.0.1:5000/api/keywords/", {
        method: "POST",
        body: keywordFormData,
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!keywordResponse.ok) {
        throw new Error(`Server responded with status: ${keywordResponse.status}`);
      }

      const keywordData = await keywordResponse.json();

      // Update state with results
      setSummary(summaryData.summary || "");
      setKeywords(keywordData.keywords || []);
    } catch (error) {
      console.error("Error processing file:", error);
      setError(
        `Unable to process the document. ${
          error.message || 'Please try again.'
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSummary("");
    setKeywords([]);
    setError("");
  };

  const hasResults = summary || keywords.length > 0;

  return (
    <DashboardContainer>
      {!hasResults && !loading && (
        <UploadButton onUploadComplete={handleUpload} />
      )}
      
      {loading && (
        <LoadingIndicator>Analyzing document...</LoadingIndicator>
      )}
      
      {error && (
        <>
          <ErrorMessage>{error}</ErrorMessage>
          <ResetButton onClick={handleReset}>Try Again</ResetButton>
        </>
      )}
      
      {hasResults && !loading && !error && (
        <>
          <Summarizer summary={summary} />
          <Keywords keywords={keywords} />
          <ResetButton onClick={handleReset}>Analyze Another Document</ResetButton>
        </>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;

*/
















// //DASHBORD GRAPH IMPLEMENTATION
// import React, { useState } from "react";
// import styled from "styled-components";
// import UploadButton from "./UploadButton";
// import Summarizer from "./Summarizer";
// import Keywords from "./Keywords";
// import Graph from "./Graph";
// import Features from "./Features";
// import PaperTitle from "./PaperTitle";

// const FlexRow = styled.div`
//   display: flex;
//   margin-top: 20px;
// `;

// const Column = styled.div`
//   flex: ${(props) => props.width || 1}; /* Default to 1 if no width is provided */
//   display: flex;
//   flex-direction: column;
// `;

// const DashboardContainer = styled.div`
//   max-width: 900px;
//   margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? '100px' : '100px')}; /* Conditional margin */
//   padding: 20px;
// `;

// const LoadingIndicator = styled.div`
//   text-align: center;
//   margin: 20px 0;
//   color: #666;
// `;


// // Create a styled spinner component
// const Spinner = styled.div`
//   border: 8px solid rgba(255, 255, 255, 0.3); /* Light border */
//   border-top: 8px solid #D2FF72; /* Color of the spinner */
//   border-radius: 50%;
//   width: 40px; /* Size of the spinner */
//   height: 40px; /* Size of the spinner */
//   margin: 0 auto; /* Center the spinner */
//   margin-top: 200px;
//   margin-left: 400px;
// `;

// const ErrorMessage = styled.div`
//   color: #dc3545;
//   background-color: #f8d7da;
//   padding: 10px;
//   border-radius: 4px;
//   margin: 10px 0;
// `;

// const ResetButton = styled.button`
//   margin-top: 20px;
//   padding: 8px 16px;
//   background-color: #6c757d;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 14px;
  
//   &:hover {
//     background-color: #5a6268;
//   }
// `;

// const API_BASE_URL = 'http://127.0.0.1:5000';

// const Dashboard = ({ isSidebarOpen }) => { // Accept the sidebar state
//   const [summary, setSummary] = useState("");
//   const [keywords, setKeywords] = useState([]);
//   const [graphUrl, setGraphUrl] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const makeApiRequest = async (endpoint, formData) => {
//     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//       method: "POST",
//       body: formData,
//       mode: 'cors',
//       credentials: 'include',
//       headers: {
//         'Accept': 'application/json',
//         // Let the browser set the Content-Type with boundary for FormData
//       }
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`${response.status}: ${errorText || response.statusText}`);
//     }

//     return response;
//   };

//   const handleUpload = async (file) => {
//     if (!file) return;
  
//     setLoading(true);
//     setError("");
//     setSummary("");
//     setKeywords([]);
//     setGraphUrl("");  // Ensure previous graph is cleared
  
//     try {
//       // Handle summary request
//       const summaryFormData = new FormData();
//       summaryFormData.append("file", file);
//       summaryFormData.append("word_limit", 150);
  
//       const summaryResponse = await fetch("http://127.0.0.1:5000/api/summarize-pdf", {
//         method: "POST",
//         body: summaryFormData,
//         mode: "cors",
//         credentials: "include",
//         headers: {
//           Accept: "application/json",
//         },
//       });
  
//       if (!summaryResponse.ok) {
//         throw new Error(`Server responded with status: ${summaryResponse.status}`);
//       }
  
//       const summaryData = await summaryResponse.json();
  
//       // Handle keywords request
//       const keywordFormData = new FormData();
//       keywordFormData.append("pdf", file);
  
//       const keywordResponse = await fetch("http://127.0.0.1:5000/api/keywords/", {
//         method: "POST",
//         body: keywordFormData,
//         mode: "cors",
//         credentials: "include",
//         headers: {
//           Accept: "application/json",
//         },
//       });
  
//       if (!keywordResponse.ok) {
//         throw new Error(`Server responded with status: ${keywordResponse.status}`);
//       }
  
//       const keywordData = await keywordResponse.json();
  
//       // Handle table extraction
//       const tableFormData = new FormData();
//       tableFormData.append("pdf", file);
  
//       const tableResponse = await fetch("http://127.0.0.1:5000/api/table-extract", {
//         method: "POST",
//         body: tableFormData,
//         mode: "cors",
//         credentials: "include",
//         headers: {
//           Accept: "application/json",
//         },
//       });
  
//       let graphUrl = "";
//       if (tableResponse.ok) {
//         if (tableResponse.headers.get("content-type").includes("image")) {
//           const blob = await tableResponse.blob();
//           graphUrl = URL.createObjectURL(blob);
//         } else {
//           const tableData = await tableResponse.json();
//           if (tableData.message === "No numeric data available for visualization") {
//             graphUrl = "no-data"; // Custom value to indicate no graph
//           }
//         }
//       }
  
//       // Update state with results
//       setSummary(summaryData.summary || "");
//       setKeywords(keywordData.keywords || []);
//       setGraphUrl(graphUrl); // Set graph URL or "no-data"
//     } catch (error) {
//       console.error("Error processing file:", error);
//       setError(`Unable to process the document. ${error.message || "Please try again."}`);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const handleReset = () => {
//     setSummary("");
//     setKeywords([]);
//     setGraphUrl(null);
//     setError("");
//   };

//   const hasResults = summary || keywords.length > 0 || graphUrl;

//   return (
//     <DashboardContainer isSidebarOpen={isSidebarOpen}> {/* Pass the sidebar state */}
//       {!hasResults && !loading && (
//         <UploadButton onUploadComplete={handleUpload} />
//       )}

//       {!hasResults && !loading && (
//         <Features /> // Render Features component when no results are available
//       )}
//       {loading && <LoadingIndicator> <Spinner /></LoadingIndicator>}
      
//       {error && (
//         <>
//           <ErrorMessage>{error}</ErrorMessage>
//           <ResetButton onClick={handleReset}>Try Again</ResetButton>
//         </>
//       )}
      
//       {hasResults && !loading && !error && (
//         <>
//           <PaperTitle file={uploadedFile} /> {/* Include PaperTitle component */}

//           <Summarizer summary={summary} />
          
//           <FlexRow>
//             <Column width={1}> 
//               <Keywords keywords={keywords} />
//             </Column>
//             <Column width={2}>
//               {graphUrl && <Graph graphUrl={graphUrl} />}
//             </Column>
//           </FlexRow>
          
  
//           <ResetButton onClick={handleReset}>Analyze Another Document</ResetButton>
//         </>
//       )}
//     </DashboardContainer>
//   );
// };

// export default Dashboard;












































// // absolutly perfectly working dashbaord
// import React, { useState } from "react";
// import styled from "styled-components";
// import UploadButton from "./UploadButton";
// import Summarizer from "./Summarizer";
// import Keywords from "./Keywords";
// import Graph from "./Graph";
// import Features from "./Features";
// import PaperTitle from "./PaperTitle"; // Import the PaperTitle component
// import Citations from "./Citations";

// const FlexRow = styled.div`
//   display: flex;
//   margin-top: 20px;
// `;

// const Column = styled.div`
//   flex: ${(props) => props.width || 1}; /* Default to 1 if no width is provided */
//   display: flex;
//   flex-direction: column;
// `;

// const DashboardContainer = styled.div`
//   max-width: 900px;
//   margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? '100px' : '100px')}; /* Conditional margin */
//   padding: 20px;
// `;

// const LoadingIndicator = styled.div`
//   text-align: center;
//   margin: 20px 0;
//   color: #666;
// `;

// const Spinner = styled.div`
//   border: 8px solid rgba(255, 255, 255, 0.3); /* Light border */
//   border-top: 8px solid #D2FF72; /* Color of the spinner */
//   border-radius: 50%;
//   width: 40px; /* Size of the spinner */
//   height: 40px; /* Size of the spinner */
//   margin: 0 auto; /* Center the spinner */
//   margin-top: 200px;
//   margin-left: 400px;
// `;

// const ErrorMessage = styled.div`
//   color: #dc3545;
//   background-color: #f8d7da;
//   padding: 10px;
//   border-radius: 4px;
//   margin: 10px 0;
// `;

// const ResetButton = styled.button`
//   margin-top: 20px;
//   padding: 10px 30px;
//   background-color: rgb(37, 37, 37);
//   color: white;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   font-size: 14px;
//   font-family: "Montserrat", serif;
//   font-weight: 200;
  
//   &:hover {
//     background-color: #5a6268;
//   }
// `;

// const API_BASE_URL = 'http://127.0.0.1:5000';

// const Dashboard = ({ isSidebarOpen }) => {
//   const [summary, setSummary] = useState("");
//   const [keywords, setKeywords] = useState([]);
//   const [graphUrl, setGraphUrl] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState(null); // State to hold the uploaded file

//   const makeApiRequest = async (endpoint, formData) => {
//     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//       method: "POST",
//       body: formData,
//       mode: 'cors',
//       credentials: 'include',
//       headers: {
//         'Accept': 'application/json',
//       }
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`${response.status}: ${errorText || response.statusText}`);
//     }

//     return response;
//   };

//   const handleUpload = async (file) => {
//     if (!file) return;

//     setUploadedFile(file); // Set the uploaded file
//     setLoading(true);
//     setError("");
//     setSummary("");
//     setKeywords([]);
//     setGraphUrl("");  // Ensure previous graph is cleared

//     try {
//       // Handle summary request
//       const summaryFormData = new FormData();
//       summaryFormData.append("file", file);
//       summaryFormData.append("word_limit", 150);

//       const summaryResponse = await fetch("http://127.0.0.1:5000/api/summarize-pdf", {
//         method: "POST",
//         body: summaryFormData,
//         mode: "cors",
//         credentials: "include",
//         headers: {
//           Accept: "application/json",
//         },
//       });

//       if (!summaryResponse.ok) {
//         throw new Error(`Server responded with status: ${summaryResponse.status}`);
//       }

//       const summaryData = await summaryResponse.json();

//       // Handle keywords request
//       const keywordFormData = new FormData();
//       keywordFormData.append("pdf", file);

//       const keywordResponse = await fetch("http://127.0.0.1:5000/api/keywords/", {
//         method: "POST",
//         body: keywordFormData,
//         mode: "cors",
//         credentials: "include",
//         headers: {
//           Accept: "application/json",
//         },
//       });

//       if (!keywordResponse.ok) {
//         throw new Error(`Server responded with status: ${keywordResponse.status}`);
//       }

//       const keywordData = await keywordResponse.json();

//       // Handle table extraction
//       const tableFormData = new FormData();
//       tableFormData.append("pdf", file);

//       const tableResponse = await fetch("http://127.0.0.1:5000/api/table-extract", {
//         method: "POST",
//         body: tableFormData,
//         mode: "cors",
//         credentials: "include",
//         headers: {
//           Accept: "application/json",
//         },
//       });

//       let graphUrl = "";
//       if (tableResponse.ok) {
//         if (tableResponse.headers.get("content-type").includes("image")) {
//           const blob = await tableResponse.blob();
//           graphUrl = URL.createObjectURL(blob);
//         } else {
//           const tableData = await tableResponse.json();
//           if (tableData.message === "No numeric data available for visualization") {
//             graphUrl = "no-data"; // Custom value to indicate no graph
//           }
//         }
//       }

//       // Update state with results
//       setSummary(summaryData.summary || "");
//       setKeywords(keywordData.keywords || []);
//       setGraphUrl (graphUrl); // Set graph URL or "no-data"
//     } catch (error) {
//       console.error("Error processing file:", error);
//       setError(`Unable to process the document. ${error.message || "Please try again."}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setSummary("");
//     setKeywords([]);
//     setGraphUrl(null);
//     setError("");
//     setUploadedFile(null); // Reset the uploaded file state
//   };

//   const hasResults = summary || keywords.length > 0 || graphUrl;

//   return (
//     <DashboardContainer isSidebarOpen={isSidebarOpen}>
//       {!hasResults && !loading && (
//         <UploadButton onUploadComplete={handleUpload} />
//       )}

//       {!hasResults && !loading && (
//         <Features />
//       )}
//       {loading && <LoadingIndicator><Spinner /></LoadingIndicator>}
      
//       {error && (
//         <>
//           <ErrorMessage>{error}</ErrorMessage>
//           <ResetButton onClick={handleReset}>Try Again</ResetButton>
//         </>
//       )}
      
//       {hasResults && !loading && !error && (
//         <>
//           <PaperTitle file={uploadedFile} /> {/* Include PaperTitle component */}
//           <Summarizer summary={summary} />
          
//           <FlexRow>
//             <Column width={1}> 
//               <Keywords keywords={keywords} />
//             </Column>
//             <Column width={2}>
//               {graphUrl && <Graph graphUrl={graphUrl} />}
//             </Column>
//           </FlexRow>
          
//           <ResetButton onClick={handleReset}>Analyze Another Document</ResetButton>
//         </>
//       )}
//     </DashboardContainer>
//   );
// };

// export default Dashboard;































// dashbaord trying to integrate the citations
import React, { useState } from "react";
import styled from "styled-components";
import UploadButton from "./UploadButton";
import Summarizer from "./Summarizer";
import Keywords from "./Keywords";
import Graph from "./Graph";
import Features from "./Features";
import PaperTitle from "./PaperTitle"; 
import Citations from "./Citations"; 

const FlexRow = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Column = styled.div`
  flex: ${(props) => props.width || 1}; /* Default to 1 if no width is provided */
  display: flex;
  flex-direction: column;
`;

const DashboardContainer = styled.div`
  max-width: 900px;
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? '100px' : '100px')}; /* Conditional margin */
  padding: 20px;
`;

const LoadingIndicator = styled.div`
  text-align: center;
  margin: 20px 0;
  color: #666;
`;

const Spinner = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.3); /* Light border */
  border-top: 8px solid #D2FF72; /* Color of the spinner */
  border-radius: 50%;
  width: 40px; /* Size of the spinner */
  height: 40px; /* Size of the spinner */
  margin: 0 auto; /* Center the spinner */
  margin-top: 200px;
  margin-left: 400px;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  background-color: #f8d7da;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
`;

const ResetButton = styled.button`
  margin-top: 20px;
  padding: 10px 30px;
  background-color: rgb(37, 37, 37);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-family: "Montserrat", serif;
  font-weight: 200;
  
  &:hover {
    background-color: #5a6268;
  }
`;

const API_BASE_URL = 'http://127.0.0.1:5000';

const Dashboard = ({ isSidebarOpen }) => {
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [graphUrl, setGraphUrl] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null); // State to hold the uploaded file

  const handleUpload = async (file) => {
    if (!file) return;

    setUploadedFile(file); // Set the uploaded file
    setLoading(true);
    setError("");
    setSummary("");
    setKeywords([]);
    setGraphUrl("");  // Ensure previous graph is cleared

    try {
      // Handle summary request
      const summaryFormData = new FormData();
      summaryFormData.append("file", file);
      summaryFormData.append("word_limit", 150);

      const summaryResponse = await fetch(`${API_BASE_URL}/api/summarize-pdf`, {
        method: "POST",
        body: summaryFormData,
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      if (!summaryResponse.ok) {
        throw new Error(`Server responded with status: ${summaryResponse.status}`);
      }

      const summaryData = await summaryResponse.json();

      // Handle keywords request
      const keywordFormData = new FormData();
      keywordFormData.append("pdf", file);

      const keywordResponse = await fetch(`${API_BASE_URL}/api/keywords/`, {
        method: "POST",
        body: keywordFormData,
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      if (!keywordResponse.ok) {
        throw new Error(`Server responded with status: ${keywordResponse.status}`);
      }

      const keywordData = await keywordResponse.json();

      // Handle table extraction
      const tableFormData = new FormData();
      tableFormData.append("pdf", file);

      const tableResponse = await fetch(`${API_BASE_URL}/api/table-extract`, {
        method: "POST",
        body: tableFormData,
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      let graphUrl = "";
      if (tableResponse.ok) {
        if (tableResponse.headers.get("content-type").includes("image")) {
          const blob = await tableResponse.blob();
          graphUrl = URL.createObjectURL(blob);
        } else {
          const tableData = await tableResponse.json();
          if (tableData.message === "No numeric data available for visualization") {
            graphUrl = "no-data"; // Custom value to indicate no graph
          }
        }
      }

      // Update state with results
      setSummary(summaryData.summary || "");
      setKeywords(keywordData.keywords || []);
      setGraphUrl(graphUrl); // Set graph URL or "no-data"
    } catch (error) {
      console.error("Error processing file:", error);
      setError(`Unable to process the document. ${error.message || "Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSummary("");
    setKeywords([]);
    setGraphUrl(null);
    setError("");
    setUploadedFile(null); // Reset the uploaded file state
  };

  const hasResults = summary || keywords.length > 0 || graphUrl;

  return (
    <DashboardContainer isSidebarOpen={isSidebarOpen}>
      {!hasResults && !loading && (
        <UploadButton onUploadComplete={handleUpload} />
      )}

      {!hasResults && !loading && (
        <Features />
      )}
      {loading && <LoadingIndicator><Spinner /></LoadingIndicator>}
      
      {error && (
        <>
          <ErrorMessage>{error}</ErrorMessage>
          <ResetButton onClick={handleReset}>Try Again</ResetButton>
        </>
      )}
      
      {hasResults && !loading && !error && (
        <>
          <PaperTitle file={uploadedFile} /> {/* Include PaperTitle component */}
          <Summarizer summary={summary} />
          
          <FlexRow>
            <Column width={1}> 
              <Keywords keywords={keywords} />
            </Column>
            <Column width={2}>
              {graphUrl && <Graph graphUrl={graphUrl} />}
            </Column>
          </FlexRow>
          
          <Citations file={uploadedFile} /> {/* Include Citations component */}
          <ResetButton onClick={handleReset}>Analyze Another Document</ResetButton>
        </>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;