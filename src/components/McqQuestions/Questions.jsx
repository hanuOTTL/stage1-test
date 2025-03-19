import { Box } from "@mui/material";
import { TextField, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import QuestionBox from "./QuestionBox";

import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

const Questions = ({ Answers, setIsSelectedQuestion }) => {
  const [selected, setSelected] = useState("");

  const selectFunction = () =>{

  }

  console.log(Answers);

  return (
    <Box
      className="rounded-md border-2 border-[#EBEAE6] h-full overflow-auto"
      style={{ maxHeight: "calc(50vh-50px)" }}
    >
      <div className="w-full bg-box-header rounded-t-button py-5 px-4 flex justify-between">
        <div className="px-3.5 py-2.5">Select from the Options below</div>
        <button
          className=" text-white rounded-button inline-block px-3.5 py-2.5 mx-5 cursor-pointer"
          style={{
            backgroundColor: "#008000",
            paddingLeft: "0.875rem",
            paddingRight: "0.875rem",
            paddingTop: "0.625rem",
            paddingBottom: "0.625rem",
          }}
        >
          Submit and Next
        </button>
      </div>

      <div className="w-full p-4 flex flex-col z-2">
        {Object.entries(Answers).map(([key, value], index) => (
          <QuestionBox
            key={index}
            question={value}
            selected={selected}
            setSelected={setSelected}
            optionKey={key}
            setIsSelectedQuestion={setIsSelectedQuestion}
          />
        ))}
      </div>
    </Box>
  );
};

export default Questions;
