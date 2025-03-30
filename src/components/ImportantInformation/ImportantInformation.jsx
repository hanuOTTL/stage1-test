
import { TimeCheck, Code, Glasses } from "../Icons/Icons";
import { useNavigate } from "react-router-dom";

function ImportantInformation() {
//   const proceedToInterview = () => {
//     console.log("Proceeding to interview");
//     localStorage.setItem("currentStep", CANDIDATE_FLOW_STEPS.SCREEN_TOUR);
//   };

const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Kindly read before proceeding.
        </h1>

        <div className="flex mb-8 gap-3">
          <TimeCheck className="w-6 h-6 mt-1" aria-hidden="true" />
          <div>
            <h2 className="text-lg font-semibold">Time</h2>
            <p className="text-gray-700 text-sm">
              Once the 30-minute timer starts, it cannot be paused.
            </p>
          </div>
        </div>

        <div className="flex mb-8 gap-3">
          <Glasses className="w-12 h-12 mt-1" aria-hidden="true" />
          <div>
            <h2 className="text-lg font-semibold">Proctored</h2>
            <p className="text-gray-700 text-sm">
              This session is monitored to ensure integrity. Please follow all
              guidelines and avoid any interruptions.
            </p>
          </div>
        </div>

        <div className="flex mb-8 gap-3">
          <Code className="w-12 h-12 mt-1" aria-hidden="true" />
          <div>
            <h2 className="text-lg font-semibold">Question Type</h2>
            <p className="text-gray-700 text-sm">
              The assessment features MCQ’s, technical discussions and coding
              challenges. Manage your time efficiently.
            </p>
          </div>
        </div>

        <button
          className="w-full bg-button-primary transition duration-200 h-10 text-white my-2 rounded-lg cursor-pointer"
          onClick={()=>navigate("/question")}
        >
          Start Assessment
        </button>
      </div>
    </div>
  );
}

export default ImportantInformation;