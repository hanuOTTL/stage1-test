import React, { useState, useEffect, useContext } from "react";
import apiClient from "../../api/Axios";
import McqQuestion from "../McqQuestions/McqQuestion";
import CodingProblem from "../CodingProblems/CodingProblem";
import { fetchQuestions } from "../../api/apiRoutes";
import { PermissionsContext } from "../../contexts/PermissionsContext";
import EndModal from "./EndModal";

const QuestionSwitcher = () => {
  const [questionData, setQuestionData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);

  const { stopRecording } = useContext(PermissionsContext);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await apiClient.get(
          "/question?assessmentType=Full-Stack%20Developer"
        );
        setQuestionData(response?.data?.questions || []);
      } catch (error) {
        console.error("API call failed:", error);
      }
    };

    fetchQuestions();
  }, []);

  console.log(isEndModalOpen)

  if (questionData.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questionData[currentIndex];
  const { mcqOptions, questionText, _id, testCases, questionType } =
    currentQuestion;

  const handleNext = () => {
    if (currentIndex < questionData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    else{
      setIsEndModalOpen(true)
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderQuestion = () => {
    switch (questionType) {
      case "MCQ":
        return (
          <McqQuestion
            mcqOptions={mcqOptions}
            questionText={questionText}
            id={_id}
            nextFunction={handleNext}
          />
        );
      case "Coding":
        return (
          <CodingProblem
            questionText={questionText}
            testCases={testCases}
            id={_id}
            nextFunction={handleNext}
          />
        );
      default:
        return <div>Unknown question type</div>;
    }
  };

  return (
     <div >
      {/* <div>
        <p>Question {currentIndex + 1} of {questionData.length}</p>
      </div> */}

      {isEndModalOpen && <EndModal onClose={()=>{setIsEndModalOpen(false)}}/>}
      <div className={isEndModalOpen ? "blur-sm" : ""}>
      {renderQuestion()}
      </div>
      

      <div>
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === questionData.length - 1}
        >
          Next
        </button>
        <button
          onClick={() =>
            stopRecording(
              "67e3ce19e621dc006fb746a4",
              "67e3cd9be621dc006fb7469c"
            )
          }
        >
          Stop Recording
        </button>
      </div>
    </div>
  );
};

export default QuestionSwitcher;
