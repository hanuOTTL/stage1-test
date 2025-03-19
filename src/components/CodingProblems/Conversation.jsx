import { Box, TextField } from "@mui/material";

const Conversation = () => {
  return (
    <Box className="rounded-md border-2 border-[#EBEAE6] h-full flex flex-col">
      <div className="w-full bg-box-header rounded-t-button py-5 px-4 flex justify-between">
        <div className="py-2.5">Conversation</div>
      </div>

      <div
        className="flex-grow p-4 overflow-auto"
        style={{
          minHeight: "150px",
          maxHeight: "300px",
        }}
      ></div>

      <div className="w-full p-4 bg-white border-t-2 border-[#EBEAE6]">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          className="bg-input border-input-border rounded-box-radius"
        />
      </div>
    </Box>
  );
};

export default Conversation;
