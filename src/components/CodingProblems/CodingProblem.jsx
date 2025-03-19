import CodeEditor from "./CodeEditor";
import TestCases from "./TestCases";
import ProblemStatement from "./ProblemStatement";
import Conversation from "./Conversation";
import ExpandableChatWindow from "../ExpandableChatWindow/ExpandableChatWindow";

import { useState } from "react";

const CodingProblem = () => {
  const [outputDetails, setOutputDetails] = useState([]);
  const [consoleDetails, setConsoleDetails] = useState([]);
  const [messageDetails, setMessageDetails] = useState([]);
  const [memoryDetails, setMemoryDetails] = useState([]);
  const [timeDetails, setTimeDetails] = useState([]);
  const [inputType, setInputType] = useState("array");
  const [question, setQuestion] = useState();
  const testCaseValues = {
    "Test Case 1": {
      input: "1, 2, 3, 4, 5",
      expected_output: "15",
    },
    "Test Case 2": {
      input: "10, 20, 30, 40",
      expected_output: "100",
    },
    "Test Case 3": {
      input: "-5, -10, 15",
      expected_output: "0",
    },
  };

  return (
    <div
      className="pt-2 px-2"
      style={{
        display: "grid",
        gridTemplateColumns: "45% 55%",
        height: "85vh",
      }}
    >
      <div
        className="h-full"
        style={{
          display: "grid",
          gridTemplateRows: "45% 50%",
          height: "100%",
        }}
      >
        <div className="pb-2">
          <ProblemStatement question={question} />
        </div>

        <div>
          <Conversation />
        </div>
      </div>

      <div
        className="h-full"
        style={{
          display: "grid",
          gridTemplateRows: "45% 50%",
          height: "100%",
          maxHeight: "calc(90vh-50px)",
        }}
      >
        <div className="grid">
          <div className="col-start-1 row-start-1 pl-1">
            <div className="px-2 pb-2">
              <CodeEditor
                setOutputDetails={setOutputDetails}
                setConsoleDetails={setConsoleDetails}
                testCaseValues={testCaseValues}
                setMemoryDetails={setMemoryDetails}
                setTimeDetails={setTimeDetails}
                setMessageDetails={setMessageDetails}
                inputType={inputType}
              />
            </div>
            <div className="px-2">
              <TestCases
                outputDetails={outputDetails}
                consoleDetails={consoleDetails}
                testCaseValues={testCaseValues}
                messageDetails={messageDetails}
                memoryDetails={memoryDetails}
                timeDetails={timeDetails}
              />
            </div>
          </div>
          <div className="col-start-1 row-start-1 pl-1 ">
            <ExpandableChatWindow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingProblem;
