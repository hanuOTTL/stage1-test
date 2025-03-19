import Questions from "./Questions";
import ProblemStatement from "./ProblemStatement";
import ExpandableChatWindow from "../ExpandableChatWindow/ExpandableChatWindow";
import RecordingStream from "../VideoPlayer/VideoPlayer";
import { useState } from "react";

const McqQuestion = () => {
  const [isSelectedQuestion, setIsSelectedQuestion] = useState(false)
  const [problemStatement, setProblemStatement] = useState(
    "Write a Python function to add two numbers"
  );
  const [problemHeading, setProblemHeading] = useState("1) Add Two Numbers");
  const Answers = {
    option1: 'print("hello world")',
    option2: "def add(a,b); return a+b",
    option3: "if __name__ == '__main__': print(add(5,3))",
    option4: "for i in range(5): print i",
  };

  return (
    <div
      className="py-2 px-2 overflow-hidden"
      style={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
        height: "92vh",
      }}
    >
      {/* <div className="pr-1">
        <ProblemStatement
          ProblemStatement={problemStatement}
          ProblemHeading={problemHeading}
        />
      </div> */}

      {/* <div className="grid">
        <div className="col-start-1 row-start-1 pl-1">
          <Questions Answers={Answers} setIsSelectedQuestion= {setIsSelectedQuestion} />
        </div>
        <div className="col-start-1 row-start-1 pl-1 ">
          <ExpandableChatWindow isSelectedQuestion={isSelectedQuestion} />
        </div>
      </div> */}
      <div>

      </div>
        <RecordingStream sessionId='332' candidateId='333'/>
    </div>
  );
};

export default McqQuestion;
