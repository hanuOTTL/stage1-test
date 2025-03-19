import { Box } from "@mui/material";
import { TextField, TextareaAutosize } from "@mui/material";
import { useState } from "react";

// You might want to add these imports for tick and cross icons if you're using Material-UI icons
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

const TestCases = ({
  outputDetails,
  consoleDetails,
  testCaseValues,
  timeDetails,
  memoryDetails,
  messageDetails,
}) => {
  // Step 1: Initialize state for selected test case index
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0);

  console.log(testCaseValues);

  // Step 2: Define handler to update the selected test case
  const handleTestCaseClick = (index) => {
    setSelectedTestCaseIndex(index);
  };

  return (
    <Box
      className="rounded-md border-2 border-[#EBEAE6] h-full overflow-auto"
      style={{ maxHeight: "calc(50vh-50px)" }}
    >
      <div className="w-full bg-box-header rounded-t-button py-5 px-4 flex justify-between">
        <div className="px-3.5 py-2.5">Test Cases</div>
        <div>
          {/* Render buttons for each test case */}
          {Object.keys(testCaseValues).map((testCase, index) => (
            <button
              key={index}
              className={`inline-block px-3.5 py-2.5 mx-5 cursor-pointer ${
                selectedTestCaseIndex === index
                  ? "bg-white rounded-button" // Apply bg-white and rounded-button when selected
                  : ""
              } ${selectedTestCaseIndex !== index ? "bg-transparent" : ""}`} // Optionally set a different background for unselected buttons
              onClick={() => handleTestCaseClick(index)}
            >
              {messageDetails[index] === "Accepted" ? (
                <CheckIcon
                  style={{ color: "green", marginRight: 5, paddingBottom: 5 }}
                />
              ) : messageDetails[index] === "Wrong Answer" ? (
                <CancelIcon
                  style={{ color: "red", marginRight: 5, paddingBottom: 5 }}
                />
              ) : null}
              {testCase}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full p-4">
        <div className="flex justify-between w-full">
          <div className="flex flex-col font-semibold">
            Input
            <TextField
              value={
                testCaseValues[
                  Object.keys(testCaseValues)[selectedTestCaseIndex]
                ]?.input?.replace(/\n/g, "  ") || "" // Replace newlines with comma and space
              }
              className="bg-input border-input-border border-1 rounded-box-radius"
            />
          </div>

          <div className="flex flex-col font-semibold">
            Expected Output
            <TextField
              value={
                testCaseValues[
                  Object.keys(testCaseValues)[selectedTestCaseIndex]
                ]?.expected_output || "" // Access expected_output for the selected test case
              }
              className="bg-input border-input-border border-1 rounded-box-radius"
            />
          </div>
        </div>

        <div className="flex flex-col font-semibold w-full">
          Output
          <TextareaAutosize
            value={
              outputDetails[
                Object.keys(outputDetails)[selectedTestCaseIndex]
              ] || ""
            }
            className="bg-input border-input-border border-1 rounded-box-radius overflow-auto resize-none"
            minRows="2"
            maxRows="2"
          />
        </div>

        <div className="flex flex-col font-semibold w-full">
          Console
          <TextareaAutosize
            value={
              consoleDetails[
                Object.keys(consoleDetails)[selectedTestCaseIndex]
              ] || ""
            }
            className="bg-input border-input-border border-1 rounded-box-radius overflow-auto resize-none"
            minRows="2"
            maxRows="2"
          />
        </div>

        {/* Displaying Time, Memory, and Message Details */}
        <div className="flex justify-between w-full mt-4 ">
          <div className="flex flex-col font-semibold mr-4">
            Time
            <TextField
              value={
                timeDetails[Object.keys(timeDetails)[selectedTestCaseIndex]] +
                  " s" || "N/A"
              }
              className="bg-input border-input-border border-1 rounded-box-radius"
              readOnly
            />
          </div>

          <div className="flex flex-col font-semibold mr-4">
            Memory
            <TextField
              value={
                memoryDetails[
                  Object.keys(memoryDetails)[selectedTestCaseIndex]
                ] + " kB" || "0 s"
              }
              className="bg-input border-input-border border-1 rounded-box-radius"
              readOnly
            />
          </div>

          <div className="flex flex-col font-semibold">
            Message
            <TextField
              value={
                messageDetails[
                  Object.keys(messageDetails)[selectedTestCaseIndex]
                ] || ") kB"
              }
              className="bg-input border-input-border border-1 rounded-box-radius"
              readOnly
            />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default TestCases;
