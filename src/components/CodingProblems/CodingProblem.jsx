import { useContext, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import TestCases from "./TestCases";
import ProblemStatement from "./ProblemStatement";
import MainChatComponent from "./MainChatComponentCodeEditor";
import { ChatContext } from "../../contexts/ChatContext";

import { useState } from "react";

const CodingProblem = ({testCases, questionText, id, nextFunction}) => {
  const [outputDetails, setOutputDetails] = useState([]);
  const [consoleDetails, setConsoleDetails] = useState([]);
  const [messageDetails, setMessageDetails] = useState([]);
  const [memoryDetails, setMemoryDetails] = useState([]);
  const [timeDetails, setTimeDetails] = useState([]);
  const [inputType, setInputType] = useState("integer");
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState("");

  const {sendInitialAckMessage} = useContext(ChatContext)

  const interviewId = "67e3ce19e621dc006fb746a4"

  // interviewId,
  //   predefinedQuestionId,
  //   answer


  const allMessagesAccepted = messageDetails.length > 0 && messageDetails.every(
    (message) => message === "Accepted"
  );

 

  useEffect(()=>{
    if (allMessagesAccepted) {
      sendInitialAckMessage(interviewId, id, answer);
    }
  },[allMessagesAccepted])

  

  const testCaseValues = {
    "Case 1": {
      input: "1, 2, 3, 4, 5",
      expected_output: "15",
    },
    "Case 2": {
      input: "10, 20, 30, 40",
      expected_output: "100",
    },
    "Case 3": {
      input: "-5, -10, 15",
      expected_output: "0",
    },
  };

  return (
    <div
      className="py-2 px-2"
      style={{
        display: "grid",
        gridTemplateColumns: "45% 55%",
        height: "92vh",
        minHeight: 0,
      }}
    >
      <div
        className="h-full"
        style={{
          display: "grid",
          gridTemplateRows: allMessagesAccepted?"54px 1fr": "1fr 54px", 
          minHeight: 0,
        }}
      >
        <div
          className={`pb-2 `}
          style={{ minHeight: 0 }}
        >
          <ProblemStatement question={questionText} />
        </div>

        <div
          style={{ minHeight: '54px' }}
        >
          <MainChatComponent allMessagesAccepted={allMessagesAccepted}/>
        </div>
      </div>

      <div
        className="h-full"
        style={{
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          minHeight: 0,
        }}
      >
        <div className="px-2 pb-2" style={{ minHeight: 0 }}>
          <CodeEditor
            setOutputDetails={setOutputDetails}
            messageDetails={messageDetails}
            outputDetails={outputDetails}
            setConsoleDetails={setConsoleDetails}
            testCaseValues={testCases}
            setMemoryDetails={setMemoryDetails}
            setTimeDetails={setTimeDetails}
            setMessageDetails={setMessageDetails}
            inputType={inputType}
            nextFunction={nextFunction}
            id={id}
            setAnswer={setAnswer}
          />
        </div>

        <div className="px-2" style={{ minHeight: 0 }}>
          <TestCases
            outputDetails={outputDetails}
            consoleDetails={consoleDetails}
            testCaseValues={testCases}
            messageDetails={messageDetails}
            memoryDetails={memoryDetails}
            timeDetails={timeDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default CodingProblem;
