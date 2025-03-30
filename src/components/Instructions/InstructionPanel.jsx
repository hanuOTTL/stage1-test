import { Box } from "@mui/material";

const InstructionPanel = () => {
  return (
    <Box className="rounded-md border-2 border-[#EBEAE6] h-full overflow-auto">
      <div className="w-full bg-box-header rounded-t-button py-2 px-2 flex justify-between">
        <div className="py-1.5">Instructions</div>
      </div>
        <div className="p-4">
          <div className="w-full">
            <h1 className="text-[24px] font-semibold">Instructions</h1>
            <p className="">
              To begin your interview with the AI, select the Start Conversation
              button on the right.
              <br />
              <br />
              The AI will ask basic questions and dive deeper depending on your
              responses. Keep in mind that once the interview begins, you won’t
              be able to restart it. <br /> <br />
              If your answers are longer, the AI may take a moment to process
              before continuing. Please note that taking too long to reply may
              impact the flow of the interview and directly move to the next
              question when the timer ends.
              <br /> <br />
              If you’re unsure about an answer, no worries! You can choose Stop
              Conversation to proceed to the next question
            </p>
          </div>
        </div>
    </Box>
  );
};

export default InstructionPanel;
