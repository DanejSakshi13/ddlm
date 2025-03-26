

//last wokring version , wstopped bcz of dependencies 
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Sidebar as ProSidebar, Menu as ProMenu, MenuItem as ProMenuItem, useProSidebar } from 'react-pro-sidebar'; // Rename Menu and MenuItem
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
// import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// const SidebarContainer = styled(ProSidebar)`
//   background: rgb(37, 37, 37);
//   color: white;
//   font-family: "Montserrat", serif;
// `;

// const SidebarHeader = styled.h2`
//   text-align: center;
//   margin: 20px 0;
//   color: #D2FF72;
//   font-weight: 700;
//   margin-left: -35px;
// `;

// const CircleDiv = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: #D2FF72;
//   margin: 20px auto;
// `;

// const StyledMenu = styled(ProMenu)`
//   margin-bottom: 20px;
// `;

// const MenuItem = styled(ProMenuItem)`
//   margin: 10px 0;
// `;

// const ToggleButton = styled.button`
//   background-color: #D2FF72;
//   color: rgb(37, 37, 37);
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   position: absolute;
//   bottom: 20px;
//   left: 15px;
//   z-index: 1000;
//   display: flex;
//   align-items: center;
//   outline: none;
//   &:focus {
//     outline: none;
//     box-shadow: none;
//   }
// `;

// const Sidebar = () => {
//   const navigate = useNavigate(); // Initialize navigate hook
//   const { collapseSidebar } = useProSidebar();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isHistoryOpen, setIsHistoryOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser)); // Get user from localStorage
//     }
//   }, []);

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//     collapseSidebar();
//   };

//   const handleHistoryToggle = () => {
//     setIsHistoryOpen(!isHistoryOpen);
//   };

//   // Logout Function
//   const handleLogout = () => {
//     localStorage.clear(); // Clear session data
//     navigate('/'); // Redirect to landing page
//   };

//   return (
//     <SidebarContainer collapsed={!isOpen}>
//       {isOpen ? (
//         <SidebarHeader>ContextGPT</SidebarHeader>
//       ) : (
//         <CircleDiv />
//       )}
//       <StyledMenu>
//         <MenuItem icon={<AccountCircleRoundedIcon />}>User Profile</MenuItem>
//         <MenuItem icon={isHistoryOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />} onClick={handleHistoryToggle}>
//           <span>History</span>
//         </MenuItem>
//         {isHistoryOpen && (
//           <StyledMenu>
//             <MenuItem>Search Query 1</MenuItem>
//             <MenuItem>Search Query 2</MenuItem>
//             <MenuItem>Search Query 3</MenuItem>
//           </StyledMenu>
//         )}
//         <MenuItem icon={<SettingsApplicationsRoundedIcon />}>Settings</MenuItem>
//         <MenuItem icon={<LogoutRoundedIcon />} onClick={handleLogout}>Logout</MenuItem>
//       </StyledMenu>
//       <ToggleButton onClick={handleToggle}>
//         {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//       </ToggleButton>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;


























// working code
// import React, { useState, useEffect } from 'react'; // Added useEffect
// import styled from 'styled-components';
// import { Sidebar as ProSidebar, Menu as ProMenu, MenuItem as ProMenuItem, useProSidebar } from 'react-pro-sidebar';
// import { useNavigate } from 'react-router-dom';
// import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
// import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// const SidebarContainer = styled(ProSidebar)`
//   background: rgb(37, 37, 37);
//   color: white;
//   font-family: "Montserrat", serif;
// `;

// const SidebarHeader = styled.h2`
//   text-align: center;
//   margin: 20px 0;
//   color: #D2FF72;
//   font-weight: 700;
//   margin-left: -35px;
// `;

// const CircleDiv = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: #D2FF72;
//   margin: 20px auto;
// `;

// const StyledMenu = styled(ProMenu)`
//   margin-bottom: 20px;
// `;

// const MenuItem = styled(ProMenuItem)`
//   margin: 10px 0;
// `;

// const ToggleButton = styled.button`
//   background-color: #D2FF72;
//   color: rgb(37, 37, 37);
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   position: absolute;
//   bottom: 20px;
//   left: 15px;
//   z-index: 1000;
//   display: flex;
//   align-items: center;
//   outline: none;
//   &:focus {
//     outline: none;
//     box-shadow: none;
//   }
// `;

// const Sidebar = ({ isOpen, toggleSidebar }) => { // Accept isOpen and toggleSidebar as props
//   const navigate = useNavigate();
//   const { collapseSidebar } = useProSidebar();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen); // Local state synced with prop
//   const [isHistoryOpen, setIsHistoryOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   useEffect(() => {
//     setIsSidebarOpen(isOpen); // Sync local state with prop
//   }, [isOpen]);

//   const handleToggle = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//     collapseSidebar();
//     toggleSidebar(); // Call the parent toggle function
//   };

//   const handleHistoryToggle = () => {
//     setIsHistoryOpen(!isHistoryOpen);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/');
//   };

//   return (
//     <SidebarContainer collapsed={!isSidebarOpen}>
//       {isSidebarOpen ? (
//         <SidebarHeader>ContextGPT</SidebarHeader>
//       ) : (
//         <CircleDiv />
//       )}
//       <StyledMenu>
//         <MenuItem icon={<AccountCircleRoundedIcon />}>User Profile</MenuItem>
//         <MenuItem icon={isHistoryOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />} onClick={handleHistoryToggle}>
//           <span>History</span>
//         </MenuItem>
//         {isHistoryOpen && (
//           <StyledMenu>
//             <MenuItem>Search Query 1</MenuItem>
//             <MenuItem>Search Query 2</MenuItem>
//             <MenuItem>Search Query 3</MenuItem>
//           </StyledMenu>
//         )}
//         <MenuItem icon={<SettingsApplicationsRoundedIcon />}>Settings</MenuItem>
//         <MenuItem icon={<LogoutRoundedIcon />} onClick={handleLogout}>Logout</MenuItem>
//       </StyledMenu>
//       <ToggleButton onClick={handleToggle}>
//         {isSidebarOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//       </ToggleButton>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;


























// // attempt to print name of user who logins in 
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Sidebar as ProSidebar, Menu as ProMenu, MenuItem as ProMenuItem, useProSidebar } from 'react-pro-sidebar';
// import { useNavigate } from 'react-router-dom';
// import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
// import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// const SidebarContainer = styled(ProSidebar)`
//   background: rgb(37, 37, 37);
//   color: white;
//   font-family: "Montserrat", serif;
// `;

// const SidebarHeader = styled.h2`
//   text-align: center;
//   margin: 20px 0;
//   color: #D2FF72;
//   font-weight: 700;
//   margin-left: -35px;
// `;

// const CircleDiv = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: #D2FF72;
//   margin: 20px auto;
// `;

// const StyledMenu = styled(ProMenu)`
//   margin-bottom: 20px;
// `;

// const MenuItem = styled(ProMenuItem)`
//   margin: 10px 0;
// `;

// const ToggleButton = styled.button`
//   background-color: #D2FF72;
//   color: rgb(37, 37, 37);
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   position: absolute;
//   bottom: 20px;
//   left: 15px;
//   z-index: 1000;
//   display: flex;
//   align-items: center;
//   outline: none;
//   &:focus {
//     outline: none;
//     box-shadow: none;
//   }
// `;

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const navigate = useNavigate();
//   const { collapseSidebar } = useProSidebar();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
//   const [isHistoryOpen, setIsHistoryOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   useEffect(() => {
//     setIsSidebarOpen(isOpen);
//   }, [isOpen]);

//   const handleToggle = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//     collapseSidebar();
//     toggleSidebar();
//   };

//   const handleHistoryToggle = () => {
//     setIsHistoryOpen(!isHistoryOpen);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/');
//   };

//   return (
//     <SidebarContainer collapsed={!isSidebarOpen}>
//       {isSidebarOpen ? (
//         <SidebarHeader>ContextGPT</SidebarHeader>
//       ) : (
//         <CircleDiv />
//       )}
//       <StyledMenu>
//         <MenuItem icon={<AccountCircleRoundedIcon />}>
//           {isSidebarOpen && user ? (
//             <span>{user.name || user.email}</span>
//           ) : (
//             "User Profile"
//           )}
//         </MenuItem>
//         <MenuItem icon={isHistoryOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />} onClick={handleHistoryToggle}>
//           <span>History</span>
//         </MenuItem>
//         {isHistoryOpen && (
//           <StyledMenu>
//             <MenuItem>Search Query 1</MenuItem>
//             <MenuItem>Search Query 2</MenuItem>
//             <MenuItem>Search Query 3</MenuItem>
//           </StyledMenu>
//         )}
//         <MenuItem icon={<SettingsApplicationsRoundedIcon />}>Settings</MenuItem>
//         <MenuItem icon={<LogoutRoundedIcon />} onClick={handleLogout}>Logout</MenuItem>
//       </StyledMenu>
//       <ToggleButton onClick={handleToggle}>
//         {isSidebarOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//       </ToggleButton>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;


















// // attempt to print last 3 paper hisotry
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Sidebar as ProSidebar, Menu as ProMenu, MenuItem as ProMenuItem, useProSidebar } from 'react-pro-sidebar';
// import { useNavigate } from 'react-router-dom';
// import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
// import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// const SidebarContainer = styled(ProSidebar)`
//   background: rgb(37, 37, 37);
//   color: white;
//   font-family: "Montserrat", serif;
// `;

// const SidebarHeader = styled.h2`
//   text-align: center;
//   margin: 20px 0;
//   color: #D2FF72;
//   font-weight: 700;
//   margin-left: -35px;
// `;

// const CircleDiv = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: #D2FF72;
//   margin: 20px auto;
// `;

// const StyledMenu = styled(ProMenu)`
//   margin-bottom: 20px;
// `;

// const MenuItem = styled(ProMenuItem)`
//   margin: 10px 0;
// `;

// const ToggleButton = styled.button`
//   background-color: #D2FF72;
//   color: rgb(37, 37, 37);
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   position: absolute;
//   bottom: 20px;
//   left: 15px;
//   z-index: 1000;
//   display: flex;
//   align-items: center;
//   outline: none;
//   &:focus {
//     outline: none;
//     box-shadow: none;
//   }
// `;

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const navigate = useNavigate();
//   const { collapseSidebar } = useProSidebar();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
//   const [isAnalysesOpen, setIsAnalysesOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [recentAnalyses, setRecentAnalyses] = useState([]);

//   const API_BASE_URL = 'http://127.0.0.1:5000';

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//       fetchRecentAnalyses(parsedUser.email);
//     }
//   }, []);

//   useEffect(() => {
//     setIsSidebarOpen(isOpen);
//   }, [isOpen]);

//   const fetchRecentAnalyses = async (email) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/user-data?email=${email}`);
//       if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
//       const data = await response.json();
//       console.log("🛠 Fetched recent analyses:", data.chat_history);
//       setRecentAnalyses(data.chat_history);
//     } catch (error) {
//       console.error("Error fetching recent analyses:", error);
//       // Optionally set a state to show an error message in the UI
//     }
//   };

//   const handleToggle = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//     collapseSidebar();
//     toggleSidebar();
//   };

//   const handleAnalysesToggle = () => {
//     setIsAnalysesOpen(!isAnalysesOpen);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/');
//   };

//   return (
//     <SidebarContainer collapsed={!isSidebarOpen}>
//       {isSidebarOpen ? (
//         <SidebarHeader>ContextGPT</SidebarHeader>
//       ) : (
//         <CircleDiv />
//       )}
//       <StyledMenu>
//         <MenuItem icon={<AccountCircleRoundedIcon />}>
//           {isSidebarOpen && user ? <span>{user.name || user.email}</span> : "User Profile"}
//         </MenuItem>
//         <MenuItem icon={isAnalysesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />} onClick={handleAnalysesToggle}>
//           <span>Recent Analyses</span>
//         </MenuItem>
//         {isAnalysesOpen && (
//           <StyledMenu>
//             {recentAnalyses.length > 0 ? (
//               recentAnalyses.map((analysis, index) => (
//                 <MenuItem key={index}>
//                   {analysis.title ? 
//                     analysis.title.substring(0, 20) + (analysis.title.length > 20 ? "..." : "") : 
//                     "Untitled Analysis"}
//                 </MenuItem>
//               ))
//             ) : (
//               <MenuItem>No recent analyses</MenuItem>
//             )}
//           </StyledMenu>
//         )}
//         <MenuItem icon={<SettingsApplicationsRoundedIcon />}>Settings</MenuItem>
//         <MenuItem icon={<LogoutRoundedIcon />} onClick={handleLogout}>Logout</MenuItem>
//       </StyledMenu>
//       <ToggleButton onClick={handleToggle}>
//         {isSidebarOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//       </ToggleButton>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;












// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Sidebar as ProSidebar, Menu as ProMenu, MenuItem as ProMenuItem } from 'react-pro-sidebar';
// import { useNavigate } from 'react-router-dom';
// import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
// import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// const SidebarContainer = styled(ProSidebar)`
//   background: rgb(37, 37, 37);
//   color: white;
//   font-family: "Montserrat", serif;
// `;

// const SidebarHeader = styled.h2`
//   text-align: center;
//   margin: 20px 0;
//   color: #D2FF72;
//   font-weight: 700;
//   margin-left: -35px;
// `;

// const CircleDiv = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: #D2FF72;
//   margin: 20px auto;
// `;

// const StyledMenu = styled(ProMenu)`
//   margin-bottom: 20px;
// `;

// const MenuItem = styled(ProMenuItem)`
//   margin: 10px 0;
// `;

// const ToggleButton = styled.button`
//   background-color: #D2FF72;
//   color: rgb(37, 37, 37);
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   position: absolute;
//   bottom: 20px;
//   left: 15px;
//   z-index: 1000;
//   display: flex;
//   align-items: center;
//   outline: none;
//   &:focus {
//     outline: none;
//     box-shadow: none;
//   }
// `;

// const ChatDisplay = styled.div`
//   padding: 10px;
//   max-height: 200px;
//   overflow-y: auto;
// `;

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
//   const [isAnalysesOpen, setIsAnalysesOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [recentAnalysis, setRecentAnalysis] = useState(null);

//   const API_BASE_URL = 'http://127.0.0.1:5000';

//   const fetchRecentAnalysis = async (email) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/user-data?email=${email}`);
//       if (!response.ok) throw new Error('Failed to fetch analysis');
//       const data = await response.json();
//       console.log("🛠 Fetched recent analysis:", data.recent_analysis);
//       setRecentAnalysis(data.recent_analysis);
//     } catch (error) {
//       console.error("Error fetching recent analysis:", error);
//     }
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//       fetchRecentAnalysis(parsedUser.email);
//     }
//     window.addEventListener("analysisUpdated", () => fetchRecentAnalysis(user?.email));
//     return () => window.removeEventListener("analysisUpdated", () => fetchRecentAnalysis(user?.email));
//   }, [user?.email]);

//   useEffect(() => {
//     setIsSidebarOpen(isOpen);
//   }, [isOpen]);

//   const handleToggle = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//     toggleSidebar();
//   };

//   const handleAnalysesToggle = () => {
//     setIsAnalysesOpen(!isAnalysesOpen);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/');
//   };

//   return (
//     <SidebarContainer collapsed={!isSidebarOpen}>
//       {isSidebarOpen ? (
//         <SidebarHeader>ContextGPT</SidebarHeader>
//       ) : (
//         <CircleDiv />
//       )}
//       <StyledMenu>
//         <MenuItem icon={<AccountCircleRoundedIcon />}>
//           {isSidebarOpen && user ? <span>{user.name || user.email}</span> : "User Profile"}
//         </MenuItem>
//         <MenuItem icon={isAnalysesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />} onClick={handleAnalysesToggle}>
//           <span>Recent Analysis</span>
//         </MenuItem>
//         {isAnalysesOpen && (
//           <StyledMenu>
//             {recentAnalysis ? (
//               <>
//                 <MenuItem>{recentAnalysis.title || "Untitled"}</MenuItem>
//                 <ChatDisplay>
//                   {recentAnalysis.chat && recentAnalysis.chat.length > 0 ? (
//                     recentAnalysis.chat.map((entry, index) => (
//                       <div key={index}>
//                         <p><strong>You:</strong> {entry.message}</p>
//                         <p><strong>LLM:</strong> {entry.response}</p>
//                       </div>
//                     ))
//                   ) : (
//                     <p>No chat history yet</p>
//                   )}
//                 </ChatDisplay>
//               </>
//             ) : (
//               <MenuItem>No recent analysis</MenuItem>
//             )}
//           </StyledMenu>
//         )}
//         <MenuItem icon={<SettingsApplicationsRoundedIcon />}>Settings</MenuItem>
//         <MenuItem icon={<LogoutRoundedIcon />} onClick={handleLogout}>Logout</MenuItem>
//       </StyledMenu>
//       <ToggleButton onClick={handleToggle}>
//         {isSidebarOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//       </ToggleButton>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;














// 25/3/25 - dsplays only 1 analysis
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Sidebar as ProSidebar, Menu as ProMenu, MenuItem as ProMenuItem } from 'react-pro-sidebar';
// import { useNavigate } from 'react-router-dom';
// import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
// import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// const SidebarContainer = styled(ProSidebar)`
//   background: rgb(37, 37, 37);
//   color: white;
//   font-family: "Montserrat", serif;
// `;

// const SidebarHeader = styled.h2`
//   text-align: center;
//   margin: 20px 0;
//   color: #D2FF72;
//   font-weight: 700;
//   margin-left: -35px;
// `;

// const CircleDiv = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: #D2FF72;
//   margin: 20px auto;
// `;

// const StyledMenu = styled(ProMenu)`
//   margin-bottom: 20px;
// `;

// const MenuItem = styled(ProMenuItem)`
//   margin: 10px 0;
// `;

// const ToggleButton = styled.button`
//   background-color: #D2FF72;
//   color: rgb(37, 37, 37);
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   position: absolute;
//   bottom: 20px;
//   left: 15px;
//   z-index: 1000;
//   display: flex;
//   align-items: center;
//   outline: none;
//   &:focus {
//     outline: none;
//     box-shadow: none;
//   }
// `;

// const ChatDisplay = styled.div`
//   padding: 10px;
//   max-height: 200px;
//   overflow-y: auto;
// `;

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
//   const [isAnalysesOpen, setIsAnalysesOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [recentAnalysis, setRecentAnalysis] = useState(null);
//   const API_BASE_URL = 'http://127.0.0.1:5000';

//   const fetchRecentAnalysis = async (email) => {
//     if (!email) {
//       console.warn("No email provided for fetching recent analysis");
//       return;
//     }
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/user-data?email=${email}`);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`Failed to fetch analysis: ${errorData.error || response.status}`);
//       }
//       const data = await response.json();
//       console.log("Fetched recent analysis:", data.recent_analysis);
//       setRecentAnalysis(data.recent_analysis);
//     } catch (error) {
//       console.error("Error fetching recent analysis:", error);
//     }
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//       fetchRecentAnalysis(parsedUser.email);
//     }
//   }, []);  // Run once on mount

//   useEffect(() => {
//     if (user?.email) {
//       const handleAnalysisUpdated = () => fetchRecentAnalysis(user.email);
//       window.addEventListener("analysisUpdated", handleAnalysisUpdated);
//       return () => window.removeEventListener("analysisUpdated", handleAnalysisUpdated);
//     }
//   }, [user?.email]);  // Separate effect for event listener

//   useEffect(() => {
//     setIsSidebarOpen(isOpen);
//   }, [isOpen]);

//   const handleToggle = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//     toggleSidebar();
//   };

//   const handleAnalysesToggle = () => {
//     setIsAnalysesOpen(!isAnalysesOpen);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/');
//   };

//   return (
//     <SidebarContainer collapsed={!isSidebarOpen}>
//       {isSidebarOpen ? (
//         <SidebarHeader>ContextGPT</SidebarHeader>
//       ) : (
//         <CircleDiv />
//       )}
//       <StyledMenu>
//         <MenuItem icon={<AccountCircleRoundedIcon />}>
//           {isSidebarOpen && user ? <span>{user.name || user.email}</span> : "User Profile"}
//         </MenuItem>
//         <MenuItem icon={isAnalysesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />} onClick={handleAnalysesToggle}>
//           <span>Recent Analysis</span>
//         </MenuItem>
//         {isAnalysesOpen && (
//           <StyledMenu>
//             {recentAnalysis ? (
//               <>
//                 <MenuItem>{recentAnalysis.title || "Untitled"}</MenuItem>
//                 <ChatDisplay>
//                   {recentAnalysis.chat && recentAnalysis.chat.length > 0 ? (
//                     recentAnalysis.chat.map((entry, index) => (
//                       <div key={index}>
//                         <p><strong>You:</strong> {entry.message}</p>
//                         <p><strong>LLM:</strong> {entry.response}</p>
//                       </div>
//                     ))
//                   ) : (
//                     <p>No chat history yet</p>
//                   )}
//                 </ChatDisplay>
//               </>
//             ) : (
//               <MenuItem>No recent analysis</MenuItem>
//             )}
//           </StyledMenu>
//         )}
//         <MenuItem icon={<SettingsApplicationsRoundedIcon />}>Settings</MenuItem>
//         <MenuItem icon={<LogoutRoundedIcon />} onClick={handleLogout}>Logout</MenuItem>
//       </StyledMenu>
//       <ToggleButton onClick={handleToggle}>
//         {isSidebarOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//       </ToggleButton>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;




25/3/25
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Sidebar as ProSidebar, Menu as ProMenu, MenuItem as ProMenuItem } from 'react-pro-sidebar';
// import { useNavigate } from 'react-router-dom';
// import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
// import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// const SidebarContainer = styled(ProSidebar)`
//   background: rgb(37, 37, 37);
//   color: white;
//   font-family: "Montserrat", serif;
// `;

// const SidebarHeader = styled.h2`
//   text-align: center;
//   margin: 20px 0;
//   color: #D2FF72;
//   font-weight: 700;
//   margin-left: -35px;
// `;

// const CircleDiv = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: #D2FF72;
//   margin: 20px auto;
// `;

// const StyledMenu = styled(ProMenu)`
//   margin-bottom: 20px;
// `;

// const MenuItem = styled(ProMenuItem)`
//   margin: 10px 0;
// `;

// const ToggleButton = styled.button`
//   background-color: #D2FF72;
//   color: rgb(37, 37, 37);
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   position: absolute;
//   bottom: 20px;
//   left: 15px;
//   z-index: 1000;
//   display: flex;
//   align-items: center;
//   outline: none;
//   &:focus {
//     outline: none;
//     box-shadow: none;
//   }
// `;

// const Sidebar = ({ isOpen, toggleSidebar, setSelectedAnalysis }) => {
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
//   const [isAnalysesOpen, setIsAnalysesOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [analyses, setAnalyses] = useState([]); // Store last 3 analyses
//   const API_BASE_URL = 'http://127.0.0.1:5000';

//   const fetchUserData = async (email) => {
//     if (!email) {
//       console.warn("No email provided for fetching user data");
//       return;
//     }
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/user-data?email=${email}`);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`Failed to fetch user data: ${errorData.error || response.status}`);
//       }
//       const data = await response.json();
//       console.log("Fetched user data:", data);

//       const allAnalyses = data.analysis || [];
//       const lastThreeAnalyses = allAnalyses.slice(-3).reverse(); // Last 3, newest first
//       setAnalyses(lastThreeAnalyses);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//       fetchUserData(parsedUser.email);
//     }
//   }, []); // Run once on mount

//   useEffect(() => {
//     if (user?.email) {
//       const handleAnalysisUpdated = () => fetchUserData(user.email);
//       window.addEventListener("analysisUpdated", handleAnalysisUpdated);
//       return () => window.removeEventListener("analysisUpdated", handleAnalysisUpdated);
//     }
//   }, [user?.email]); // Update when user.email changes

//   useEffect(() => {
//     setIsSidebarOpen(isOpen);
//   }, [isOpen]);

//   const handleToggle = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//     toggleSidebar();
//   };

//   const handleAnalysesToggle = () => {
//     setIsAnalysesOpen(!isAnalysesOpen);
//   };

//   const handleAnalysisSelect = (analysis) => {
//     setSelectedAnalysis(analysis); // Pass the selected analysis to the dashboard
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/');
//   };

//   return (
//     <SidebarContainer collapsed={!isSidebarOpen}>
//       {isSidebarOpen ? (
//         <SidebarHeader>ContextGPT</SidebarHeader>
//       ) : (
//         <CircleDiv />
//       )}
//       <StyledMenu>
//         <MenuItem icon={<AccountCircleRoundedIcon />}>
//           {isSidebarOpen && user ? <span>{user.name || user.email}</span> : "User Profile"}
//         </MenuItem>
//         <MenuItem
//           icon={isAnalysesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//           onClick={handleAnalysesToggle}
//         >
//           <span>Recent Analyses</span>
//         </MenuItem>
//         {isAnalysesOpen && (
//           <StyledMenu>
//             {analyses.length > 0 ? (
//               analyses.map((analysis, index) => (
//                 <MenuItem
//                   key={index}
//                   onClick={() => handleAnalysisSelect(analysis)}
//                 >
//                   {analysis.title || "Untitled"}
//                 </MenuItem>
//               ))
//             ) : (
//               <MenuItem>No analyses available</MenuItem>
//             )}
//           </StyledMenu>
//         )}
//         <MenuItem icon={<SettingsApplicationsRoundedIcon />}>Settings</MenuItem>
//         <MenuItem icon={<LogoutRoundedIcon />} onClick={handleLogout}>
//           Logout
//         </MenuItem>
//       </StyledMenu>
//       <ToggleButton onClick={handleToggle}>
//         {isSidebarOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//       </ToggleButton>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;






















26/3/25
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Sidebar as ProSidebar, Menu as ProMenu, MenuItem as ProMenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArticleIcon from '@mui/icons-material/Article'; // Added missing import

const SidebarContainer = styled(ProSidebar)`
  background: rgb(37, 37, 37);
  color: white;
  font-family: "Montserrat", serif;
`;

const SidebarHeader = styled.h2`
  text-align: center;
  margin: 20px 0;
  color: #D2FF72;
  font-weight: 700;
  margin-left: -35px;
`;

const CircleDiv = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #D2FF72;
  margin: 20px auto;
`;

const StyledMenu = styled(ProMenu)`
  margin-bottom: 20px;
`;

const MenuItem = styled(ProMenuItem)`
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AnalysisTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
  font-size:12px;
`;

const ToggleButton = styled.button`
  background-color: #D2FF72;
  color: rgb(37, 37, 37);
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  left: 15px;
  z-index: 1000;
  display: flex;
  align-items: center;
  outline: none;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const Sidebar = ({ isOpen, toggleSidebar, setSelectedAnalysis }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
  const [isAnalysesOpen, setIsAnalysesOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [analyses, setAnalyses] = useState([]);
  const API_BASE_URL = 'http://127.0.0.1:5000';

  const fetchUserData = async (email) => {
    if (!email) {
      console.warn("No email provided for fetching user data");
      return;
    }
    try {
      const url = `${API_BASE_URL}/api/user-data?email=${encodeURIComponent(email)}`;
      console.log("Fetching user data from:", url);
      const response = await fetch(url, {
        credentials: "include",
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch user data: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      console.log("Fetched user data:", data);

      const allAnalyses = data.analysis || [];
      const lastThreeAnalyses = allAnalyses.slice(-3).reverse();
      console.log("Last 3 analyses:", lastThreeAnalyses);
      setAnalyses(lastThreeAnalyses);
      console.log("Analyses state set with:", lastThreeAnalyses);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log("Initial fetch for email:", parsedUser.email);
      fetchUserData(parsedUser.email);
    } else {
      console.warn("No user found in localStorage");
    }
  }, []);

  useEffect(() => {
    if (user?.email) {
      const handleAnalysisUpdated = () => {
        console.log("Analysis updated event received, refetching for email:", user.email);
        fetchUserData(user.email);
      };
      window.addEventListener("analysisUpdated", handleAnalysisUpdated);
      return () => {
        console.log("Removing analysisUpdated event listener");
        window.removeEventListener("analysisUpdated", handleAnalysisUpdated);
      };
    }
  }, [user?.email]);

  useEffect(() => {
    setIsSidebarOpen(isOpen);
  }, [isOpen]);

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    toggleSidebar();
  };

  const handleAnalysesToggle = () => {
    setIsAnalysesOpen(!isAnalysesOpen);
  };

  const handleAnalysisSelect = (analysis) => {
    console.log("Selected analysis:", analysis);
    setSelectedAnalysis(analysis);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const formatAnalysisTitle = (title, filename) => {
    return title || filename || "Untitled Analysis";
  };

  console.log("Rendering Sidebar with analyses:", analyses); // Debug render

  return (
    <SidebarContainer collapsed={!isSidebarOpen}>
      {isSidebarOpen ? (
        <SidebarHeader>ContextGPT</SidebarHeader>
      ) : (
        <CircleDiv />
      )}
      <StyledMenu>
        <MenuItem icon={<AccountCircleRoundedIcon />}>
          {isSidebarOpen && user ? <span>{user.name || user.email}</span> : "User Profile"}
        </MenuItem>
        
        <MenuItem
          icon={isAnalysesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={handleAnalysesToggle}
        >
          <span>Recent Analyses</span>
        </MenuItem>
        
        {isAnalysesOpen && (
          <StyledMenu>
            {analyses.length > 0 ? (
              analyses.map((analysis, index) => {
                console.log("Rendering analysis:", analysis); // Debug each item
                return (
                  <MenuItem
                    key={analysis._id || index}
                    icon={<ArticleIcon />}
                    onClick={() => handleAnalysisSelect(analysis)}
                  >
                    <AnalysisTitle>
                      {formatAnalysisTitle(analysis.title, analysis.filename)}
                    </AnalysisTitle>
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem>No analyses available</MenuItem>
            )}
          </StyledMenu>
        )}
        
        <MenuItem icon={<SettingsApplicationsRoundedIcon />}>Settings</MenuItem>
        <MenuItem icon={<LogoutRoundedIcon />} onClick={handleLogout}>
          Logout
        </MenuItem>
      </StyledMenu>
      
      <ToggleButton onClick={handleToggle}>
        {isSidebarOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ToggleButton>
    </SidebarContainer>
  );
};

export default Sidebar;