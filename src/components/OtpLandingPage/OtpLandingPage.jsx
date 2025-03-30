import { useContext, useEffect, useState } from "react";
import DropdownComponent from "../UIComponents/DropdownComponent";
import { LanguageContext } from "../../contexts/LanguageContext";
import OtpEnterComponent from "./OtpEnterComponent";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OtpLandingPage = () => {
  const { setInitialLanguage, language, languageId } =
    useContext(LanguageContext);

  const navigate = useNavigate();
  useEffect(() => {
    setInitialLanguage("javascript");
  }, []);

  const [options, setOptions] = useState([]);
  const [isOtpWrong, setIsOtpWrong] = useState(false);
  
  useEffect(() => {
    setOptions(["java", "javascript", "python"]);
  }, []);

  return (
    <Box className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center w-[350px] h-[300px] ">
        <span className="text-main-heading font-semibold mb-2">
          Verify Your Identity
        </span>
        <span className="text-subheading text-[#61605F] text-center mb-10">
          Enter the OTP sent to your registered email to proceed
        </span>
        <span className="mb-2">
          <OtpEnterComponent isOtpWrong={isOtpWrong} />
        </span>
        {isOtpWrong && (
          <div className="w-full mb-2 flex justify-start">
          <span className="text-resend  text-[#DB352C] font-semibold text-right">
            Invalid OTP. Please Try Again
          </span>
        </div>
        )}
        <div className="w-full mb-10 flex justify-end">
          <span className="text-resend  text-[#61605F] font-semibold text-right ml-10">
            Didn't Recieve OTP?{" "}
            <button className="text-button-primary cursor-pointer">
              Resend OTP
            </button>
          </span>
        </div>
        {/*        
        <span className="mb-10 w-full">
        <DropdownComponent
          setInitialLanguage={setInitialLanguage}
          options={options}
          initialOptionValue={initialOptionValue}
        />
        </span> */}

        <button
          className="bg-button-primary rounded-button inline-block px-3.5 py-2.5 mx-5 cursor-pointer"
          style={{
            backgroundColor: "#643276",
            color: "white",
            borderRadius: "0.5rem",
            display: "inline-block",
            padding: "0.625rem 1.375rem",
            margin: "0 1.25rem",
            cursor: "pointer",
          }}
          onClick={() => navigate("/permissions")}
        >
          Get Started
        </button>
      </div>
    </Box>
  );
};

export default OtpLandingPage;
