// import React from 'react';
// import styled from 'styled-components';

// const SidebarContainer = styled.div`
//   width: ${({ isOpen }) => (isOpen ? '250px' : '0')}; /* Adjust width based on sidebar visibility */
//   background:rgb(248, 250, 252);
//   color: black;
//   padding: 20px;
//   transition: width 0.3s ease;
//   overflow-x: hidden; /* Prevent horizontal scrolling */
//     font-family: "Montserrat", serif;

// `;

// const ToggleButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   position: absolute;
//   top: 40px;
//   left: ${({ isOpen }) => (isOpen ? '180px' : '0')}; /* Position button according to sidebar state */
//   transition: left 0.3s ease;
//   font-size:15px;
// `;

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   return (
//     <SidebarContainer isOpen={isOpen}>
//         <h2>ContextGPT</h2>
//       <h3>History</h3>
//       <ul>
//         <li>Item 1</li>
//         <li>Item 2</li>
//         <li>Item 3</li>
//       </ul>
//       <ToggleButton isOpen={isOpen} onClick={toggleSidebar}>
//         {isOpen ? 'Collapse' : 'Expand'}
//       </ToggleButton>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;























// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Sidebar as ProSidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar'; // Ensure correct import
// import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
// import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
// import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// const SidebarContainer = styled(ProSidebar)`
//   background: rgb(248, 250, 252);
//   color: black;
//   font-family: "Montserrat", serif;
// `;

// const SidebarHeader = styled.h2`
//   text-align: center;
//   margin: 20px 0;
// `;

// const CircleDiv = styled.div`
//   width: 40px; /* Adjust the size as needed */
//   height: 40px; /* Adjust the size as needed */
//   border-radius: 50%;
//   background-color: #007bff; /* Change to desired color */
//   margin: 20px auto; /* Center the circle */
// `;

// const ToggleButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   position: absolute;
//   bottom: 20px; /* Position the button at the bottom */
//   left: 15px;
//   z-index: 1000; /* Ensure the button is above other elements */
//   display: flex;
//   align-items: center; /* Center the icon vertically */
//   outline: none; /* Remove the default focus outline */
//   &:focus {
//     outline: none; /* Ensure no outline on focus */
//     box-shadow: none; /* Remove any box shadow */
//   }
// `;

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const { collapseSidebar } = useProSidebar(); // Use the hook correctly
//   const [isHistoryOpen, setIsHistoryOpen] = useState(false); // State to manage dropdown visibility

//   const handleToggle = () => {
//     toggleSidebar(); // Call the toggle function passed as a prop
//     collapseSidebar(); // Call collapseSidebar directly
//   };

//   const handleHistoryToggle = () => {
//     setIsHistoryOpen(!isHistoryOpen); // Toggle the dropdown
//   };

//   return (
//     <SidebarContainer>
//       {isOpen ? (
//         <SidebarHeader>ContextGPT</SidebarHeader>
//       ) : (
//         <CircleDiv /> // Render the circle when collapsed
//       )}
//       <Menu>
//         <MenuItem icon={<AccountCircleRoundedIcon />}>User  Profile</MenuItem>
//         <MenuItem icon={<SettingsApplicationsRoundedIcon />}>Settings</MenuItem>
//         <MenuItem icon={isHistoryOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />} onClick={handleHistoryToggle}>
//           <span>History</span>
//         </MenuItem>
//         {isHistoryOpen && (
//           <Menu>
//             <MenuItem>Search Query 1</MenuItem>
//             <MenuItem>Search Query 2</MenuItem>
//             <MenuItem>Search Query 3</MenuItem>
//           </Menu>
//         )}
//         <MenuItem icon={<LogoutRoundedIcon />}>Logout</MenuItem>
//       </Menu>
//       <ToggleButton onClick={handleToggle}>
//         {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />} {/* Use icons instead of text */}
//       </ToggleButton>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;
















  // WORKS PERFECTLY
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Sidebar as ProSidebar, Menu as ProMenu, MenuItem as ProMenuItem, useProSidebar } from 'react-pro-sidebar'; // Rename Menu and MenuItem
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
//   color:#D2FF72;
//   font-weight:700;
//   margin-left:-35px;
// `;

// const CircleDiv = styled.div`
//   width: 40px; /* Adjust the size as needed */
//   height: 40px; /* Adjust the size as needed */
//   border-radius: 50%;
//   background-color: #D2FF72; /* Change to desired color */
//   margin: 20px auto; /* Center the circle */
// `;

// const StyledMenu = styled(ProMenu)`
//   margin-bottom: 20px;
// `;

// const MenuItem = styled(ProMenuItem)`
//   margin: 10px 0; /* Add spacing between menu items */
// `;

// const ToggleButton = styled.button`
//   background-color: #D2FF72; /* Change to desired color */
//   color: rgb(37, 37, 37);
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   position: absolute;
//   bottom: 20px; /* Position the button at the bottom */
//   left: 15px;
//   z-index: 1000; /* Ensure the button is above other elements */
//   display: flex;
//   align-items: center; /* Center the icon vertically */
//   outline: none; /* Remove the default focus outline */
//   &:focus {
//     outline: none; /* Ensure no outline on focus */
//     box-shadow: none; /* Remove any box shadow */
//   }
// `;

// const Sidebar = () => {
//   const { collapseSidebar } = useProSidebar(); // Use the hook correctly
//   const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
//   const [isHistoryOpen, setIsHistoryOpen] = useState(false); // State to manage dropdown visibility

//   const handleToggle = () => {
//     setIsOpen(!isOpen); // Toggle the sidebar open/close state
//     collapseSidebar(); // Call collapseSidebar directly
//   };

//   const handleHistoryToggle = () => {
//     setIsHistoryOpen(!isHistoryOpen); // Toggle the dropdown
//   };

//   return (
//     <SidebarContainer collapsed={!isOpen}>
//       {isOpen ? (
//         <SidebarHeader>ContextGPT</SidebarHeader>
//       ) : (
//         <CircleDiv /> // Render the circle when collapsed
//       )}
//       <StyledMenu>
//         <MenuItem icon={<AccountCircleRoundedIcon />}>User  Profile</MenuItem>
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
//                 <MenuItem icon={<SettingsApplicationsRoundedIcon />}>Settings</MenuItem>

//         <MenuItem icon={<LogoutRoundedIcon />}>Logout</MenuItem>
//       </StyledMenu>
//       <ToggleButton onClick={handleToggle}>
//         {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />} {/* Use icons instead of text */}
//       </ToggleButton>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;























































import React, { useState } from 'react';
import styled from 'styled-components';
import { Sidebar as ProSidebar, Menu as ProMenu, MenuItem as ProMenuItem, useProSidebar } from 'react-pro-sidebar'; // Rename Menu and MenuItem
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const { collapseSidebar } = useProSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Get user from localStorage
    }
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    collapseSidebar();
  };

  const handleHistoryToggle = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.clear(); // Clear session data
    navigate('/'); // Redirect to landing page
  };

  return (
    <SidebarContainer collapsed={!isOpen}>
      {isOpen ? (
        <SidebarHeader>ContextGPT</SidebarHeader>
      ) : (
        <CircleDiv />
      )}
      <StyledMenu>
        <MenuItem icon={<AccountCircleRoundedIcon />}>User Profile</MenuItem>
        <MenuItem icon={isHistoryOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />} onClick={handleHistoryToggle}>
          <span>History</span>
        </MenuItem>
        {isHistoryOpen && (
          <StyledMenu>
            <MenuItem>Search Query 1</MenuItem>
            <MenuItem>Search Query 2</MenuItem>
            <MenuItem>Search Query 3</MenuItem>
          </StyledMenu>
        )}
        <MenuItem icon={<SettingsApplicationsRoundedIcon />}>Settings</MenuItem>
        <MenuItem icon={<LogoutRoundedIcon />} onClick={handleLogout}>Logout</MenuItem>
      </StyledMenu>
      <ToggleButton onClick={handleToggle}>
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ToggleButton>
    </SidebarContainer>
  );
};

export default Sidebar;
