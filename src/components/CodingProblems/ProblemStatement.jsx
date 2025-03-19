import { Box } from "@mui/material";


const ProblemStatement = () => {


  return (
    <Box className="rounded-md border-2 border-[#EBEAE6] h-full">
      <div className="w-full bg-box-header rounded-t-button py-5 px-4 flex justify-between">
        <div className="py-2.5">Problem Statement</div>
      </div>

      <div className="p-4">
        <div className="w-full">
          <h1 className="text-[24px] font-semibold">1) Add Two Numbers</h1>
          <p className="">
          Write a Python function to add two numbers
          </p>
        </div>
      </div>
    </Box>
  );
};

export default ProblemStatement;
