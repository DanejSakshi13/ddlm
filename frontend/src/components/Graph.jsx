// import React from "react";
// import styled from "styled-components";



// const GraphContainer = styled.div`
//   text-align: center;
//   margin-left: 130px;
//   background-color:rgb(37, 37, 37);
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   max-width: 80%;
//   min-height: 50px; /* Ensures a small default height */
//   padding: 10px; /* Adds spacing */
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   border: 0.5px #5f5f5f solid;

// `;


// const GraphImage = styled.img`
//   max-width: 90%;
//   max-height: 320px; /* Restrict max height */
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   margin-bottom: 15px;
// `;


// const NoDataMessage = styled.p`
//   color:#D2FF72;;
//   // font-weight: bold;
//   padding:0;
//   margin:0;
//   font-size:0.80rem;

// `;

// const Title = styled.h3`
//   color: white;
//   // margin-bottom: 15px;
//   font-size: 1rem;
//   padding:0;
//   margin-top:10px;
//   margin-left:25px;
//   text-align:left;
//   margin-bottom:0px;
// `;

// const Graph = ({ graphUrl }) => {
//   return (
//     <GraphContainer>
//       <Title>Extracted Table Graph</Title>
//       {graphUrl === "no-data" ? (
//         <NoDataMessage>No numeric data available for visualization</NoDataMessage>
//       ) : graphUrl ? (
//         <GraphImage src={graphUrl} alt="Extracted Table Graph" />
//       ) : null}
//     </GraphContainer>
//   );
// };

// export default Graph;






// import React from "react";
// import styled from "styled-components";

// const GraphContainer = styled.div`
//   text-align: center;
//   margin-left: 130px;
//   background-color: rgb(37, 37, 37);
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   max-width: 80%;
//   min-height: 50px;
//   padding: 10px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   border: 0.5px #5f5f5f solid;
//   margin-bottom: 20px;
// `;

// const GraphImage = styled.img`
//   max-width: 90%;
//   max-height: 320px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   margin-bottom: 15px;
// `;

// const NoDataMessage = styled.p`
//   color: #D2FF72;
//   font-size: 0.80rem;
//   padding: 0;
//   margin: 0;
// `;

// const Title = styled.h3`
//   color: white;
//   font-size: 1rem;
//   padding: 0;
//   margin-top: 10px;
//   margin-left: 25px;
//   text-align: left;
//   margin-bottom: 10px;
// `;

// const TableContainer = styled.div`
//   width: 90%;
//   margin-bottom: 15px;
//   overflow-x: auto;
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   color: white;
//   font-size: 0.9rem;
// `;

// const TableHeader = styled.th`
//   border: 1px solid #5f5f5f;
//   padding: 8px;
//   background-color: rgb(50, 50, 50);
// `;

// const TableCell = styled.td`
//   border: 1px solid #5f5f5f;
//   padding: 8px;
// `;

// const Graph = ({ table, graph }) => {
//   const pieSrc = graph?.pie_url;
//   const barSrc = graph?.bar_url;
//   const oldSrc = graph?.url; // For old analyses
//   const tableData = table?.table_data || [];

//   return (
//     <GraphContainer>
//       <Title>Table {table?.index ?? graph?.table_index ?? "Unknown"}</Title>
//       {tableData.length > 0 ? (
//         <TableContainer>
//           <Table>
//             <tbody>
//               {tableData.map((row, rowIndex) => (
//                 <tr key={`row-${rowIndex}`}>
//                   {row.map((cell, cellIndex) => (
//                     <React.Fragment key={`cell-${rowIndex}-${cellIndex}`}>
//                       {rowIndex === 0 ? (
//                         <TableHeader>{cell || ""}</TableHeader>
//                       ) : (
//                         <TableCell>{cell || ""}</TableCell>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </TableContainer>
//       ) : (
//         <NoDataMessage>No table data available</NoDataMessage>
//       )}
//       {pieSrc || barSrc || oldSrc ? (
//         <>
//           {pieSrc && (
//             <GraphImage src={pieSrc} alt={`Table ${table?.index ?? graph?.table_index} Pie Chart`} />
//           )}
//           {barSrc && (
//             <GraphImage src={barSrc} alt={`Table ${table?.index ?? graph?.table_index} Bar Chart`} />
//           )}
//           {oldSrc && !pieSrc && !barSrc && (
//             <GraphImage src={oldSrc} alt={`Table ${graph?.table_index} Graph`} />
//           )}
//         </>
//       ) : (
//         <NoDataMessage>No graphs available for this table</NoDataMessage>
//       )}
//     </GraphContainer>
//   );
// };

// export default Graph;

















































import React, { useState } from "react";
import styled from "styled-components";

const GraphContainer = styled.div`
  text-align: center;
  background-color: rgb(37, 37, 37);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  min-height: 50px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0.5px #5f5f5f solid;
  margin-bottom: 20px;
`;

const TableImage = styled.img`
  max-width: 90%;
  max-height: 400px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const GraphImage = styled.img`
  max-width: 90%;
  max-height: 320px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.8rem;
  padding: 0;
  margin: 10px 0;
`;

const NoDataMessage = styled.p`
  color: #d2ff72;
  font-size: 0.8rem;
  padding: 0;
  margin: 10px 0;
`;

const Title = styled.h3`
  color: white;
  font-size: 1rem;
  padding: 0;
  margin-top: 10px;
  margin-left: 25px;
  text-align: left;
  margin-bottom: 10px;
`;

const Dropdown = styled.select`
  padding: 8px;
  margin-bottom: 15px;
  border-radius: 4px;
  background-color: rgb(50, 50, 50);
  color: white;
  border: 1px solid #5f5f5f;
  cursor: pointer;
`;

const Graph = ({ table }) => {
  const [selectedChart, setSelectedChart] = useState("");
  const tableImageSrc = table?.image_url;
  const tableIndex = table?.index ?? "Unknown";
  const tableData = table?.table_data || [];
  const pieUrl = table?.pie_url;
  const barUrl = table?.bar_url;
  const pieError = table?.pie_error;
  const barError = table?.bar_error;

  const handleChartChange = (e) => {
    setSelectedChart(e.target.value);
  };

  // Detect if the first row is a merged header
  const isMergedHeader = tableData.length > 0 && tableData[0].length === 1;

  return (
    <GraphContainer>
      <Title>Table {tableIndex}</Title>
      {/* {tableImageSrc ? (
        <TableImage src={tableImageSrc} alt={`Table ${tableIndex}`} />
      ) : (
        <NoDataMessage>No table image available</NoDataMessage>
      )} */}
      {tableData.length > 0 && (
        <div style={{ overflowX: "auto", marginBottom: "15px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", color: "white" }}>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {isMergedHeader && rowIndex === 0 ? (
                    <td
                      colSpan={tableData.length > 1 ? tableData[0].length * (tableData.length - 1) : tableData[0].length}
                      style={{
                        border: "1px solid #5f5f5f",
                        padding: "8px",
                        textAlign: "left",
                        fontSize: "10px",
                      }}
                    >
                      {row[0]}
                    </td>
                  ) : (
                    row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        style={{
                          border: "1px solid #5f5f5f",
                          padding: "8px",
                          textAlign: "left",
                          fontSize: "10px",
                        }}
                      >
                        {cell}
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Dropdown value={selectedChart} onChange={handleChartChange}>
        <option value="">Select Chart Type</option>
        <option value="pie">Pie Chart</option>
        <option value="bar">Bar Chart</option>
      </Dropdown>
      {selectedChart === "pie" && (
        <>
          {pieUrl ? (
            <GraphImage src={pieUrl} alt={`Table ${tableIndex} Pie Chart`} />
          ) : (
            <ErrorMessage>
              {pieError || "Pie chart cannot be generated for this table"}
            </ErrorMessage>
          )}
        </>
      )}
      {selectedChart === "bar" && (
        <>
          {barUrl ? (
            <GraphImage src={barUrl} alt={`Table ${tableIndex} Bar Chart`} />
          ) : (
            <ErrorMessage>
              {barError || "Bar chart cannot be generated for this table"}
            </ErrorMessage>
          )}
        </>
      )}
      {!selectedChart && (
        <NoDataMessage>Select a chart type to view</NoDataMessage>
      )}
    </GraphContainer>
  );
};

export default Graph;