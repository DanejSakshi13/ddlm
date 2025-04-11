
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






















/* 3/4/25 - working ode beofre integratin the images extracter */
/* best code */
/* import React, { useState, useEffect } from "react";
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

  const fetchRecommendations = async (keywords) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keywords }),
        credentials: "include",
      });
      if (!response.ok) throw new Error(`Failed to fetch recommendations: ${response.status}`);
      const data = await response.json();
      return data; // Array of recommendations
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      return [];
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


      const recommendationData = await fetchRecommendations(keywordData.keywords);
      setRecommendations(recommendationData);



      const analysisData = {
        pdf_id: pdfId,
        filename: uploadedFile.name,
        title: extractedTitle,
        summary: summaryData.summary || "Summary pending",
        keywords: keywordData.keywords || [],
        graphs: graphUrl && graphUrl !== "no-data" ? [graphUrl] : [],
        citations: citationData.citations || [],
        recommendations: recommendationData,
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
  */






















































































































































































// best ever till 5/4/25

/* 

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
  const [recommendations, setRecommendations] = useState([]);
  const [images, setImages] = useState([]); // Stores images with base64 strings
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
      // Load images from analysis, keeping base64 strings
      setImages(selectedAnalysis.images || []);
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

  const fetchRecommendations = async (keywords) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keywords }),
        credentials: "include",
      });
      if (!response.ok) throw new Error(`Failed to fetch recommendations: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      return [];
    }
  };

  const fetchExtractedImages = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`${API_BASE_URL}/api/extract-images`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to extract images: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      // Return images with base64 strings directly
      return data.images.map((img) => ({
        name: img.name,
        image: img.image, // Keep as base64 string
      }));
    } catch (err) {
      console.error("Error extracting images:", err.message);
      setError(`Image extraction failed: ${err.message}`);
      return [];
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
    setImages([]);
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
      const extractedTitle =
        titleData.title && titleData.title !== "Title not found" && titleData.title.trim()
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

      const imageData = await fetchExtractedImages(uploadedFile); // Fetch images with base64 strings
      setImages(imageData);

      const recommendationData = await fetchRecommendations(keywordData.keywords);
      setRecommendations(recommendationData);

      const analysisData = {
        pdf_id: pdfId,
        filename: uploadedFile.name,
        title: extractedTitle,
        summary: summaryData.summary || "Summary pending",
        keywords: keywordData.keywords || [],
        graphs: graphUrl && graphUrl !== "no-data" ? [graphUrl] : [],
        citations: citationData.citations || [],
        images: imageData, // Store base64 strings
        recommendations: recommendationData,
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
        pdf_id: analysisId,
        filename: uploadedFile?.name || currentAnalysis.filename || "Recent PDF",
        title: title || currentAnalysis.title || "Untitled",
        summary: summary || currentAnalysis.summary || "",
        keywords: keywords.length ? keywords : currentAnalysis.keywords || [],
        graphs: graphUrl && graphUrl !== "no-data" ? [graphUrl] : currentAnalysis.graphs || [],
        citations: citations.length ? citations : currentAnalysis.citations || [],
        images: images.length ? images : currentAnalysis.images || [], // Preserve base64 images
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

  const handleReset = () => {
    setSummary("");
    setKeywords([]);
    setGraphUrl(null);
    setTitle("");
    setCitations([]);
    setRecommendations([]);
    setImages([]);
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
    images.length > 0 ||
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
          <FiguresExtracted images={images} />
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

export default Dashboard; */


















































































































// // perfect wokring 8/4/25 - commented to ttest image retriveal
// import React, { useState, useEffect } from "react";
// import styled, { keyframes } from "styled-components";
// import UploadButton from "./UploadButton";
// import Summarizer from "./Summarizer";
// import Keywords from "./Keywords";
// import Graph from "./Graph";
// import Features from "./Features";
// import PaperTitle from "./PaperTitle";
// import Citations from "./Citations";
// import Recommendations from "./Recommendations";
// import FiguresExtracted from "./FiguresExtracted";
// import DownloadBtn from "./DownloadBtn";


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
//   margin-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "100px" : "100px")};
//   padding: 20px;
// `;

// const LoadingIndicator = styled.div`
//   text-align: center;
//   margin: 20px 0;
//   color: #666;
// `;

// const Spinner = styled.div`
//   border: 8px solid rgba(255, 255, 255, 0.3);
//   border-top: 8px solid #d2ff72;
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   margin: 200px auto 0 400px;
//   animation: ${spin} 1s linear infinite;
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
//   padding: 20px;
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
//   background-color: #d2ff72;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// `;

// const ChatHistory = styled.div`
//   max-height: 200px;
//   overflow-y: auto;
//   margin-top: 10px;
// `;

// const API_BASE_URL = "http://127.0.0.1:5000";

// const Dashboard = ({ isSidebarOpen, selectedAnalysis }) => {
//   const [summary, setSummary] = useState("");
//   const [keywords, setKeywords] = useState([]);
//   const [graphUrl, setGraphUrl] = useState(null);
//   const [title, setTitle] = useState("");
//   const [citations, setCitations] = useState([]);
//   const [recommendations, setRecommendations] = useState([]);
//   const [images, setImages] = useState([]); // Stores images with base64 strings
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [chatMessage, setChatMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [userData, setUserData] = useState({
//     pdfs: [],
//     recent_analysis: null,
//     analysis: [],
//   });

//   const email = JSON.parse(localStorage.getItem("user"))?.email;

//   useEffect(() => {
//     if (email) {
//       console.log("Fetching user data for email:", email);
//       fetchUserData();
//     } else {
//       console.warn("No email found in localStorage");
//     }
//   }, [email]);

//   useEffect(() => {
//     if (selectedAnalysis) {
//       console.log("Displaying selected analysis:", selectedAnalysis);
//       setTitle(selectedAnalysis.title || "Untitled");
//       setSummary(selectedAnalysis.summary || "");
//       setKeywords(selectedAnalysis.keywords || []);
//       setGraphUrl(selectedAnalysis.graphs?.[0] || null);
//       setCitations(selectedAnalysis.citations || []);
//       setRecommendations(selectedAnalysis.recommendations || []);
//       // Load images from analysis, keeping base64 strings
//       setImages(selectedAnalysis.images || []);
//       setChatHistory(selectedAnalysis.chat || []);
//       setError("");
//       setLoading(false);
//       setUploadedFile(null);
//     }
//   }, [selectedAnalysis]);

//   const fetchUserData = async () => {
//     try {
//       const url = `${API_BASE_URL}/api/user-data?email=${encodeURIComponent(email)}`;
//       console.log("Fetching from URL:", url);
//       const response = await fetch(url, { credentials: "include" });
//       if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
//       const data = await response.json();
//       console.log("User data fetched:", data);
//       setUserData(data);
//       setChatHistory(data.recent_analysis?.chat || []);
//     } catch (err) {
//       console.error("Error fetching user data:", err);
//       setError("Couldn’t connect to the server. Please try again later.");
//     }
//   };

//   const fetchRecommendations = async (keywords) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/recommend`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ keywords }),
//         credentials: "include",
//       });
//       if (!response.ok) throw new Error(`Failed to fetch recommendations: ${response.status}`);
//       const data = await response.json();
//       return data;
//     } catch (err) {
//       console.error("Error fetching recommendations:", err);
//       return [];
//     }
//   };

//   const fetchExtractedImages = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/extract-images`, {
//         method: "POST",
//         body: formData,
//       });
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Failed to extract images: ${response.status} - ${errorText}`);
//       }
//       const data = await response.json();
//       if (data.error) throw new Error(data.error);
//       // Return images with base64 strings directly
//       return data.images.map((img) => ({
//         name: img.name,
//         image: img.image, // Keep as base64 string
//       }));
//     } catch (err) {
//       console.error("Error extracting images:", err.message);
//       setError(`Image extraction failed: ${err.message}`);
//       return [];
//     }
//   };

//   const handleUpload = async () => {
//     if (!uploadedFile || !email) {
//       setError("Please upload a file and ensure you're logged in.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setSummary("");
//     setKeywords([]);
//     setGraphUrl(null);
//     setTitle("");
//     setCitations([]);
//     setRecommendations([]);
//     setImages([]);
//     setChatHistory([]);

//     try {
//       const pdfId = Date.now().toString();

//       const summaryFormData = new FormData();
//       summaryFormData.append("file", uploadedFile);
//       summaryFormData.append("word_limit", 150);
//       summaryFormData.append("email", email);
//       const summaryResponse = await fetch(`${API_BASE_URL}/api/summarize-pdf`, {
//         method: "POST",
//         body: summaryFormData,
//         credentials: "include",
//       });
//       if (!summaryResponse.ok) throw new Error(`Failed to fetch summary: ${summaryResponse.status}`);
//       const summaryData = await summaryResponse.json();
//       setSummary(summaryData.summary);

//       const keywordFormData = new FormData();
//       keywordFormData.append("pdf", uploadedFile);
//       keywordFormData.append("email", email);
//       const keywordResponse = await fetch(`${API_BASE_URL}/api/keywords/`, {
//         method: "POST",
//         body: keywordFormData,
//         credentials: "include",
//       });
//       if (!keywordResponse.ok) throw new Error(`Failed to fetch keywords: ${keywordResponse.status}`);
//       const keywordData = await keywordResponse.json();
//       setKeywords(keywordData.keywords);

//       const tableFormData = new FormData();
//       tableFormData.append("pdf", uploadedFile);
//       const tableResponse = await fetch(`${API_BASE_URL}/api/table-extract`, {
//         method: "POST",
//         body: tableFormData,
//         credentials: "include",
//       });
//       let graphUrl = "";
//       if (tableResponse.ok) {
//         if (tableResponse.headers.get("content-type")?.includes("image")) {
//           const blob = await tableResponse.blob();
//           graphUrl = URL.createObjectURL(blob);
//         } else {
//           const tableData = await tableResponse.json();
//           if (tableData.message === "No numeric data available for visualization") graphUrl = "no-data";
//         }
//       }
//       setGraphUrl(graphUrl);

//       const titleFormData = new FormData();
//       titleFormData.append("file", uploadedFile);
//       const titleResponse = await fetch(`${API_BASE_URL}/api/extract-title`, {
//         method: "POST",
//         body: titleFormData,
//         credentials: "include",
//       });
//       const titleData = await titleResponse.json();
//       const extractedTitle =
//         titleData.title && titleData.title !== "Title not found" && titleData.title.trim()
//           ? titleData.title
//           : "Untitled";
//       setTitle(extractedTitle);

//       const citationFormData = new FormData();
//       citationFormData.append("file", uploadedFile);
//       const citationResponse = await fetch(`${API_BASE_URL}/api/extract-citations`, {
//         method: "POST",
//         body: citationFormData,
//         credentials: "include",
//       });
//       const citationData = await citationResponse.json();
//       setCitations(citationData.citations || []);

//       const imageData = await fetchExtractedImages(uploadedFile); // Fetch images with base64 strings
//       setImages(imageData);

//       const recommendationData = await fetchRecommendations(keywordData.keywords);
//       setRecommendations(recommendationData);

//       const analysisData = {
//         pdf_id: pdfId,
//         filename: uploadedFile.name,
//         title: extractedTitle,
//         summary: summaryData.summary || "Summary pending",
//         keywords: keywordData.keywords || [],
//         graphs: graphUrl && graphUrl !== "no-data" ? [graphUrl] : [],
//         citations: citationData.citations || [],
//         images: imageData, // Store base64 strings
//         recommendations: recommendationData,
//         chat: [],
//       };

//       const response = await fetch(`${API_BASE_URL}/api/paper-analysis`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, analysis_data: analysisData }),
//         credentials: "include",
//       });
//       if (!response.ok) throw new Error(`Failed to save analysis: ${response.status}`);

//       setChatHistory(analysisData.chat);
//       setUploadedFile(null);
//       window.dispatchEvent(new Event("analysisUpdated"));
//     } catch (error) {
//       console.error("Error in handleUpload:", error);
//       setError(error.message || "Failed to process the file.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChat = async () => {
//     if (!email || !chatMessage) {
//       setError("Log in and enter a message to chat.");
//       return;
//     }

//     try {
//       const queryResponse = await fetch(`${API_BASE_URL}/api/query`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, query: chatMessage }),
//         credentials: "include",
//       });

//       if (!queryResponse.ok) {
//         const errorData = await queryResponse.json();
//         throw new Error(`Failed to fetch query response: ${queryResponse.status} - ${errorData.error || "Unknown error"}`);
//       }

//       const queryData = await queryResponse.json();
//       const responseText = queryData.response;

//       const updatedChat = [...chatHistory, { message: chatMessage, response: responseText }];
//       const currentAnalysis = selectedAnalysis || userData.recent_analysis || {};
//       const analysisId = currentAnalysis._id || Date.now().toString();

//       const analysisData = {
//         pdf_id: analysisId,
//         filename: uploadedFile?.name || currentAnalysis.filename || "Recent PDF",
//         title: title || currentAnalysis.title || "Untitled",
//         summary: summary || currentAnalysis.summary || "",
//         keywords: keywords.length ? keywords : currentAnalysis.keywords || [],
//         graphs: graphUrl && graphUrl !== "no-data" ? [graphUrl] : currentAnalysis.graphs || [],
//         citations: citations.length ? citations : currentAnalysis.citations || [],
//         images: images.length ? images : currentAnalysis.images || [], // Preserve base64 images
//         recommendations: recommendations.length ? recommendations : currentAnalysis.recommendations || [],
//         chat: updatedChat,
//       };

//       const saveResponse = await fetch(`${API_BASE_URL}/api/paper-analysis`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, analysis_data: analysisData }),
//         credentials: "include",
//       });

//       if (!saveResponse.ok) {
//         const errorData = await saveResponse.json();
//         throw new Error(`Failed to save chat analysis: ${saveResponse.status} - ${errorData.error || "Unknown error"}`);
//       }

//       setChatHistory(updatedChat);
//       setChatMessage("");
//       window.dispatchEvent(new CustomEvent("analysisUpdated", { detail: { analysis_id: analysisId } }));
//     } catch (error) {
//       console.error("Error in handleChat:", error);
//       setError(error.message || "Failed to process chat query.");
//     }
//   };

//   const handleReset = () => {
//     setSummary("");
//     setKeywords([]);
//     setGraphUrl(null);
//     setTitle("");
//     setCitations([]);
//     setRecommendations([]);
//     setImages([]);
//     setError("");
//     setUploadedFile(null);
//     setChatMessage("");
//     setChatHistory([]);
//   };

//   const hasResults =
//     summary ||
//     keywords.length > 0 ||
//     graphUrl ||
//     title ||
//     citations.length > 0 ||
//     recommendations.length > 0 ||
//     images.length > 0 ||
//     chatHistory.length > 0;

//   return (
//     <DashboardContainer $isSidebarOpen={isSidebarOpen}>
//       {!hasResults && !loading && (
//         <>
//           <UploadButton setUploadedFile={setUploadedFile} handleUpload={handleUpload} />
//           <Features />
//         </>
//       )}
//       {loading && (
//         <LoadingIndicator>
//           <Spinner />
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
//           <PaperTitle title={title} />
//           <Summarizer summary={summary} />
//           <FlexRow>
//             <Column width={1}>
//               <Keywords keywords={keywords} />
//             </Column>
//             <Column width={2}>
//               {graphUrl && graphUrl !== "no-data" && <Graph graphUrl={graphUrl} />}
//             </Column>
//           </FlexRow>
//           <Recommendations keywords={keywords} />
//           <FiguresExtracted images={images} />
//           <Citations citations={citations} />
//           <ChatSection>
//             <h3>Chat about this Paper</h3>
//             <ChatInput
//               value={chatMessage}
//               onChange={(e) => setChatMessage(e.target.value)}
//               placeholder="Ask a question about the paper"
//             />
//             <ChatButton onClick={handleChat}>Send</ChatButton>
//             <ChatHistory>
//               {chatHistory.length > 0 ? (
//                 chatHistory.map((chat, i) => (
//                   <div key={i}>
//                     {chat.message && <p><strong>You:</strong> {chat.message}</p>}
//                     {chat.response && <p><strong>LLM:</strong> {chat.response}</p>}
//                   </div>
//                 ))
//               ) : (
//                 <p>No chat history yet</p>
//               )}
//             </ChatHistory>
//           </ChatSection>


//           <DownloadBtn 
//       title={title}
//       summary={summary}
//       keywords={keywords}
//       citations={citations}
//       recommendations={recommendations}
//       images={images}
//     />


//           <ResetButton onClick={handleReset}>Analyze Another Document</ResetButton>
//         </>
//       )}
//     </DashboardContainer>
//   );
// };

// export default Dashboard;





















/* testing img retrieval
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
import FiguresExtracted from "./FiguresExtracted";
import DownloadBtn from "./DownloadBtn";

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
  const [visualContent, setVisualContent] = useState([]); // Tables, figures, and images
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
      setVisualContent(selectedAnalysis.images || []); // Assuming analysis stores all visual content
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

  const fetchRecommendations = async (keywords) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keywords }),
        credentials: "include",
      });
      if (!response.ok) throw new Error(`Failed to fetch recommendations: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      return [];
    }
  };

  const fetchExtractedVisualContent = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`${API_BASE_URL}/api/extract-images`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to extract visual content: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      // Combine tables, figures, and embedded images
      const allVisualContent = [
        ...(data.tables || []).map((table) => ({
          name: table.name,
          image: table.image,
        })),
        ...(data.figures || []).map((figure) => ({
          name: figure.name,
          image: figure.image,
        })),
        ...(data.images || []).map((img) => ({
          name: img.name,
          image: img.image,
        })),
      ];
      console.log("Extracted visual content:", allVisualContent);
      return allVisualContent;
    } catch (err) {
      console.error("Error extracting visual content:", err.message);
      setError(`Visual content extraction failed: ${err.message}`);
      return [];
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
    setVisualContent([]);
    setChatHistory([]);

    try {
      const pdfId = Date.now().toString();

      // Summary
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

      // Keywords
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

      // Graph
      const tableFormData = new FormData();
      tableFormData.append("pdf", uploadedFile);

      /* const tableResponse = await fetch(`${API_BASE_URL}/api/table-extract`, {
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
      setGraphUrl(graphUrl); */

      // Inside handleUpload function, replace the graph section
      /* const tableResponse = await fetch(`${API_BASE_URL}/api/table-extract`, {
        method: "POST",
        body: tableFormData,
        credentials: "include",
      });
      let graphs = [];
      if (tableResponse.ok) {
        const tableData = await tableResponse.json();
        if (tableData.graphs) {
          graphs = tableData.graphs.map(graph => ({
            ...graph,
            url: graph.url ? URL.createObjectURL(new Blob([new Uint8Array(graph.url.data)], { type: 'image/png' })) : null
          }));
        } else if (tableData.message === "No valid data available for visualization") {
          graphs = [{ url: "no-data", page: 1, table_index: 0 }];
        }
      }
      setGraphUrl(graphs); // Update to set an array of graphs

      // Title
      const titleFormData = new FormData();
      titleFormData.append("file", uploadedFile);
      const titleResponse = await fetch(`${API_BASE_URL}/api/extract-title`, {
        method: "POST",
        body: titleFormData,
        credentials: "include",
      });
      const titleData = await titleResponse.json();
      const extractedTitle =
        titleData.title && titleData.title !== "Title not found" && titleData.title.trim()
          ? titleData.title
          : "Untitled";
      setTitle(extractedTitle);

      // Citations
      const citationFormData = new FormData();
      citationFormData.append("file", uploadedFile);
      const citationResponse = await fetch(`${API_BASE_URL}/api/extract-citations`, {
        method: "POST",
        body: citationFormData,
        credentials: "include",
      });
      const citationData = await citationResponse.json();
      setCitations(citationData.citations || []);

      // Visual Content (Tables, Figures, Images)
      const visualData = await fetchExtractedVisualContent(uploadedFile);
      setVisualContent(visualData);

      // Recommendations
      const recommendationData = await fetchRecommendations(keywordData.keywords);
      setRecommendations(recommendationData);

      // Save Analysis
      const analysisData = {
        pdf_id: pdfId,
        filename: uploadedFile.name,
        title: extractedTitle,
        summary: summaryData.summary || "Summary pending",
        keywords: keywordData.keywords || [],
        graphs: graphUrl && graphUrl !== "no-data" ? [graphUrl] : [],
        citations: citationData.citations || [],
        images: visualData, // Store all visual content here
        recommendations: recommendationData,
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
        pdf_id: analysisId,
        filename: uploadedFile?.name || currentAnalysis.filename || "Recent PDF",
        title: title || currentAnalysis.title || "Untitled",
        summary: summary || currentAnalysis.summary || "",
        keywords: keywords.length ? keywords : currentAnalysis.keywords || [],
        graphs: graphUrl && graphUrl !== "no-data" ? [graphUrl] : currentAnalysis.graphs || [],
        citations: citations.length ? citations : currentAnalysis.citations || [],
        images: visualContent.length ? visualContent : currentAnalysis.images || [],
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

  const handleReset = () => {
    setSummary("");
    setKeywords([]);
    setGraphUrl(null);
    setTitle("");
    setCitations([]);
    setRecommendations([]);
    setVisualContent([]);
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
    visualContent.length > 0 ||
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
          <FiguresExtracted visualContent={visualContent} />
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
          <DownloadBtn
            title={title}
            summary={summary}
            keywords={keywords}
            citations={citations}
            recommendations={recommendations}
            images={visualContent} // Pass all visual content
          />
          <ResetButton onClick={handleReset}>Analyze Another Document</ResetButton>
        </>
      )}
    </DashboardContainer>
  );
};

export default Dashboard; */


































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
import FiguresExtracted from "./FiguresExtracted";
import DownloadPDFBtn from "./DownloadPDFBtn";
import DownloadPPTBtn from "./DownloadPPTBtn";
import Author from "./Author"; 

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
  background-color: rgb(39, 39, 39);
  border-radius: 8px;
  border: 0.5px #5f5f5f solid;
  color: white;
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px; 
`;


const API_BASE_URL = "http://127.0.0.1:5000";

const Dashboard = ({ isSidebarOpen, selectedAnalysis }) => {
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [graphUrl, setGraphUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [citations, setCitations] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [visualContent, setVisualContent] = useState([]);
  const [authors, setAuthors] = useState([]); // Add state for authors
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
      setVisualContent(selectedAnalysis.images || []);
      setAuthors(selectedAnalysis.authors || []); // Load authors from analysis
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

  const fetchRecommendations = async (keywords) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keywords }),
        credentials: "include",
      });
      if (!response.ok) throw new Error(`Failed to fetch recommendations: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      return [];
    }
  };

  const fetchExtractedVisualContent = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`${API_BASE_URL}/api/extract-images`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to extract visual content: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      const allVisualContent = [
        ...(data.tables || []).map((table) => ({
          name: table.name,
          image: table.image,
        })),
        ...(data.figures || []).map((figure) => ({
          name: figure.name,
          image: figure.image,
        })),
        ...(data.images || []).map((img) => ({
          name: img.name,
          image: img.image,
        })),
      ];
      console.log("Extracted visual content:", allVisualContent);
      return allVisualContent;
    } catch (err) {
      console.error("Error extracting visual content:", err.message);
      setError(`Visual content extraction failed: ${err.message}`);
      return [];
    }
  };

  const fetchAuthors = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`${API_BASE_URL}/api/extract-authors`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to extract authors: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      console.log("Extracted authors:", data.authors);
      return data.authors;
    } catch (err) {
      console.error("Error extracting authors:", err.message);
      setError(`Author extraction failed: ${err.message}`);
      return ["No authors found"];
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
    setVisualContent([]);
    setAuthors([]); // Reset authors
    setChatHistory([]);

    try {
      const pdfId = Date.now().toString();

      // Summary
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

      // Keywords
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

      // Graph
      const tableFormData = new FormData();
      tableFormData.append("pdf", uploadedFile);
      const tableResponse = await fetch(`${API_BASE_URL}/api/table-extract`, {
        method: "POST",
        body: tableFormData,
        credentials: "include",
      });
      let graphs = [];
      if (tableResponse.ok) {
        const tableData = await tableResponse.json();
        if (tableData.graphs) {
          graphs = tableData.graphs.map(graph => ({
            ...graph,
            url: graph.url ? URL.createObjectURL(new Blob([new Uint8Array(graph.url.data)], { type: 'image/png' })) : null
          }));
        } else if (tableData.message === "No valid data available for visualization") {
          graphs = [{ url: "no-data", page: 1, table_index: 0 }];
        }
      }
      setGraphUrl(graphs);

      // Title
      const titleFormData = new FormData();
      titleFormData.append("file", uploadedFile);
      const titleResponse = await fetch(`${API_BASE_URL}/api/extract-title`, {
        method: "POST",
        body: titleFormData,
        credentials: "include",
      });
      const titleData = await titleResponse.json();
      const extractedTitle =
        titleData.title && titleData.title !== "Title not found" && titleData.title.trim()
          ? titleData.title
          : "Untitled";
      setTitle(extractedTitle);

      // Authors
      const extractedAuthors = await fetchAuthors(uploadedFile);
      setAuthors(extractedAuthors);

      // Citations
      const citationFormData = new FormData();
      citationFormData.append("file", uploadedFile);
      const citationResponse = await fetch(`${API_BASE_URL}/api/extract-citations`, {
        method: "POST",
        body: citationFormData,
        credentials: "include",
      });
      const citationData = await citationResponse.json();
      setCitations(citationData.citations || []);

      // Visual Content
      const visualData = await fetchExtractedVisualContent(uploadedFile);
      setVisualContent(visualData);

      // Recommendations
      const recommendationData = await fetchRecommendations(keywordData.keywords);
      setRecommendations(recommendationData);

      // Save Analysis
      const analysisData = {
        pdf_id: pdfId,
        filename: uploadedFile.name,
        title: extractedTitle,
        summary: summaryData.summary || "Summary pending",
        keywords: keywordData.keywords || [],
        graphs: graphs.length && graphs[0].url !== "no-data" ? graphs : [],
        citations: citationData.citations || [],
        images: visualData,
        authors: extractedAuthors, // Include authors
        recommendations: recommendationData,
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
        pdf_id: analysisId,
        filename: uploadedFile?.name || currentAnalysis.filename || "Recent PDF",
        title: title || currentAnalysis.title || "Untitled",
        summary: summary || currentAnalysis.summary || "",
        keywords: keywords.length ? keywords : currentAnalysis.keywords || [],
        graphs: graphUrl && graphUrl !== "no-data" ? [graphUrl] : currentAnalysis.graphs || [],
        citations: citations.length ? citations : currentAnalysis.citations || [],
        images: visualContent.length ? visualContent : currentAnalysis.images || [],
        authors: authors.length ? authors : currentAnalysis.authors || [], // Include authors
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

  const handleReset = () => {
    setSummary("");
    setKeywords([]);
    setGraphUrl(null);
    setTitle("");
    setCitations([]);
    setRecommendations([]);
    setVisualContent([]);
    setAuthors([]); // Reset authors
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
    visualContent.length > 0 ||
    authors.length > 0 || // Include authors
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
          <Author authors={authors} /> {/* Add Author component */}
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
          <FiguresExtracted visualContent={visualContent} />
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
          <ButtonContainer>
            <DownloadPDFBtn
              title={title}
              summary={summary}
              keywords={keywords}
              citations={citations}
              recommendations={recommendations}
              images={visualContent}
              authors={authors}
            />
            <DownloadPPTBtn
              title={title}
              summary={summary}
              keywords={keywords}
              citations={citations}
              recommendations={recommendations}
              images={visualContent}
              authors={authors}
            />
          </ButtonContainer>
          <ResetButton onClick={handleReset}>Analyze Another Document</ResetButton>
        </>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;