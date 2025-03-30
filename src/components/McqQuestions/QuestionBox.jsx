const QuestionBox = ({ question, selected, setSelected, optionKey,setIsSelectedQuestion }) => {
  return (
    <label className="inline-flex items-center mb-6">
      <input
        type="radio"
        id={optionKey}
        name="answer"
        value={optionKey}
        checked={selected === optionKey}
        onClick={() => {setSelected(selected === optionKey ? "" : optionKey); setIsSelectedQuestion(true)}}
        className="hidden"
      />
      <div
        className={`w-6 h-6 border-2 border-gray-400 rounded-box-radius mr-2 relative ${
          selected === optionKey ? "bg-checkbox-true" : "bg-white"
        }`}
      >
        {selected === optionKey && (
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

      {question}
    </label>
  );
};

export default QuestionBox;
