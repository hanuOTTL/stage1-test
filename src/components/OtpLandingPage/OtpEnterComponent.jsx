import { Box } from "@mui/material";
import { useState, useRef } from "react";

const OtpEnterComponent = ({ length = 4, isOtpWrong }) => {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      inputRefs.current[index - 1].focus();
      inputRefs.current[index - 1].value = "";
    }
  };

  return (
    <Box display="flex" justifyContent="center" gap={2}>
      {[...Array(length)].map((_, index) => (
        <input
        key={index}
        ref={(el) => (inputRefs.current[index] = el)}
        type="text"
        maxLength={1}
        style={{
          textAlign: "center",
          height: "86px",
          width: "75px",
          fontSize: "70px",
          color: "#989793",
          fontWeight: "600",
          border: `1px solid ${isOtpWrong ? "#DB352C" : "#ccc"}`,
          borderRadius: "4px",
          outline: "none",
        }}
        className="caret-transparent"
        onChange={(e) => handleChange(e, index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
      />
      
      ))}
    </Box>
  );
};

export default OtpEnterComponent;
