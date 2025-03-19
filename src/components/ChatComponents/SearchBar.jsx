import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Send } from "../Icons/Icons";
import { ChatContext } from "../../contexts/ChatContext";

const SearchBar = () => {
  const {
    searchVal,
    setSearchVal,
    setChatData,
    chatData,
    sendMessage,
    sessionId,
    style,
  } = useContext(ChatContext);

  const hanldeSend = (e) => {
    e.preventDefault();
    var repl = searchVal.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    if (repl !== "") {
      const socMsg = {
        msg_type: "query_req",
        query: repl,
        msg_id: uuidv4(),
        session_id: sessionId,
        env: "staging",
        stream: false,
        filters: {},
        tenant: "",
      };
      sendMessage(socMsg);
      // if (repl !== "") {
      //   const newchat = {
      //     msg: repl,
      //     user: "sender",
      //   };
      //   console.log(newchat, "newChat");
      //   setChatData([...chatData, newchat]);
    }
    setSearchVal("");
  };

  return (
    <div className="mb-[16px] mx-[12px] py-[2px] px-[12px] border border-gray-300 rounded-xl">
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
            className=" w-[36px] h-[36px] flex items-center justify-end rounded-3xl outline-none"
            onClick={hanldeSend}
          >
            <Send color='#34143E' />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
