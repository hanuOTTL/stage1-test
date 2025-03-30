import { Box } from "@mui/material";
import { TextField, TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";

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
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("testCases");


  useEffect(() => {
    if (consoleDetails.length != 0) {
      setActiveTab("terminal");
    }
  }, [consoleDetails]);

  const handleTestCaseClick = (index) => {
    setSelectedTestCaseIndex(index);
  };


  return (
    <Box className="rounded-md border-2 border-[#EBEAE6] h-full overflow-auto">
      <div className="w-full bg-box-header rounded-t-button py-2 px-2 flex justify-between">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 ${
              activeTab === "terminal"
                ? "border-b-2 border-[#7F3F98] text-[#7F3F98] font-semibold"
                : "text-[#989793] font-semibold"
            }`}
            onClick={() => setActiveTab("terminal")}
          >
            Terminal
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "testCases"
                ? "border-b-2 border-[#7F3F98] text-[#7F3F98] font-semibold"
                : "text-[#989793] font-semibold"
            }`}
            onClick={() => setActiveTab("testCases")}
          >
            Test Cases
          </button>
        </div>
      </div>

      <div className="w-full p-4">
        {activeTab === "testCases" ? (
          <div>
            <div className="mb-4">
              <div className="flex flex-row gap-3 justify-between">
                <div>
                  {Object.keys(testCaseValues).map((testCase, index) => (
                    <button
                      key={index}
                      className={`inline-block px-2 py-1.5 mr-3 cursor-pointer ${
                        selectedTestCaseIndex === index
                          ? "rounded-sm border-2 border-[#DEDDDA]"
                          : ""
                      }`}
                      onClick={() => handleTestCaseClick(index)}
                    >
                      {messageDetails[index] === "Accepted" ? (
                        <CheckIcon
                          style={{
                            color: "green",
                            marginRight: 5,
                            paddingBottom: 5,
                          }}
                        />
                      ) : messageDetails[index] === "Wrong Answer" ? (
                        <CancelIcon
                          style={{
                            color: "red",
                            marginRight: 5,
                            paddingBottom: 5,
                          }}
                        />
                      ) : null}
                      Case {index+1}
                    </button>
                  ))}
                </div>
                <div className="flex flex-row gap-5">
                  <div className="flex flex-row items-center gap-x-2">
                    <span className="font-semibold">Time:</span>
                    <div className="text-gray-500">
                      {timeDetails[
                        Object.keys(timeDetails)[selectedTestCaseIndex]
                      ] + " s" || "N/A"}
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-x-2">
                    <span className="font-semibold">Memory:</span>
                    <div className="text-gray-500">
                      {memoryDetails[
                        Object.keys(memoryDetails)[selectedTestCaseIndex]
                      ] + " kB" || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between w-full mt-4">
                <div className="flex flex-col mr-4 w-1/2">
                  <div className="mb-2">
                    <span className="font-semibold">Input</span>
                    <TextField
                      value={
                        testCaseValues[
                          Object.keys(testCaseValues)[selectedTestCaseIndex]
                        ]?.input?.replace(/\n/g, "  ") || ""
                      }
                      className="bg-input border-input-border border-1 rounded-box-radius w-full"
                      style={{ textAlign: "left" }}
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <span className="font-semibold ">Expected Output</span>
                  <TextField
                    value={
                      testCaseValues[
                        Object.keys(testCaseValues)[selectedTestCaseIndex]
                      ]?.expectedOutput || ""
                    }
                    className="bg-input border-input-border border-1 rounded-box-radius w-full"
                    style={{ textAlign: "left" }}
                  />
                </div>
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
          </div>
        ) : (
          <div>
            <div className="flex flex-col font-semibold w-full">
              <TextareaAutosize
                value={
                  consoleDetails[
                    Object.keys(consoleDetails)[selectedTestCaseIndex]
                  ] || ""
                }
                className="bg-input border-input-border border-1 p-3 text-sm1 rounded-box-radius overflow-auto resize-none"
                minRows="9"
                maxRows="9"
              />
            </div>
          </div>
        )}
      </div>
    </Box>
  );
};

export default TestCases;
