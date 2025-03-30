import { useNavigate } from "react-router-dom";

const EndModal = ({
  onNext,
  onSkip,
  onPrevious,
  currentStep,
  handleNextPage,
  onClose,
}) => {
    const navigate = useNavigate()
  return (
    <div
      className={`z-50 bg-white shadow-lg p-4 rounded-xl border border-gray-300 max-w-[400px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
    >
      <div className="text-center">
        <div className="text-header mb-2">You’ve reached the final step!</div>
        <div className="mb-8 text-[1rem] text-[#61605F]">
          Submitting this will complete your interview. Are you sure you want to
          finish?
        </div>
      </div>

      <div className="flex justify-between mt-4 space-x-4">
        {" "}
        {/* Added space-x-4 */}
        <button
          className="px-4 py-2 w-full border-2 border-input-border rounded-lg" 
          onClick={onClose}
        >
          No, Cancel
        </button>
        <button
          className="px-4 py-2 w-full border-2 rounded-lg bg-[#643276] text-white" 
          onClick={()=>navigate("/finalpage")}
        >
          Yes, Submit
        </button>
      </div>
    </div>
  );
};

export default EndModal;
