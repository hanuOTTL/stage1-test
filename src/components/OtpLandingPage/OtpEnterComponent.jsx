import { TextField, Box} from "@mui/material";
import { useState, useRef } from "react";

const OtpEnterComponent = ({length=6}) => {
    const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    // Move to the next input field if value length is 1 and it's not the last input
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Clear the current field and move to the previous field if backspace is pressed
    if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      // Move focus to the previous input and remove the value
      inputRefs.current[index - 1].focus();
      inputRefs.current[index - 1].value = ""; // Clear the previous input value
    }
  };

  return (
    <Box display="flex" justifyContent="center" gap={2}>
      {[...Array(6)].map((_, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputRefs.current[index] = el)} // Store ref of each input
          variant="outlined"
          inputProps={{ maxLength: 1, style: { textAlign: "center" } }} // Max 1 character and center align
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)} // Handle backspace
        />
      ))}
    </Box>
  );
};

export default OtpEnterComponent;
