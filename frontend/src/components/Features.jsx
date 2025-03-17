// import React from 'react';
// import styled from 'styled-components';

// const featuresData = [
//     { title: 'Feature 1', description: 'Description of feature 1.' },
//     { title: 'Feature 2', description: 'Description of feature 2.' },
//     { title: 'Feature 3', description: 'Description of feature 3.' },
//     { title: 'Feature 4', description: 'Description of feature 4.' },
//     { title: 'Feature 5', description: 'Description of feature 5.' }
//     // Add more features as needed
// ];

// const FeaturesContainer = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     // justify-content: space-around; /* Adjusts spacing between boxes */
//     margin-left: 23% ; /* Space above and below the feature boxes */
//     width:90%;
//     margin-top:-20px;
// `;

// const FeatureBox = styled.div`
//     background-color:rgb(190, 214, 255); 
//     border: 1px solid #ccc; /* Light border */
//     border-radius: 8px; /* Rounded corners */
//     padding:  20px; /* Space inside the box */
//     text-align:center;
//     margin: 10px; /* Space between boxes */
//     width: 30px; /* Fixed width for each box */
//     height: 30px;
//     text-align: center; /* Center text */
//     box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
//     transition: transform 0.2s; /* Animation on hover */

//     &:hover {
//         transform: scale(1.05); /* Slightly enlarge on hover */
//     }
// `;

// const Features = () => {
//     return (
//         <FeaturesContainer>
//             {featuresData.map((feature, index) => (
//                 <FeatureBox key={index}>
//                     <p>{feature.title}</p>
//                     {/* <p>{feature.description}</p> */}
//                 </FeatureBox>
//             ))}
//         </FeaturesContainer>
//     );
// };

// export default Features;





import React from 'react';
import styled from 'styled-components';
import SummarizeIcon from '@mui/icons-material/Summarize'; // Icon for summarization
import BarChartIcon from '@mui/icons-material/BarChart'; // Icon for graph
import AnalyticsIcon from '@mui/icons-material/Analytics'; // Icon for analysis
import LabelImportantIcon from '@mui/icons-material/LabelImportant'; // Icon for keywords
import SearchIcon from '@mui/icons-material/Search'; // Icon for search

const featuresData = [
    { icon: <SummarizeIcon fontSize="medium" /> },
    { icon: <BarChartIcon fontSize="medium" /> },
    { icon: <AnalyticsIcon fontSize="medium" /> },
    { icon: <LabelImportantIcon fontSize="medium" /> },
    { icon: <SearchIcon fontSize="medium" /> }
];

const FeaturesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Center the icons */
    margin: 20px auto; /* Center the container */
    width: 90%;
    margin-top:-20px;
`;

const FeatureBox = styled.div`
    background-color:rgb(37,37,37); 
    //   background: linear-gradient(135deg,#9ccfff,#c3d9ff); /* Vibrant gradient background */
    // border: 1px solid #ccc; /* Light border */
    border-radius: 13px; /* Rounded corners */
    padding: 20px; /* Space inside the box */
    margin: 10px; /* Space between boxes */
    width: 20px; /* Fixed width for each box */
    height: 20px; /* Fixed height for each box */
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Subtle shadow */
    transition: transform 0.3s, background-color 0.3s; /* Animation on hover */

    &:hover {
        transform: scale(1.1); /* Slightly enlarge on hover */
        background-color: rgb(36, 36, 36); /* Change background color on hover */
    }

    svg {
        color: #D2FF72; /* Icon color */
        transition: color 0.3s; /* Smooth color transition */
    }

    &:hover svg {
        color: #D2FF72; /* Change icon color on hover */
    }
`;

const Features = () => {
    return (
        <FeaturesContainer>
            {featuresData.map((feature, index) => (
                <FeatureBox key={index}>
                    {feature.icon}
                </FeatureBox>
            ))}
        </FeaturesContainer>
    );
};

export default Features;