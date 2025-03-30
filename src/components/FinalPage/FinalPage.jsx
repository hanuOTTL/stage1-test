import { Box } from "@mui/material";

const FinalPage = () => {
  return (
    <Box className="flex justify-center items-center h-screen"> {/* h-screen to take full viewport height */}
      <div className="p-4 w-full max-w-[600px]"> {/* Limit width to make content visually centered */}
        <div className="text-center"> {/* Center the text */}
          <h1 className="text-[32px] font-semibold mb-4">Completed Successfully!</h1>
          <p className="text-[18px]">
          Thank you for completing your interview!
          <br />
          Our team will review your responses and get back to you soon.
          </p>
        </div>
      </div>
    </Box>
  );
};

export default FinalPage;
