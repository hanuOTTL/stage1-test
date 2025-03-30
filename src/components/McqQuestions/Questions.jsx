import { Box } from "@mui/material";
import { TextField, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import QuestionBox from "./QuestionBox";
import apiClient from "../../api/Axios";

import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

const Questions = ({ mcqOptions, setIsSelectedQuestion, nextFunction }) => {
  const [selected, setSelected] = useState();

  const submitAnswer = async () => {
    try {
      const answerData = {
        candidateId: "67e3cd9be621dc006fb7469c",
        interviewId: "67e3ce19e621dc006fb746a4",
        questionId: "67e24c28cd6210ac580bcdd2",
        selectedOption: selected+1,
        answerText: mcqOptions[selected]
      };
      const response = await apiClient.post('/answer', answerData);
      console.log(answerData)
      
      console.log('Answer submitted successfully:', response);
      nextFunction()
      setSelected(null)
      return response.data;
    } catch (error) {
      console.error('Failed to submit answer:', error.response?.data || error.message);
      throw error;  
    }
  };

  console.log(mcqOptions);

  return (
    <Box
      className="rounded-md border-2 border-[#EBEAE6] h-full overflow-auto"
      style={{ maxHeight: "calc(50vh-50px)" }}
    >
      <div className="w-full bg-box-header rounded-t-button py-2 px-2 flex justify-between">
        <div className="px-2 py-1.5">Select from the options below</div>
        <button className="bg-background-green text-white rounded-button inline-block px-2 py-1.5 mx-2 cursor-pointer" onClick={()=>submitAnswer()}>
            Submit and Next
          </button>
      </div>

      <div className="w-full p-4 flex flex-col z-2">
        {Object.entries(mcqOptions).map(([key, value], index) => (
          <QuestionBox
            key={index}
            question={value}
            selected={selected}
            setSelected={setSelected}
            optionKey={index}
            setIsSelectedQuestion={setIsSelectedQuestion}
            nextFunction={nextFunction}
          />
        ))}
      </div>
    </Box>
  );
};

export default Questions;
