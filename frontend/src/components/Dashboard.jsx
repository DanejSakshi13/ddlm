

// import React, { useState, useEffect } from "react";
// import styled, { keyframes } from "styled-components"; // Ensure keyframes is imported
// import UploadButton from "./UploadButton";
// import Summarizer from "./Summarizer";
// import Keywords from "./Keywords";
// import Graph from "./Graph";
// import Features from "./Features";
// import PaperTitle from "./PaperTitle";
// import Citations from "./Citations";

// // Define the spinning animation
// const spin = keyframes`
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// `;

// const FlexRow = styled.div`
//   display: flex;
//   margin-top: 20px;
// `;

// const Column = styled.div`
//   flex: ${(props) => props.width || 1};
//   display: flex;
//   flex-direction: column;
// `;

// const DashboardContainer = styled.div`
//   max-width: 900px;
//   margin-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '100px' : '100px')};
//   padding: 20px;
// `;

// const LoadingIndicator = styled.div`
//   text-align: center;
//   margin: 20px 0;
//   color: #666;
//   position: relative;
// `;

// const Spinner = styled.div`
//   border: 8px solid rgba(255, 255, 255, 0.3);
//   border-top: 8px solid #D2FF72;
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   margin: 0 auto;
//   margin-top: 200px;
//   margin-left: 400px;
//   animation: ${spin} 1s linear infinite; // Apply the spin animation
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

// const ChatSection = styled.div`
//   margin-top: 20px;
//   padding: 10px;
//   background: #f0f0f0;
//   border-radius: 8px;
// `;

// const ChatInput = styled.input`
//   width: 70%;
//   padding: 8px;
//   margin-right: 10px;
// `;

// const ChatButton = styled.button`
//   padding: 8px 16px;
//   background-color: #D2FF72;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// `;

// const ChatHistory = styled.div`
//   max-height: 200px;
//   overflow-y: auto;
//   margin-top: 10px;
// `;

// const API_BASE_URL = 'http://127.0.0.1:5000';

// const Dashboard = ({ isSidebarOpen }) => {
//   const [summary, setSummary] = useState("");
//   const [keywords, setKeywords] = useState([]);
//   const [graphUrl, setGraphUrl] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [chatMessage, setChatMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [userData, setUserData] = useState({ pdfs: [], chat_history: [], analysis: [] });

//   const email = JSON.parse(localStorage.getItem("user"))?.email;

//   useEffect(() => {
//     if (email) fetchUserData();
//   }, [email]);

//   const fetchUserData = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/user-data?email=${email}`);
//       const data = await response.json();
//       setUserData(data);
//       setChatHistory(data.chat_history);
//     } catch (err) {
//       console.error("Error fetching user data:", err);
//     }
//   };

//   const handleUpload = async (file) => {
//     if (!file || !email) return;

//     setUploadedFile(file);
//     setLoading(true);
//     setError("");
//     setSummary("");
//     setKeywords([]);
//     setGraphUrl("");

//     try {
//       const pdfId = Date.now().toString();
//       const pdfData = { _id: pdfId, filename: file.name, uploadDate: new Date().toISOString() };

//       const summaryFormData = new FormData();
//       summaryFormData.append("file", file);
//       summaryFormData.append("word_limit", 150);
//       summaryFormData.append("email", email);
//       const summaryResponse = await fetch(`${API_BASE_URL}/api/summarize-pdf`, {
//         method: "POST",
//         body: summaryFormData,
//       });
//       const summaryData = await summaryResponse.json();
//       setSummary(summaryData.summary);

//       const keywordFormData = new FormData();
//       keywordFormData.append("pdf", file);
//       keywordFormData.append("email", email);
//       const keywordResponse = await fetch(`${API_BASE_URL}/api/keywords/`, {
//         method: "POST",
//         body: keywordFormData,
//       });
//       const keywordData = await keywordResponse.json();
//       setKeywords(keywordData.keywords);

//       const tableFormData = new FormData();
//       tableFormData.append("pdf", file);
//       const tableResponse = await fetch(`${API_BASE_URL}/api/table-extract`, {
//         method: "POST",
//         body: tableFormData,
//       });
//       let graphUrl = "";
//       if (tableResponse.ok) {
//         if (tableResponse.headers.get("content-type").includes("image")) {
//           const blob = await tableResponse.blob();
//           graphUrl = URL.createObjectURL(blob);
//         } else {
//           const tableData = await tableResponse.json();
//           if (tableData.message === "No numeric data available for visualization") {
//             graphUrl = "no-data";
//           }
//         }
//       }
//       setGraphUrl(graphUrl);

//       const analysis = { pdf_id: pdfId, summary: summaryData.summary, keywords: keywordData.keywords };
//       await fetch(`${API_BASE_URL}/api/user-data`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, pdf_data: pdfData, analysis }),
//       });

//       fetchUserData();
//     } catch (error) {
//       setError(`Unable to process the document. ${error.message || "Please try again."}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChat = async () => {
//     if (!uploadedFile || !email) return;

//     try {
//       const analysisData = {
//         pdf_id: Date.now().toString(), // Example ID; use your logic
//         filename: uploadedFile.name,
//         title: "Extracted Title", // Replace with title_extractor result
//         authors: ["Author 1"], // From title_extractor or citation_extractor
//         citations: ["Cite 1"], // From citation_extractor
//         citation_count: 10, // Example; calculate if possible
//         recommendations: ["Paper A"], // From recommendation_bp
//         summary: summary, // From summarizer_bp
//         keywords: keywords, // From keywords_bp
//         graphs: graphUrl ? [graphUrl] : [], // From table_extractor_bp
//         tables: [] // From table_extractor_bp
//       };

//       const response = await fetch(`${API_BASE_URL}/api/paper-analysis`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, analysis_data: analysisData })
//       });
//       if (!response.ok) throw new Error("Failed to save analysis");
//       const data = await response.json();
//       setChatHistory([...chatHistory, analysisData]); // Update local state if needed
//       setChatMessage("");
//     } catch (error) {
//       console.error("Error saving analysis:", error);
//       setError("Failed to save analysis");
//     }
//   };

//   const handleReset = () => {
//     setSummary("");
//     setKeywords([]);
//     setGraphUrl(null);
//     setError("");
//     setUploadedFile(null);
//     setChatMessage("");
//   };

//   const hasResults = summary || keywords.length > 0 || graphUrl;

//   return (
//     <DashboardContainer $isSidebarOpen={isSidebarOpen}>
//       {!hasResults && !loading && <UploadButton onUploadComplete={handleUpload} />}
//       {!hasResults && !loading && <Features />}
//       {loading && (
//         <LoadingIndicator>
//           <Spinner />
//           {/* <p>Finding your research location...</p> */}
//         </LoadingIndicator>
//       )}
//       {error && (
//         <>
//           <ErrorMessage>{error}</ErrorMessage>
//           <ResetButton onClick={handleReset}>Try Again</ResetButton>
//         </>
//       )}
//       {hasResults && !loading && !error && (
//         <>
//           <PaperTitle file={uploadedFile} />
//           <Summarizer summary={summary} />
//           <FlexRow>
//             <Column width={1}>
//               <Keywords keywords={keywords} />
//             </Column>
//             <Column width={2}>
//               {graphUrl && <Graph graphUrl={graphUrl} />}
//             </Column>
//           </FlexRow>
//           <Citations file={uploadedFile} />
//           <ChatSection>
//             <h3>Chat about this Paper</h3>
//             <ChatInput
//               value={chatMessage}
//               onChange={(e) => setChatMessage(e.target.value)}
//               placeholder="Ask a question about the paper"
//             />
//             <ChatButton onClick={handleChat}>Send</ChatButton>
//             <ChatHistory>
//               {chatHistory
//                 .filter(ch => ch.pdf_id === userData.pdfs.find(p => p.filename === uploadedFile?.name)?._id)
//                 .map((chat, i) => (
//                   <div key={i}>
//                     <p><strong>You:</strong> {chat.message}</p>
//                     <p><strong>LLM:</strong> {chat.response}</p>
//                   </div>
//                 ))}
//             </ChatHistory>
//           </ChatSection>
//           <ResetButton onClick={handleReset}>Analyze Another Document</ResetButton>
//         </>
//       )}
//     </DashboardContainer>
//   );
// };

// export default Dashboard;










/* 
last best working till 27/3/25
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import UploadButton from "./UploadButton";
import Summarizer from "./Summarizer";
import Keywords from "./Keywords";
import Graph from "./Graph";
import Features from "./Features";
import PaperTitle from "./PaperTitle";
import Citations from "./Citations";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const FlexRow = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Column = styled.div`
  flex: ${(props) => props.width || 1};
  display: flex;
  flex-direction: column;
`;

const DashboardContainer = styled.div`
  max-width: 900px;
  margin-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "100px" : "100px")};
  padding: 20px;
`;

const LoadingIndicator = styled.div`
  text-align: center;
  margin: 20px 0;
  color: #666;
`;

const Spinner = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-top: 8px solid #d2ff72;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 200px auto 0 400px;
  animation: ${spin} 1s linear infinite;
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

const ChatSection = styled.div`
  margin-top: 20px;
  padding: 10px;
  background: #f0f0f0;
  border-radius: 8px;
`;

const ChatInput = styled.input`
  width: 70%;
  padding: 8px;
  margin-right: 10px;
`;

const ChatButton = styled.button`
  padding: 8px 16px;
  background-color: #d2ff72;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ChatHistory = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-top: 10px;
`;

const API_BASE_URL = "http://127.0.0.1:5000";

const Dashboard = ({ isSidebarOpen, selectedAnalysis }) => {
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [graphUrl, setGraphUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [citations, setCitations] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [userData, setUserData] = useState({
    pdfs: [],
    recent_analysis: null,
    analysis: [],
  });

  const email = JSON.parse(localStorage.getItem("user"))?.email;

  useEffect(() => {
    if (email) {
      console.log("Fetching user data for email:", email);
      fetchUserData();
    } else {
      console.warn("No email found in localStorage");
    }
  }, [email]);

  useEffect(() => {
    if (selectedAnalysis) {
      console.log("Displaying selected analysis:", selectedAnalysis);
      setTitle(selectedAnalysis.title || "Untitled");
      setSummary(selectedAnalysis.summary || "");
      setKeywords(selectedAnalysis.keywords || []);
      setGraphUrl(selectedAnalysis.graphs?.[0] || null);
      setCitations(selectedAnalysis.citations || []);
      setRecommendations(selectedAnalysis.recommendations || []);
      setChatHistory(selectedAnalysis.chat || []);
      setError("");
      setLoading(false);
      setUploadedFile(null);
    }
  }, [selectedAnalysis]);

  const fetchUserData = async () => {
    try {
      const url = `${API_BASE_URL}/api/user-data?email=${encodeURIComponent(email)}`;
      console.log("Fetching from URL:", url);
      const response = await fetch(url, {
        credentials: "include",
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      console.log("User data fetched:", data);
      setUserData(data);
      setChatHistory(data.recent_analysis?.chat || []);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Couldn’t connect to the server. Please try again later.");
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile || !email) {
      setError("Please upload a file and ensure you're logged in.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");
    setKeywords([]);
    setGraphUrl(null);
    setTitle("");
    setCitations([]);
    setRecommendations([]);
    setChatHistory([]);

    try {
      const pdfId = Date.now().toString();

      console.log("Fetching summary...");
      const summaryFormData = new FormData();
      summaryFormData.append("file", uploadedFile);
      summaryFormData.append("word_limit", 150);
      summaryFormData.append("email", email);
      const summaryResponse = await fetch(`${API_BASE_URL}/api/summarize-pdf`, {
        method: "POST",
        body: summaryFormData,
        credentials: "include",
      });
      if (!summaryResponse.ok) {
        const errorText = await summaryResponse.text();
        throw new Error(`Failed to fetch summary: ${summaryResponse.status} - ${errorText}`);
      }
      const summaryData = await summaryResponse.json();
      console.log("Summary fetched:", summaryData);
      setSummary(summaryData.summary);

      console.log("Fetching keywords...");
      const keywordFormData = new FormData();
      keywordFormData.append("pdf", uploadedFile);
      keywordFormData.append("email", email);
      const keywordResponse = await fetch(`${API_BASE_URL}/api/keywords/`, {
        method: "POST",
        body: keywordFormData,
        credentials: "include",
      });
      if (!keywordResponse.ok) {
        const errorText = await keywordResponse.text();
        throw new Error(`Failed to fetch keywords: ${keywordResponse.status} - ${errorText}`);
      }
      const keywordData = await keywordResponse.json();
      console.log("Keywords fetched:", keywordData);
      setKeywords(keywordData.keywords);

      console.log("Fetching graphs...");
      const tableFormData = new FormData();
      tableFormData.append("pdf", uploadedFile);
      const tableResponse = await fetch(`${API_BASE_URL}/api/table-extract`, {
        method: "POST",
        body: tableFormData,
        credentials: "include",
      });
      let graphUrl = "";
      if (tableResponse.ok) {
        if (tableResponse.headers.get("content-type")?.includes("image")) {
          const blob = await tableResponse.blob();
          graphUrl = URL.createObjectURL(blob);
        } else {
          const tableData = await tableResponse.json();
          if (tableData.message === "No numeric data available for visualization") {
            graphUrl = "no-data";
          }
        }
      } else {
        console.warn(`Graph fetch failed but continuing: ${tableResponse.status}`);
      }
      console.log("Graph URL set:", graphUrl);
      setGraphUrl(graphUrl);

      console.log("Fetching title...");
      const titleFormData = new FormData();
      titleFormData.append("file", uploadedFile);
      let extractedTitle = "Untitled"; // Default value
      try {
        console.log("Sending title request to:", `${API_BASE_URL}/api/extract-title`);
        const titleResponse = await fetch(`${API_BASE_URL}/api/extract-title`, {
          method: "POST",
          body: titleFormData,
          credentials: "include",
        });
        if (!titleResponse.ok) {
          const errorData = await titleResponse.json();
          console.error("Title response error:", errorData);
          throw new Error(`Failed to fetch title: ${titleResponse.status} - ${errorData.error || "Unknown error"}`);
        }
        const titleData = await titleResponse.json();
        console.log("🛠 Full title response:", titleData);
        extractedTitle = titleData.title && titleData.title !== "Title not found" && titleData.title.trim()
          ? titleData.title
          : "Untitled";
        console.log("📌 Extracted Title from Backend:", extractedTitle);
        setTitle(extractedTitle);
      } catch (titleError) {
        console.warn("Title fetch failed with:", titleError.message);
        console.log("Request details:", { url: `${API_BASE_URL}/api/extract-title`, method: "POST", credentials: "include" });
        setTitle(extractedTitle);
      }

      console.log("Fetching citations...");
      const citationFormData = new FormData();
      citationFormData.append("file", uploadedFile);
      let fetchedCitations = [];
      try {
        console.log("Sending citation request to:", `${API_BASE_URL}/api/extract-citations`);
        const citationResponse = await fetch(`${API_BASE_URL}/api/extract-citations`, {
          method: "POST",
          body: citationFormData,
          credentials: "include",
        });
        if (!citationResponse.ok) {
          const errorData = await citationResponse.text(); // Use text() to see raw response
          console.error("Citation response error:", errorData);
          throw new Error(`Failed to fetch citations: ${citationResponse.status} - ${errorData}`);
        }
        const citationData = await citationResponse.json();
        console.log("Citations fetched:", citationData);
        fetchedCitations = citationData.citations || [];
        setCitations(fetchedCitations);
      } catch (citationError) {
        console.warn("Citations fetch failed, continuing:", citationError);
        setCitations(fetchedCitations);
      }

      console.log("Setting recommendations (empty)...");
      setRecommendations([]);

      console.log("Preparing analysis data...");
      const analysisData = {
        pdf_id: pdfId,
        filename: uploadedFile.name,
        title: extractedTitle, // Use fetched title directly
        summary: summaryData.summary || "Summary pending",
        keywords: keywordData.keywords || [],
        graphs: graphUrl && graphUrl !== "no-data" ? [graphUrl] : [],
        citations: fetchedCitations,
        recommendations: [],
        chat: [],
      };
      console.log("Analysis data prepared:", analysisData);

      console.log("Saving analysis...");
      console.log("🛠 Sending analysis to backend:", { email, analysis_data: analysisData });

      const response = await fetch(`${API_BASE_URL}/api/paper-analysis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, analysis_data: analysisData }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to save analysis:", errorData);
        throw new Error(`Failed to save analysis: ${response.status} - ${errorData.error || "Unknown error"}`);
      }
      console.log("Analysis saved successfully");

      setChatHistory(analysisData.chat);
      setUploadedFile(null);
      window.dispatchEvent(new Event("analysisUpdated"));
    } catch (error) {
      console.error("Error in handleUpload:", error);
      setError(error.message || "Failed to process the file.");
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async () => {
    if (!uploadedFile || !email || !chatMessage) {
      setError("Upload a file, log in, and enter a message to chat.");
      return;
    }

    try {
      const analysisData = {
        pdf_id: Date.now().toString(),
        filename: uploadedFile.name,
        title: title || "Untitled",
        summary: summary,
        keywords: keywords,
        graphs: graphUrl && graphUrl !== "no-data" ? [graphUrl] : [],
        citations: citations,
        recommendations: recommendations,
        chat: [...chatHistory, { message: chatMessage, response: "Placeholder LLM response" }],
      };

      console.log("🛠 Sending chat analysis to backend:", { email, analysis_data: analysisData });

      const response = await fetch(`${API_BASE_URL}/api/paper-analysis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, analysis_data: analysisData }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to save chat analysis: ${response.status} - ${errorData.error || "Unknown error"}`);
      }

      setChatHistory(analysisData.chat);
      setChatMessage("");
      window.dispatchEvent(new Event("analysisUpdated"));
    } catch (error) {
      console.error("Error in handleChat:", error);
      setError("Failed to save chat analysis");
    }
  };

  const handleReset = () => {
    setSummary("");
    setKeywords([]);
    setGraphUrl(null);
    setTitle("");
    setCitations([]);
    setRecommendations([]);
    setError("");
    setUploadedFile(null);
    setChatMessage("");
    setChatHistory([]);
  };

  const hasResults =
    summary ||
    keywords.length > 0 ||
    graphUrl ||
    title ||
    citations.length > 0 ||
    recommendations.length > 0 ||
    chatHistory.length > 0;

  console.log("State before render:", { summary, keywords, graphUrl, title, citations, loading, error, hasResults });

  try {
    console.log("Rendering Dashboard");
    return (
      <DashboardContainer $isSidebarOpen={isSidebarOpen}>
        {!hasResults && !loading && (
          <>
            <UploadButton setUploadedFile={setUploadedFile} handleUpload={handleUpload} />
            <Features />
          </>
        )}
        {loading && (
          <LoadingIndicator>
            <Spinner />
          </LoadingIndicator>
        )}
        {error && (
          <>
            <ErrorMessage>{error}</ErrorMessage>
            <ResetButton onClick={handleReset}>Try Again</ResetButton>
          </>
        )}
        {hasResults && !loading && !error && (
          <>
            <PaperTitle title={title} />
            <Summarizer summary={summary} />
            <FlexRow>
              <Column width={1}>
                <Keywords keywords={keywords} />
              </Column>
              <Column width={2}>
                {graphUrl && graphUrl !== "no-data" && <Graph graphUrl={graphUrl} />}
              </Column>
            </FlexRow>
            <Citations citations={citations} />
            <ChatSection>
              <h3>Chat about this Paper</h3>
              <ChatInput
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask a question about the paper"
              />
              <ChatButton onClick={handleChat}>Send</ChatButton>
              <ChatHistory>
                {chatHistory.length > 0 ? (
                  chatHistory.map((chat, i) => (
                    <div key={i}>
                      {chat.message && <p><strong>You:</strong> {chat.message}</p>}
                      {chat.response && <p><strong>LLM:</strong> {chat.response}</p>}
                    </div>
                  ))
                ) : (
                  <p>No chat history yet</p>
                )}
              </ChatHistory>
            </ChatSection>
            <ResetButton onClick={handleReset}>Analyze Another Document</ResetButton>
          </>
        )}
      </DashboardContainer>
    );
  } catch (renderError) {
    console.error("Render error in Dashboard:", renderError);
    throw renderError; // Let ErrorBoundary catch it
  }
};

export default Dashboard; */






















/* 29/3/25 - working ode beofre integratin the images extracter */
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import UploadButton from "./UploadButton";
import Summarizer from "./Summarizer";
import Keywords from "./Keywords";
import Graph from "./Graph";
import Features from "./Features";
import PaperTitle from "./PaperTitle";
import Citations from "./Citations";
import Recommendations from "./Recommendations";


const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const FlexRow = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Column = styled.div`
  flex: ${(props) => props.width || 1};
  display: flex;
  flex-direction: column;
`;

const DashboardContainer = styled.div`
  max-width: 900px;
  margin-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "100px" : "100px")};
  padding: 20px;
`;

const LoadingIndicator = styled.div`
  text-align: center;
  margin: 20px 0;
  color: #666;
`;

const Spinner = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-top: 8px solid #d2ff72;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 200px auto 0 400px;
  animation: ${spin} 1s linear infinite;
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

const ChatSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #f0f0f0;
  border-radius: 8px;
`;

const ChatInput = styled.input`
  width: 70%;
  padding: 8px;
  margin-right: 10px;
`;

const ChatButton = styled.button`
  padding: 8px 16px;
  background-color: #d2ff72;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ChatHistory = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-top: 10px;
`;

const API_BASE_URL = "http://127.0.0.1:5000";

const Dashboard = ({ isSidebarOpen, selectedAnalysis }) => {
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [graphUrl, setGraphUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [citations, setCitations] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [userData, setUserData] = useState({
    pdfs: [],
    recent_analysis: null,
    analysis: [],
  });

  const email = JSON.parse(localStorage.getItem("user"))?.email;

  useEffect(() => {
    if (email) {
      console.log("Fetching user data for email:", email);
      fetchUserData();
    } else {
      console.warn("No email found in localStorage");
    }
  }, [email]);

  useEffect(() => {
    if (selectedAnalysis) {
      console.log("Displaying selected analysis:", selectedAnalysis);
      setTitle(selectedAnalysis.title || "Untitled");
      setSummary(selectedAnalysis.summary || "");
      setKeywords(selectedAnalysis.keywords || []);
      setGraphUrl(selectedAnalysis.graphs?.[0] || null);
      setCitations(selectedAnalysis.citations || []);
      setRecommendations(selectedAnalysis.recommendations || []);
      setChatHistory(selectedAnalysis.chat || []);
      setError("");
      setLoading(false);
      setUploadedFile(null);
    }
  }, [selectedAnalysis]);

  const fetchUserData = async () => {
    try {
      const url = `${API_BASE_URL}/api/user-data?email=${encodeURIComponent(email)}`;
      console.log("Fetching from URL:", url);
      const response = await fetch(url, { credentials: "include" });
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      console.log("User data fetched:", data);
      setUserData(data);
      setChatHistory(data.recent_analysis?.chat || []);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Couldn’t connect to the server. Please try again later.");
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile || !email) {
      setError("Please upload a file and ensure you're logged in.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");
    setKeywords([]);
    setGraphUrl(null);
    setTitle("");
    setCitations([]);
    setRecommendations([]);
    setChatHistory([]);

    try {
      const pdfId = Date.now().toString();

      const summaryFormData = new FormData();
      summaryFormData.append("file", uploadedFile);
      summaryFormData.append("word_limit", 150);
      summaryFormData.append("email", email);
      const summaryResponse = await fetch(`${API_BASE_URL}/api/summarize-pdf`, {
        method: "POST",
        body: summaryFormData,
        credentials: "include",
      });
      if (!summaryResponse.ok) throw new Error(`Failed to fetch summary: ${summaryResponse.status}`);
      const summaryData = await summaryResponse.json();
      setSummary(summaryData.summary);

      const keywordFormData = new FormData();
      keywordFormData.append("pdf", uploadedFile);
      keywordFormData.append("email", email);
      const keywordResponse = await fetch(`${API_BASE_URL}/api/keywords/`, {
        method: "POST",
        body: keywordFormData,
        credentials: "include",
      });
      if (!keywordResponse.ok) throw new Error(`Failed to fetch keywords: ${keywordResponse.status}`);
      const keywordData = await keywordResponse.json();
      setKeywords(keywordData.keywords);

      const tableFormData = new FormData();
      tableFormData.append("pdf", uploadedFile);
      const tableResponse = await fetch(`${API_BASE_URL}/api/table-extract`, {
        method: "POST",
        body: tableFormData,
        credentials: "include",
      });
      let graphUrl = "";
      if (tableResponse.ok) {
        if (tableResponse.headers.get("content-type")?.includes("image")) {
          const blob = await tableResponse.blob();
          graphUrl = URL.createObjectURL(blob);
        } else {
          const tableData = await tableResponse.json();
          if (tableData.message === "No numeric data available for visualization") graphUrl = "no-data";
        }
      }
      setGraphUrl(graphUrl);

      const titleFormData = new FormData();
      titleFormData.append("file", uploadedFile);
      const titleResponse = await fetch(`${API_BASE_URL}/api/extract-title`, {
        method: "POST",
        body: titleFormData,
        credentials: "include",
      });
      const titleData = await titleResponse.json();
      const extractedTitle = titleData.title && titleData.title !== "Title not found" && titleData.title.trim()
        ? titleData.title
        : "Untitled";
      setTitle(extractedTitle);

      const citationFormData = new FormData();
      citationFormData.append("file", uploadedFile);
      const citationResponse = await fetch(`${API_BASE_URL}/api/extract-citations`, {
        method: "POST",
        body: citationFormData,
        credentials: "include",
      });
      const citationData = await citationResponse.json();
      setCitations(citationData.citations || []);

      setRecommendations([]);

      const analysisData = {
        pdf_id: pdfId,
        filename: uploadedFile.name,
        title: extractedTitle,
        summary: summaryData.summary || "Summary pending",
        keywords: keywordData.keywords || [],
        graphs: graphUrl && graphUrl !== "no-data" ? [graphUrl] : [],
        citations: citationData.citations || [],
        recommendations: [],
        chat: [],
      };

      const response = await fetch(`${API_BASE_URL}/api/paper-analysis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, analysis_data: analysisData }),
        credentials: "include",
      });
      if (!response.ok) throw new Error(`Failed to save analysis: ${response.status}`);

      setChatHistory(analysisData.chat);
      setUploadedFile(null);
      window.dispatchEvent(new Event("analysisUpdated"));
    } catch (error) {
      console.error("Error in handleUpload:", error);
      setError(error.message || "Failed to process the file.");
    } finally {
      setLoading(false);
    }
  };

  // ... (rest of Dashboard.js remains unchanged until handleChat)

const handleChat = async () => {
  if (!email || !chatMessage) {
    setError("Log in and enter a message to chat.");
    return;
  }

  try {
    const queryResponse = await fetch(`${API_BASE_URL}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, query: chatMessage }),
      credentials: "include",
    });

    if (!queryResponse.ok) {
      const errorData = await queryResponse.json();
      throw new Error(`Failed to fetch query response: ${queryResponse.status} - ${errorData.error || "Unknown error"}`);
    }

    const queryData = await queryResponse.json();
    const responseText = queryData.response;

    const updatedChat = [...chatHistory, { message: chatMessage, response: responseText }];
    const currentAnalysis = selectedAnalysis || userData.recent_analysis || {};
  const analysisId = currentAnalysis._id || Date.now().toString();

    const analysisData = {
    pdf_id: analysisId, // Still needed for save_paper_analysis compatibility
    filename: uploadedFile?.name || currentAnalysis.filename || "Recent PDF",
    title: title || currentAnalysis.title || "Untitled",
    summary: summary || currentAnalysis.summary || "",
    keywords: keywords.length ? keywords : currentAnalysis.keywords || [],
    graphs: graphUrl && graphUrl !== "no-data" ? [graphUrl] : currentAnalysis.graphs || [],
    citations: citations.length ? citations : currentAnalysis.citations || [],
    recommendations: recommendations.length ? recommendations : currentAnalysis.recommendations || [],
    chat: updatedChat,
  };
    const saveResponse = await fetch(`${API_BASE_URL}/api/paper-analysis`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, analysis_data: analysisData }),
      credentials: "include",
    });

    if (!saveResponse.ok) {
      const errorData = await saveResponse.json();
      throw new Error(`Failed to save chat analysis: ${saveResponse.status} - ${errorData.error || "Unknown error"}`);
    }

    setChatHistory(updatedChat);
  setChatMessage("");
  window.dispatchEvent(new CustomEvent("analysisUpdated", { detail: { analysis_id: analysisId } }));
  } catch (error) {
    console.error("Error in handleChat:", error);
    setError(error.message || "Failed to process chat query.");
  }
};

// ... (rest of Dashboard.js remains unchanged)

  const handleReset = () => {
    setSummary("");
    setKeywords([]);
    setGraphUrl(null);
    setTitle("");
    setCitations([]);
    setRecommendations([]);
    setError("");
    setUploadedFile(null);
    setChatMessage("");
    setChatHistory([]);
  };

  const hasResults =
    summary ||
    keywords.length > 0 ||
    graphUrl ||
    title ||
    citations.length > 0 ||
    recommendations.length > 0 ||
    chatHistory.length > 0;

  return (
    <DashboardContainer $isSidebarOpen={isSidebarOpen}>
      {!hasResults && !loading && (
        <>
          <UploadButton setUploadedFile={setUploadedFile} handleUpload={handleUpload} />
          <Features />
        </>
      )}
      {loading && (
        <LoadingIndicator>
          <Spinner />
        </LoadingIndicator>
      )}
      {error && (
        <>
          <ErrorMessage>{error}</ErrorMessage>
          <ResetButton onClick={handleReset}>Try Again</ResetButton>
        </>
      )}
      {hasResults && !loading && !error && (
        <>
          <PaperTitle title={title} />
          <Summarizer summary={summary} />
          <FlexRow>
            <Column width={1}>
              <Keywords keywords={keywords} />
                      

            </Column>
            <Column width={2}>
              {graphUrl && graphUrl !== "no-data" && <Graph graphUrl={graphUrl} />}
            </Column>
          </FlexRow>
          <Recommendations keywords={keywords} />
          <Citations citations={citations} />
          <ChatSection>
            <h3>Chat about this Paper</h3>
            <ChatInput
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Ask a question about the paper"
            />
            <ChatButton onClick={handleChat}>Send</ChatButton>
            <ChatHistory>
              {chatHistory.length > 0 ? (
                chatHistory.map((chat, i) => (
                  <div key={i}>
                    {chat.message && <p><strong>You:</strong> {chat.message}</p>}
                    {chat.response && <p><strong>LLM:</strong> {chat.response}</p>}
                  </div>
                ))
              ) : (
                <p>No chat history yet</p>
              )}
            </ChatHistory>
          </ChatSection>
          <ResetButton onClick={handleReset}>Analyze Another Document</ResetButton>
        </>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
 




























































































































































































/* dashbord with removed api calls , separate api calls  */
/* import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import UploadButton from "./UploadButton";
import Summarizer from "./Summarizer";
import Keywords from "./Keywords";
import Graph from "./Graph";
import Features from "./Features";
import PaperTitle from "./PaperTitle";
import Citations from "./Citations";
import FiguresExtracted from "./FiguresExtracted";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const FlexRow = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Column = styled.div`
  flex: ${(props) => props.width || 1};
  display: flex;
  flex-direction: column;
`;

const DashboardContainer = styled.div`
  max-width: 900px;
  margin-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "100px" : "100px")};
  padding: 20px;
`;

const LoadingIndicator = styled.div`
  text-align: center;
  margin: 20px 0;
  color: #666;
`;

const Spinner = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-top: 8px solid #d2ff72;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 200px auto 0 400px;
  animation: ${spin} 1s linear infinite;
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

const ChatSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #f0f0f0;
  border-radius: 8px;
`;

const ChatInput = styled.input`
  width: 70%;
  padding: 8px;
  margin-right: 10px;
`;

const ChatButton = styled.button`
  padding: 8px 16px;
  background-color: #d2ff72;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ChatHistory = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-top: 10px;
`;

const API_BASE_URL = "http://127.0.0.1:5000";

const Dashboard = ({ isSidebarOpen, selectedAnalysis }) => {
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [graphUrl, setGraphUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [citations, setCitations] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [userData, setUserData] = useState({
    pdfs: [],
    recent_analysis: null,
    analysis: [],
  });

  const email = JSON.parse(localStorage.getItem("user"))?.email;

  useEffect(() => {
    if (email) {
      fetchUserData();
    }
  }, [email]);
  useEffect(() => {
    if (selectedAnalysis) {
      console.log("Updating state with selectedAnalysis:", selectedAnalysis); // Add this line
      setTitle(selectedAnalysis.title || "Untitled");
      setSummary(selectedAnalysis.summary || "");
      setKeywords(selectedAnalysis.keywords || []);
      setGraphUrl(selectedAnalysis.graphs?.[0] || null);
      setCitations(selectedAnalysis.citations || []);
      setImages(selectedAnalysis.images || []);
      setChatHistory(selectedAnalysis.chat || []);
      setError("");
      setLoading(false);
      setUploadedFile(null);
      console.log("State after update - title:", selectedAnalysis.title, "summary:", selectedAnalysis.summary);
    }
  }, [selectedAnalysis]);

  const fetchUserData = async () => {
    try {
      const url = `${API_BASE_URL}/api/user-data?email=${encodeURIComponent(email)}`;
      const response = await fetch(url, { credentials: "include" });
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      setUserData(data);
      if (!selectedAnalysis) {
        setChatHistory(data.recent_analysis?.chat || []);
        setImages(data.recent_analysis?.images || []);
      }
    } catch (err) {
      setError("Couldn’t connect to the server. Please try again later.");
    }
  };

  const handleSaveAnalysis = async () => {
    if (!uploadedFile || !email) {
      setError("Please upload a file and ensure you're logged in.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const analysisData = {
        pdf_id: Date.now().toString(),
        filename: uploadedFile.name,
        title: title || "Untitled",
        summary: summary || "Summary pending",
        keywords: keywords || [],
        graphs: graphUrl && graphUrl !== "no-data" ? [graphUrl] : [],
        citations: citations || [],
        images: images || [],
        chat: chatHistory || [],
      };

      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("email", email);
      formData.append("analysis_data", JSON.stringify(analysisData));

      const response = await fetch(`${API_BASE_URL}/api/paper-analysis`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save analysis: ${response.status} - ${errorText}`);
      }
      setUploadedFile(null);
      window.dispatchEvent(new Event("analysisUpdated"));
    } catch (err) {
      console.error("Error saving analysis:", err);
      setError(err.message || "Failed to save analysis.");
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async () => {
    if (!email || !chatMessage) {
      setError("Log in and enter a message to chat.");
      return;
    }

    try {
      const queryResponse = await fetch(`${API_BASE_URL}/api/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, query: chatMessage }),
        credentials: "include",
      });
      if (!queryResponse.ok) throw new Error(`Failed to fetch query response: ${queryResponse.status}`);
      const queryData = await queryResponse.json();
      const responseText = queryData.response;

      const updatedChat = [...chatHistory, { message: chatMessage, response: responseText }];
      const analysisId = Date.now().toString();

      const analysisData = {
        pdf_id: analysisId,
        filename: uploadedFile?.name || selectedAnalysis?.filename || "Recent PDF",
        title: title || "Untitled",
        summary: summary || "",
        keywords: keywords || [],
        graphs: graphUrl && graphUrl !== "no-data" ? [graphUrl] : [],
        citations: citations || [],
        images: images || [],
        chat: updatedChat,
      };

      const saveResponse = await fetch(`${API_BASE_URL}/api/paper-analysis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, analysis_data: analysisData }),
        credentials: "include",
      });
      if (!saveResponse.ok) throw new Error(`Failed to save chat analysis: ${saveResponse.status}`);

      setChatHistory(updatedChat);
      setChatMessage("");
      window.dispatchEvent(new CustomEvent("analysisUpdated", { detail: { analysis_id: analysisId } }));
    } catch (error) {
      console.error("Error in handleChat:", error);
      setError(error.message || "Failed to process chat query.");
    }
  };

  const handleReset = () => {
    setSummary("");
    setKeywords([]);
    setGraphUrl(null);
    setTitle("");
    setCitations([]);
    setImages([]);
    setError("");
    setUploadedFile(null);
    setChatMessage("");
    setChatHistory([]);
  };

  // Ensure hasResults is a boolean
  const hasResults = Boolean(
    summary ||
    keywords.length > 0 ||
    graphUrl ||
    title ||
    citations.length > 0 ||
    images.length > 0 ||
    chatHistory.length > 0 ||
    selectedAnalysis
  );

  console.log("Dashboard render - hasResults:", hasResults, "loading:", loading, "error:", error, "selectedAnalysis:", !!selectedAnalysis);

  return (
    <DashboardContainer $isSidebarOpen={isSidebarOpen}>
      {(!hasResults && !loading && !selectedAnalysis) && (
        <>
          <UploadButton setUploadedFile={setUploadedFile} handleUpload={handleSaveAnalysis} />
          <Features />
        </>
      )}
      {loading && (
        <LoadingIndicator>
          <Spinner />
        </LoadingIndicator>
      )}
      {error && (
        <>
          <ErrorMessage>{error}</ErrorMessage>
          <ResetButton onClick={handleReset}>Try Again</ResetButton>
        </>
      )}
      {(hasResults || selectedAnalysis) && !loading && !error && (
        <>
          <PaperTitle
            file={uploadedFile}
            email={email}
            onTitleFetched={setTitle}
            initialTitle={selectedAnalysis?.title}
          />
          <Summarizer
            file={uploadedFile}
            email={email}
            onSummaryFetched={setSummary}
            initialSummary={selectedAnalysis?.summary}
          />
          <FlexRow>
            <Column width={1}>
              <Keywords
                file={uploadedFile}
                email={email}
                onKeywordsFetched={setKeywords}
                initialKeywords={selectedAnalysis?.keywords}
              />
            </Column>
            <Column width={2}>
              <Graph
                file={uploadedFile}
                email={email}
                onGraphFetched={setGraphUrl}
                initialGraphUrl={selectedAnalysis?.graphs?.[0]}
              />
            </Column>
          </FlexRow>
          <Citations
            file={uploadedFile}
            email={email}
            onCitationsFetched={setCitations}
            initialCitations={selectedAnalysis?.citations}
          />
          <FiguresExtracted
            file={uploadedFile}
            email={email}
            onImagesFetched={setImages}
            initialImages={selectedAnalysis?.images}
          />
          <ChatSection>
            <h3>Chat about this Paper</h3>
            <ChatInput
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Ask a question about the paper"
            />
            <ChatButton onClick={handleChat}>Send</ChatButton>
            <ChatHistory>
              {chatHistory.length > 0 ? (
                chatHistory.map((chat, i) => (
                  <div key={i}>
                    {chat.message && <p><strong>You:</strong> {chat.message}</p>}
                    {chat.response && <p><strong>LLM:</strong> {chat.response}</p>}
                  </div>
                ))
              ) : (
                <p>No chat history yet</p>
              )}
            </ChatHistory>
          </ChatSection>
          <ResetButton onClick={handleReset}>Analyze Another Document</ResetButton>
        </>
      )}
    </DashboardContainer>
  );
};

export default Dashboard; */