import { Box } from "@mui/material";

const ProblemStatement = ({ question }) => {
  return (
    <Box
    className="rounded-md border-2 border-[#EBEAE6] h-full overflow-auto"
  >
      <div className="w-full bg-box-header rounded-t-button py-2 px-2 flex justify-between">
        <div className="py-1.5">Problem Statement</div>
      </div>

      <div className="p-4">
        <div className="w-full">
          <h1 className="text-[24px] font-semibold">{question}</h1>
          {/* <p className="">{ProblemStatement}</p> */}
        </div>
      </div>
    </Box>
  );
};

export default ProblemStatement;
