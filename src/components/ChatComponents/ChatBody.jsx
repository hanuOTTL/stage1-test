import { useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import hand from "../../assets/img/hand.svg"
import { Chip } from "@mui/material";
import { useRef } from "react";
import "../../index.css";
import { ChatContext } from "../../contexts/ChatContext";

const ChatBody = () => {


  const {
    chatData,
    loader,
    tab,
    userName,
    setSearchVal,
    chipData,
    sampleChip,
    sendMessage,
  } = useContext(ChatContext);

  const handleChatChips = (searchVal) => {
    var repl = searchVal.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    if (repl !== "") {
      const socMsg = {
        msg_type: "query",
        query: repl,
        msg_id: uuidv4(),
        metadata: {},
      };
      sendMessage(socMsg);
      // const newchat = {
      //   msg: repl,
      //   user: "sender",
      // };
      // console.log(newchat, "newChat");
      // setChatData([...chatData, newchat]);
    }
    setSearchVal("");
  };

  const MessageEndRef = useRef(null);
  useEffect(() => {
    MessageEndRef?.current?.scrollIntoView();
  }, [chatData]);

  return (
    <div className="h-[100%] overflow-y-auto bg-white/100 ">

        <div className="h-[100%] overflow-y-auto">
          {chatData.length > 0 ? (
            <div className="flex flex-col mt-[auto] gap-y-[4px] overflow-y-auto">
              {chatData.map((each, index) => (
                <div
                key={index}
                  className={`max-w-[100%] ${
                    each.user === "sender" ? "ml-[auto] flex-row-reverse" : ""
                  } flex gap-2 items-center text-[14px]`}
                >
                  {/* use image tag if needed */}
                  {/* <div
                    scr=""
                    alt=""
                    className={`min-w-[34px] min-h-[34px] rounded-3xl mt-[auto] mb-[20px] ${
                      each.user === "sender" ? "bg-[#ECF4FF]" : "bg-[#F7F8F9]"
                    }`}
                  /> */}

                  <div className="">
                    <p
                      className={` min-h-[40px] items-center px-[12px] py-[10px] flex flex-wrap text-pretty ${
                        each.user === "sender"
                          ? "bg-box-header text-[#2C3E5D] rounded-tl-[8px] rounded-tr-[8px] rounded-br-[0px] rounded-bl-[8px] ml-[40px]"
                          : "bg-[#F7F8F9] text-[#44546F] rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[0px] mr-[40px]"
                      }`}
                    >
                      {each.user === "sender" ? each.msg : each.msg}
                    </p>
                    <p
                      className={`text-[#8590A2] text-[10px] pt-[5px] ${
                        each.user === "sender" ? "text-right" : ""
                      }`}
                    >
                    </p>
                  </div>
                </div>
              ))}
              {loader && (
                <div className="text-sm flex justify-start mb-8">
                  <div className="rounded-lg p-2 max-w-md self-start">
                    <span className="typing-animation">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </span>
                  </div>
                </div>
              )}
              {!loader && (
                <div className="flex gap-2 flex-wrap">
                  {sampleChip.map((each, index) => {
                    return (
                      <Chip
                      key={index}
                        label={each}
                        variant="outlined"
                        sx={{
                          fontSize: "12px",
                          borderColor: "#156FEF",
                          color: "#156FEF",
                        }}
                        // onClick={() => setSearchVal(each)}
                        onClick={() => handleChatChips(each)}
                      />
                    );
                  })}
                </div>
              )}

              {/* Raise Ticket */}

              {/* {chatData.length > 1 && (
                <div className="flex flex-col justify-center items-center pt-[14px] gap-2 ">
                  <p className="text-[#2C3E5D] font-600 text-[14px]">
                    Not the right answer?
                  </p>
                  <p className="flex items-center justify-center gap-1 text-[#156FEF] font-600 text-[12px] cursor-pointer">
                    <span>
                      <TicketActive props={12} />
                    </span>
                    Raise a ticket!
                  </p>
                </div>
              )} */}
              <div ref={MessageEndRef} />
            </div>
          ) : (
            <></>
          )}
        </div>
    </div>
  );
};

export default ChatBody;
