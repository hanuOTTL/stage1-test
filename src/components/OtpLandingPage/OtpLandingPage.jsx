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

  const [options, setOptions] = useState([]);
  const [initialOptionValue, setInitialOptionValue] = useState("");

  console.log(language, languageId);

  useEffect(() => {
    setOptions(["java", "javascript", "python"]);
  }, []);

  return (
    <Box className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center w-[400px] h-[300px] ">
        <span className="text-main-heading font-semibold mb-10">
          Lets Get Started
        </span>
        <span className="mb-10">
          <OtpEnterComponent />
        </span>
        <span className="mb-10 w-full">
        <DropdownComponent
          setInitialLanguage={setInitialLanguage}
          options={options}
          initialOptionValue={initialOptionValue}
        />
        </span>

        <button
          className="bg-button-primary rounded-button inline-block px-3.5 py-2.5 mx-5 cursor-pointer"
          style={{
            backgroundColor: "#643276", 
            color:'white',
            borderRadius: "0.5rem", 
            display: "inline-block",
            padding: "0.625rem 1.375rem", 
            margin: "0 1.25rem",
            cursor: "pointer",
            
          }}
          onClick={()=>navigate("/permissions")}
        >
          Get Started
        </button>
      </div>
    </Box>
  );
};

export default OtpLandingPage;
