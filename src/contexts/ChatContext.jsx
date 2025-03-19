import React, { createContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
// Sample data
const chipArrayData = [
  "General policies",
  "Payroll and Compensation",
  "Company’s leave policies",
];

// const chipArrayData = [];

const sampleChip = [
  "How do I apply for leave?",
  "What holidays does the company observe?",
];

// const chatdatas = [
//   {
//     msg: "hello",
//     user: "sender",
//   },
//   {
//     msg: "how are you",
//     user: "receiver",
//   },
//   {
//     msg: "im Fine,How are you",
//     user: "sender",
//   },
//   {
//     msg: "Good!..Very good",
//     user: "receiver",
//   },
//   {
//     msg: "Leave Types:Includes vacation, sick leave, personal leave, and special leaves like maternity/paternity.Leave Entitlement:You have a set number of days based on your employment status. Check your balance anytime.Application: Submit leave requests through the HR portal. Approval is needed from your manager.Carry Over:Some leave types can be carried over to the next year. Please check the specifics in the policy.Special Leaves: Additional guidelines apply for maternity/paternity and bereavement leave.For more details, please refer to the employee handbook or contact HR. How else can I assist you today? 😊",
//     user: "receiver",
//   },
// ];

const chatdatas = [];

// Create the context
export const ChatContext = createContext("");

export const ChatProvider = ({ children }) => {
  // WebSocket State
  const [messages, setMessages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const websocketRef = useRef(null); // WebSocket reference
  // const newTme = dayjs(new Date()).format("hh:mm A");
  // const URL = "wss://sandbox.openturf.dev/ws/faq/search";
  const URL = "wss://sandbox.openturf.dev/ws/search";
  useEffect(() => {
    // Create WebSocket connection
    websocketRef.current = new WebSocket(URL);

    // Connection opened
    websocketRef.current.onopen = (event) => {
      // console.log("Socket-Logs", "WebSocket connection established");
    };

    // Listen for messages
    websocketRef.current.onmessage = async (event) => {
      setLoader(true);
      const newMessage = await JSON.parse(event.data);
      const newTme = await dayjs(new Date()).format("hh:mm A");
      // const relatedQues = newMessage?.map((each) => {
      //   console.log(each);
      // });
      setSessionId(newMessage?.session_id);
      if (newMessage.msg_type === "query_ack") {
        // setTimeout(setLoader(true), 5000);
        if (newMessage.status === "failed") {
          const receivedMsg = {
            msg: "Uh-oh! Our servers decided to play hide and seek. Don’t worry, we’re expert seekers and will find them shortly!",
            user: "receiver",
            time: newTme,
            // _id: uuidv4(),
          };
          setLoader(false);
          setChatData((prevMessages) => [...prevMessages, receivedMsg]);
          return;
        }
      }
      if (
        newMessage.status === "success" &&
        newMessage.msg_type === "query_notify"
      ) {
        let receivedMsg = {
          msg: "I’m not sure how to answer that. Can you please rephrase or simply provide the keyword related to the topic you want to know about?",
          user: "receiver",
          _id: uuidv4(),
          time: newTme,
        };
        if (newMessage?.result?.qna?.length > 0) {
          receivedMsg = {
            msg: newMessage?.result?.qna[0]?.answer,
            user: "receiver",
            _id: uuidv4(),
            time: newTme,
          };
        }

        const newQueries = newMessage?.result?.qna?.map((each, index) => ({
          question: each?.query,
          answer: each?.answer,
        }));

        const uniqueQueries = newQueries.filter(
          (query, index, array) =>
            index ===
            array.findIndex(
              (q) => q.question.toLowerCase() === query.question.toLowerCase()
            )
        );
        setSampleChip(uniqueQueries);
        setLoader(false);
        setChatData((prevMessages) => [...prevMessages, receivedMsg]);
      }
    };

    // Handle errors
    websocketRef.current.onerror = (error) => {
      console.error("Socket-Logs", "WebSocket Error:", error);
    };

    //Close
    websocketRef.current.onclose = () => {
      // console.log(
      //   "Socket-Logs",
      //   "WebSocket connection closed. Attempting to reconnect..."
      // );
    };

    // Clean up on unmount
    return () => {
      websocketRef.current.close();
    };
  }, []);

  const sendMessage = async (message) => {
    const newTme = await dayjs(new Date()).format("hh:mm A");
    // console.log(JSON.stringify(message), "sx message", "Socket-Logs");
    setChatData((prevChatData) => [
      ...prevChatData,
      {
        msg: message?.query.toLowerCase(),
        user: "sender",
        _id: message.msg_id,
        time: newTme,
      },
    ]);
    if (
      websocketRef.current
      // websocketRef.current.readyState === WebSocket.OPEN
    ) {
      websocketRef.current.send(JSON.stringify(message));
    }
  };

  const setChipDataMessage = async (message) => {
    const newTme = await dayjs(new Date()).format("hh:mm A");
    const newz = sampleChip.filter(
      (each) => each.question !== message.question
    );
    setSampleChip(newz);

    const receivedMsg = [
      {
        msg: message.question,
        user: "sender",
        _id: uuidv4(),
        time: newTme,
      },
      {
        msg: message.answer,
        user: "receiver",
        _id: uuidv4(),
        time: newTme,
      },
    ];
    setChatData((prevMessages) => [...prevMessages, ...receivedMsg]);
  };
  // Define different states
  const [tab, setTab] = useState("home");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [userName, setUserName] = useState("User Name");
  const [chipData, setChipData] = useState();
  const [chatData, setChatData] = useState(chatdatas);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sampleChip, setSampleChip] = useState([]);
  const [style, setStyle] = useState();

  // console.log(sessionId, "sessionId");
  // Create a value object that will be passed to the provider
  const value = {
    style,
    setStyle,
    isChatOpen,
    setIsChatOpen,
    searchVal,
    setSearchVal,
    userName,
    setUserName,
    tab,
    setTab,
    chipData,
    setChipData,
    chatData,
    setChatData,
    isExpanded,
    setIsExpanded,
    sendMessage,
    messages,
    sampleChip,
    loader,
    setLoader,
    sessionId,
    setChipDataMessage,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
