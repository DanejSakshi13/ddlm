//working
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { ProSidebarProvider } from 'react-pro-sidebar'; // Import the provider
// import Sidebar from '../components/Sidebar';
// import Dashboard from '../components/Dashboard';

// const SidebarWidth = 80; // Adjusted width for the sidebar

// const HomePageContainer = styled.div`
//   display: flex;
//   height: 100vh;
//   overflow: hidden;
//   font-family: "Montserrat", serif;
// `;

// const MainContent = styled.div`
//   flex: 1;
//   margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? `${SidebarWidth}px` : '0px')};
//   transition: margin-left 0.3s ease;
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `;

// const ContentWrapper = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   overflow-y: auto;
// `;

// const Home = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <ProSidebarProvider> {/* Wrap the components with ProSidebarProvider */}
//       <HomePageContainer>
//         <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//         <MainContent isSidebarOpen={isSidebarOpen}>
//           <ContentWrapper>
//             <Dashboard />
//           </ContentWrapper>
//         </MainContent>
//       </HomePageContainer>
//     </ProSidebarProvider>
//   );
// };

// export default Home;















// import React, { useState } from "react";
// import styled from "styled-components";
// import Sidebar from "../components/Sidebar";
// import Dashboard from "../components/Dashboard";
// import Preview from "../components/Preview"; // Import Preview Component

// const SidebarWidth = 50;

// const HomePageContainer = styled.div`
//   display: flex;
//   height: 100vh;
//   overflow: hidden;
// `;

// const MainContent = styled.div`
//   flex: 1;
//   margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? `${SidebarWidth}px` : "0px")};
//   transition: margin-left 0.3s ease;
//   display: flex; /* Ensures horizontal layout */
//   flex-direction: row; /* Aligns Preview and Dashboard in columns */
//   width: 100%;
// `;

// const Column = styled.div`
//   flex: ${(props) => props.flex || 1};
//   display: flex;
//   flex-direction: column;
//   padding: 10px;
//   overflow-y: auto;
// `;

// const Home = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [uploadedFile, setUploadedFile] = useState(null); // Store uploaded file for preview

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleFileUpload = (file) => {
//     setUploadedFile(file); // Update file for preview
//   };

//   return (
//     <HomePageContainer>
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       <MainContent isSidebarOpen={isSidebarOpen}>
//         {/* Left Side - PDF Preview */}
//         <Column flex={1.5}>
//           {uploadedFile && <Preview file={uploadedFile} />}
//         </Column>

//         {/* Right Side - Dashboard */}
//         <Column flex={2.5}>
//           <Dashboard onUploadComplete={handleFileUpload} />
//         </Column>
//       </MainContent>
//     </HomePageContainer>
//   );
// };

// export default Home;
















//last working version, stopped bcz of sidebar dependencies
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { ProSidebarProvider } from 'react-pro-sidebar'; // Import the provider
// import Sidebar from '../components/Sidebar';
// import Dashboard from '../components/Dashboard';

// const SidebarWidth = 80; // Adjusted width for the sidebar

// const HomePageContainer = styled.div`
//   display: flex;
//   height: 100vh;
//   overflow: hidden;
//   font-family: "Montserrat", serif;
//   background-color: black;
// `;

// const MainContent = styled.div`
//   flex: 1;
//   margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? '0px' : '100px')}; /* Adjust margin based on sidebar state */
//   transition: margin-left 0.3s ease;
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `;

// const ContentWrapper = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   overflow-y: auto;
// `;

// const Home = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <ProSidebarProvider>
//       <HomePageContainer>
//         <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//         <MainContent isSidebarOpen={isSidebarOpen}>
//           <ContentWrapper>
//             <Dashboard isSidebarOpen={isSidebarOpen} /> {/* Pass the sidebar state */}
//           </ContentWrapper>
//         </MainContent>
//       </HomePageContainer>
//     </ProSidebarProvider>
//   );
// };

// export default Home;













import React, { useState } from 'react';
import styled from 'styled-components';
import { ProSidebarProvider } from 'react-pro-sidebar'; // Use ProSidebarProvider instead of SidebarProvider
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';

const SidebarWidth = 80;

const HomePageContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  font-family: "Montserrat", serif;
  background-color: black;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '0px' : '100px')}; /* Use transient prop */
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ProSidebarProvider> {/* Fixed to ProSidebarProvider */}
      <HomePageContainer>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <MainContent $isSidebarOpen={isSidebarOpen}>
          <ContentWrapper>
            <Dashboard isSidebarOpen={isSidebarOpen} />
          </ContentWrapper>
        </MainContent>
      </HomePageContainer>
    </ProSidebarProvider>
  );
};

export default Home;