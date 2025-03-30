import { useContext, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Chip } from "@mui/material";
import "../../index.css";
import { ChatContext } from "../../contexts/ChatContext";

const ChatBody = () => {
  const {
    chatData,
    loader,
    setSearchVal,
    sampleChip,
    sendMessage,
  } = useContext(ChatContext);


  const handleChatChips = (searchVal) => {
    const trimmedSearchVal = searchVal.trim();
    if (trimmedSearchVal) {
      const socMsg = {
        msg_type: "query",
        query: trimmedSearchVal,
        msg_id: uuidv4(),
        metadata: {},
      };
      sendMessage(socMsg);
    }
    setSearchVal("");
  };

  const MessageEndRef = useRef(null);
  useEffect(() => {
    MessageEndRef?.current?.scrollIntoView();
  }, [chatData]);

  return (
    <div className="h-full bg-white/100">
      <div className="h-[90%] w-[95%] overflow-y-auto mx-4 my-4">
        {chatData.length > 0 && (
          <div className="flex flex-col mt-[auto] gap-y-[4px] overflow-y-auto">
            {chatData.map((each, index) => (
              <div
              key={index}
                className={`max-w-[100%] ${
                  each?.user === "sender" ? "ml-[auto] flex-row-reverse" : ""
                } flex gap-2 items-center text-[14px]`}
              >
            <div className="">
              <p
                className={` min-h-[40px] items-center px-[12px] py-[10px] flex flex-wrap text-pretty ${
                  each.user === "sender"
                    ? "bg-box-header text-[#2C3E5D] rounded-tl-[8px] rounded-tr-[8px] rounded-br-[0px] rounded-bl-[8px] ml-[40px]"
                    : "bg-[#F7F8F9] text-[#44546F] rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[0px] mr-[40px]"
                }`}
              >
                {each?.user === "sender" ? each?.text : each?.text}
              </p>
              <p
                className={`text-[#8590A2] text-[10px] pt-[5px] ${
                  each.user === "sender" ? "text-right" : ""
                }`}
              >
              </p>
            </div>
                <span className="text-xs text-[#8590A2]">
                  {each.time} 
                </span>
              </div>
            ))}
          </div>
        )}

        <div ref={MessageEndRef} />
      </div>
    </div>
  );

  // <div className="h-[100%] overflow-y-auto bg-white/100 ">

  // <div className="h-[90%] overflow-y-auto mx-4 my-4">
  //   {chatData.length > 0 ? (
  //     <div className="flex flex-col mt-[auto] gap-y-[4px] overflow-y-auto">
  //       {chatData.map((each, index) => (
  //         <div
  //         key={index}
  //           className={`max-w-[100%] ${
  //             each.user === "sender" ? "ml-[auto] flex-row-reverse" : ""
  //           } flex gap-2 items-center text-[14px]`}
  //         >
  //           {/* use image tag if needed */}
  //           {/* <div
  //             scr=""
  //             alt=""
  //             className={`min-w-[34px] min-h-[34px] rounded-3xl mt-[auto] mb-[20px] ${
  //               each.user === "sender" ? "bg-[#ECF4FF]" : "bg-[#F7F8F9]"
  //             }`}
  //           /> */}

  //           <div className="">
  //             <p
  //               className={` min-h-[40px] items-center px-[12px] py-[10px] flex flex-wrap text-pretty ${
  //                 each.user === "sender"
  //                   ? "bg-box-header text-[#2C3E5D] rounded-tl-[8px] rounded-tr-[8px] rounded-br-[0px] rounded-bl-[8px] ml-[40px]"
  //                   : "bg-[#F7F8F9] text-[#44546F] rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[0px] mr-[40px]"
  //               }`}
  //             >
  //               {each.user === "sender" ? each.msg : each.msg}
  //             </p>
  //             <p
  //               className={`text-[#8590A2] text-[10px] pt-[5px] ${
  //                 each.user === "sender" ? "text-right" : ""
  //               }`}
  //             >
  //             </p>
  //           </div>
  //         </div>
  //       ))}
};

export default ChatBody;
