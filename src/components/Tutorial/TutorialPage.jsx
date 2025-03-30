import MainChatComponent from "../ChatComponents/MainChatComponent";
import InstructionPanel from "../Instructions/InstructionPanel";
import Header from "../Header/Header";
import { useState } from "react";
import RecordingStream from "../RecordingStream/RecordingStream";
import ProblemStatement from "../CodingProblems/ProblemStatement";
import CodeEditor from "../CodingProblems/CodeEditor";
import TestCases from "../CodingProblems/TestCases";
import { useNavigate } from "react-router-dom";

const Modal = ({
  content,
  header,
  onNext,
  onSkip,
  onPrevious,
  onClose,
  customPosition,
  isCentered,
  currentStep,
  handleNextPage,
}) => {
  return (
    <div
      className={`z-50 bg-white shadow-lg p-4 rounded-xl border border-gray-300 max-w-[400px] ${
        isCentered
          ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          : `absolute ${customPosition}`
      }`}
    >
      <div className="text-center">
        <div className="text-header mb-2">{header}</div>
        <div className="mb-8 text-[1rem] text-[#61605F]">{content}</div>
        {currentStep === 0 ? (
          <div className="font-bold text-[1rem] text-[#61605F]">
            No worries! Timer hasn’t started yet
          </div>
        ) : null}
      </div>

      <div className="flex justify-between mt-4">
        <div className="flex items-center text-[#61605F]">
          {currentStep + 1}/9
        </div>
        <div>
          <button
            className="px-4 py-2 rounded"
            onClick={currentStep === 0 ? onSkip : onPrevious}
          >
            {currentStep === 0 ? "Skip" : "Next"}
          </button>
          <button
            className="px-4 py-2 border-2 border-input-border  rounded"
            onClick={currentStep === 8 ? handleNextPage : onNext}
          >
            {currentStep === 8 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

const TutorialPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [outputDetails, setOutputDetails] = useState([]);
  const [consoleDetails, setConsoleDetails] = useState([]);
  const [messageDetails, setMessageDetails] = useState([]);
  const [memoryDetails, setMemoryDetails] = useState([]);
  const [timeDetails, setTimeDetails] = useState([]);
  const [inputType, setInputType] = useState("array");
  const [question, setQuestion] = useState();
  const navigate = useNavigate();

  const allMessagesAccepted =
    messageDetails.length > 0 &&
    messageDetails.every((message) => message === "Accepted");

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

  const steps = [
    {
      component: "Header",
      header: "Welcome to Stage 1!",
      modalText:
        "Hey John! Let’s get you familiar with the platform before you dive into your interview. ",
      position: "top-2 left-20",
      isCentered: true,
    },
    {
      component: "Header",
      header: "Look out for Timer",
      modalText:
        " The timer at the top of the screen shows how much time you have left for the interview. Keep an eye on it, but don’t rush—accuracy matters more than speed! ",
      position: "top-20 left-5",
      isCentered: false,
    },
    {
      component: "MainChatComponent",
      header: "Help & Support",
      modalText: "Having any trouble, report the issue here",
      position: "top-20 right-5",
      isCentered: false,
    },
    {
      component: "RecordingStream",
      header: "Video",
      modalText: "Click and drag it anywhere to keep it out of the way!",
      position: "left-60 top-11/16",
      isCentered: false,
    },
    {
      component: "MainChatComponent",
      header: "Start your AI interview",
      modalText:
        "Click “Start Conversation” button to start you interview with AI interviewer",
      position: "left-[23%] top-[45%]",
      isCentered: false,
    },
    {
      component: "CodeEditor",
      header: "Editor",
      modalText: "This is where you wil show your coding skills.",
      position: "left-[20%] top-[8%]",
      isCentered: false,
    },
    {
      component: "ProblemStatement",
      header: "Your problem statement",
      modalText:
        "Here you can see your problem statement and instruction needs to be followed during conversation",
      position: "right-[28%] top-[8%]",
      isCentered: false,
    },
    {
      component: "MainChatComponent",
      header: "Conversation with Interviewer",
      modalText:
        "Here, the interviewer will ask some questions about the problem you are solving",
      position: "right-[28%] top-[17%]",
      isCentered: false,
    },
    {
      component: "MainChatComponent",
      header: "Start the test!",
      modalText:
        "That's all for now! The timer will start once you click “Finish” button. Wishing you the best of luck",
      position: "right-[28%] top-[17%]",
      isCentered: true,
    },
  ];

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };
  const handleSkip = () => {
    setCurrentStep(8);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  const handleNextPage = () => {
    navigate("/instructions");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {currentStep <= 4 ? (
        <>
          <div
            className={
              currentStep === 1 || currentStep === 2 ? "blur-none" : "blur-sm"
            }
          >
            <Header />
          </div>
          <div
            className={`
              fixed left-5 right-0 top-[68%] z-[15] pointer-events-none
              ${currentStep === 3 ? "blur-none" : "blur-sm"}
            `}
            style={{ transform: "translateY(-50%)" }}
          >
            <RecordingStream />
          </div>

          <div
            className="py-2 px-2"
            style={{
              display: "grid",
              gridTemplateColumns: "50% 50%",
              height: "92vh",
            }}
          >
            <div
              className={currentStep === 5 ? "blur-none pr-1" : "blur-sm pr-1"}
            >
              <InstructionPanel />
            </div>

            <div
              className={currentStep === 4 ? "blur-none pl-1" : "blur-sm pl-1"}
            >
              <MainChatComponent />
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={
              currentStep === 1 || currentStep === 2 ? "blur-none" : "blur-sm"
            }
          >
            <Header />
          </div>
          <div
            className="py-2 px-2"
            style={{
              display: "grid",
              gridTemplateColumns: "45% 55%",
              height: "92vh",
              minHeight: 0,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              className="h-full"
              style={{
                display: "grid",
                gridTemplateRows: currentStep == 7 ? "54px 1fr" : "1fr 54px",
                minHeight: 0,
              }}
            >
              <div
                className={`pb-2 ${
                  currentStep === 6 ? "blur-none" : "blur-sm"
                } `}
                style={{ minHeight: 0 }}
              >
                <ProblemStatement
                  question={question}
                  currentStep={currentStep}
                />
              </div>

              <div
                className={`pb-2 ${
                  currentStep === 7 ? "blur-none" : "blur-sm"
                } `}
                style={{ minHeight: 0 }}
              >
                <MainChatComponent />
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
              <div
                className={`pb-2 px-2 ${
                  currentStep === 5 ? "blur-none" : "blur-sm"
                } `}
                style={{ minHeight: 0 }}
              >
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

              <div
                className={`px-2 ${
                  currentStep === 3 ? "blur-none" : "blur-sm"
                } `}
                style={{ minHeight: 0 }}
              >
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
          </div>
        </>
      )}

      {isModalOpen && (
        <Modal
          content={steps[currentStep].modalText}
          onNext={handleNext}
          onSkip={handleSkip}
          onPrevious={handlePrevious}
          onClose={handleCloseModal}
          header={steps[currentStep].header}
          customPosition={steps[currentStep].position}
          isCentered={steps[currentStep].isCentered}
          currentStep={currentStep}
          handleNextPage={handleNextPage}
        />
      )}
    </>
  );
};

export default TutorialPage;
