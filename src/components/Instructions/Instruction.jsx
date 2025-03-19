
import ChatBody from "../ChatComponents/ChatBody";
import ProblemStatement from "../CodingProblems/ProblemStatement";
import SearchBar from "../ChatComponents/SearchBar";
import MainChatComponent from "../ChatComponents/MainChatComponent"
import InstructionPanel from "./InstructionPanel";

import { useState } from "react";

const Instructions = () => {


  return (
    <div
      className="py-2 px-2"
      style={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
        height: "88vh",
      }}
    >
        <div className="pr-1">
          <InstructionPanel />
        </div>

      <div className="pl-1"
      >
        <MainChatComponent/>
      </div>
    </div>
  );
};

export default Instructions;
