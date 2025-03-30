import React, { useContext } from "react";
import { Send } from "../Icons/Icons";
import { ChatContext } from "../../contexts/ChatContext";
import dayjs from "dayjs";

const SearchBar = () => {
  const {
    searchVal,
    setSearchVal,
    sendMessage,
  } = useContext(ChatContext);

  const handleSend = (e) => {
    e.preventDefault();

    // Clean up the search value (trim whitespace)
    var repl = searchVal.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    
    if (repl !== "") {
      // Send the message by calling sendMessage with the cleaned-up reply
      sendMessage(repl);
    }

    // Clear the input field after sending the message
    setSearchVal("");
  };

  return (
    <div className="mx-[12px] py-[2px] px-[12px] border border-gray-300 rounded-xl">
      <div className="flex justify-between items-center">
        <form className="flex items-center justify-between w-full">
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Message here..."
            className="p-[10px] outline-none text-[16px] w-[100%] ml-[5px]"
          />

          <button
            type="submit"
            className="w-[36px] h-[36px] flex items-center justify-end rounded-3xl outline-none"
            onClick={handleSend} // Attach the handleSend function
          >
            <Send color="#34143E" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
