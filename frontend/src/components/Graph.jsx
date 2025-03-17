import React from "react";
import styled from "styled-components";

// const GraphContainer = styled.div`
// //   margin-top: 20px;
//   text-align: center;
//   margin-left:130px;
//   background-color: #e3f2fd;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     max-width: 80%;
//     height:320px;

// `;

const GraphContainer = styled.div`
  text-align: center;
  margin-left: 130px;
  background-color:rgb(37, 37, 37);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  min-height: 50px; /* Ensures a small default height */
  padding: 10px; /* Adds spacing */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0.5px #5f5f5f solid;

`;


// const GraphImage = styled.img`
//   max-width: 90%;
//   height: 75%;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   // margin-top:15px;
//     margin-bottom:15px;
// `;

const GraphImage = styled.img`
  max-width: 90%;
  max-height: 320px; /* Restrict max height */
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 15px;
`;


const NoDataMessage = styled.p`
  color:#D2FF72;;
  // font-weight: bold;
  padding:0;
  margin:0;
  font-size:0.80rem;

`;

const Title = styled.h3`
  color: white;
  // margin-bottom: 15px;
  font-size: 1rem;
  padding:0;
  margin-top:10px;
  margin-left:25px;
  text-align:left;
  margin-bottom:0px;
`;

const Graph = ({ graphUrl }) => {
  return (
    <GraphContainer>
      <Title>Extracted Table Graph</Title>
      {graphUrl === "no-data" ? (
        <NoDataMessage>No numeric data available for visualization</NoDataMessage>
      ) : graphUrl ? (
        <GraphImage src={graphUrl} alt="Extracted Table Graph" />
      ) : null}
    </GraphContainer>
  );
};

export default Graph;
