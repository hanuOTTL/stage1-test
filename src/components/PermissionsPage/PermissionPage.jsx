import { useContext, useEffect, useState } from "react";
import { PermissionsContext } from "../../contexts/PermissionsContext";
import { Box } from "@mui/material";
import WebcamStream from "../UIComponents/WebcamStream";

const PermissionPage = () => {
  const { permissionsGranted, requestPermissions } =
    useContext(PermissionsContext);

    const [selected,setSelected] = useState(false)
    const [isDisabled,setIsDisabled] = useState(true)

    const permissionClickHandler=()=>{
        if(!permissionsGranted){
          requestPermissions();
        }
    }

    useEffect(()=>{
      if (!selected || !permissionsGranted) {
        setIsDisabled(true); 
      } else {
        setIsDisabled(false);
      }
    },[permissionsGranted, selected])

  return (
    <Box className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center w-[500px] h-[300px] ">
        <span className="text-main-heading font-semibold mb-2">
          Lets Get Started
        </span>

        <span className="text-subheading mb-4 text-center font-normal	">
          This app requires access to your microphone and camera for full
          functionality. Please grant permission when prompted.
        </span>

        <span>
          <WebcamStream/>
        </span>


        <label className="inline-flex items-center mb-6">
      <input
        type="radio"
        name="answer"
        value={selected}
        checked={selected}
        onClick={() => setSelected(!selected)}
        className="hidden"
      />
      <div
        className={`w-9 h-6 border-2 border-gray-400 rounded-box-radius mr-2 relative ${
          selected ? "bg-button-primary" : "bg-white"
        }`}
      >
        {selected&& (
          <div className="absolute inset-0 flex justify-center items-center text-white text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path
                d="M20 6L9 17l-5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      <span className="text-consent">
      I confirm that this assessment is my own work, and I consent to the recording of my voice and video.
        </span>
    </label>

    <button
  className={`rounded-button px-3.5 py-2.5 mx-5 cursor-pointer w-full ${
    isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-button-primary"
  }`}
  disabled={isDisabled} // Add the disabled prop
  style={{
    backgroundColor: isDisabled ? "#cccccc" : "#643276", // Greyed out if disabled
    color: isDisabled ? "#666666" : "white", // Greyed-out text if disabled
    borderRadius: "0.5rem",
    display: "inline-block",
    padding: "0.625rem 1.375rem",
    margin: "0 1.25rem",
    cursor: isDisabled ? "not-allowed" : "pointer", // Not allowed cursor when disabled
    width: "100%", // Full width
  }}
>
  Proceed
</button>


        <button
          className="bg-button-primary rounded-button inline-block px-3.5 py-2.5 mx-5 w-full cursor-pointer"
          onClick={()=>permissionClickHandler()}
          style={{
            color: "#643276",
            borderRadius: "0.5rem",
            display: "inline-block",
            padding: "0.625rem 1.375rem", 
            margin: "0 1.25rem",
            cursor: "pointer",
            width: "100%"
          }}
        >
          <b>Allow Access</b>
        </button>
      </div>
    </Box>
  );
};

export default PermissionPage;
