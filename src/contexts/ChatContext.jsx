import React, { createContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { io } from "socket.io-client";

const chatdatas = [];

// Create the context
export const ChatContext = createContext("");

export const ChatProvider = ({ children }) => {
  // WebSocket State
  const [messages, setMessages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [chatId, setChatId] = useState(null)
  const websocketRef = useRef(null);
  const URL = "https://turfai.openturf.dev/stageone_v2_be/socket.io";


  useEffect(() => {

    const socketInstance = io("https://turfai.openturf.dev", {
      path: "/stageone_v2_be/socket.io",
      secure: true 
    });

    setSocket(socketInstance);

    socketInstance.on('receive_ai_question', async (eventData) => {
      // Deconstruct the eventData to extract the chatId and aiQuestion
      const { chatId, aiQuestion } = eventData;
    
      // Extract the followUpQuestion from the aiQuestion object
      const { followUpQuestion } = aiQuestion;

      console.log(followUpQuestion)
    
      // If the chatId exists, update the state
      if (chatId) {
        setChatId(chatId);
        console.log('Received chatId:', chatId);
      }
    
      // If there's a followUpQuestion, you can save it into the chat history
      if (followUpQuestion) {
        setChatData((prevMessages) => [
          ...prevMessages,
          { text: followUpQuestion, time: new Date().toLocaleTimeString(), user: "reciever" }, // Example: You could format the time if needed
        ]);
        console.log('Received follow-up question:', followUpQuestion);
      } else {
        console.log('No follow-up question available');
      }
    });
    

    return () => {
      socketInstance.disconnect();
      socketInstance.off('receive_ai_question');
    };
  }, []);

  const sendMessage = async (candidateAnswerToAIQuestion) => {
    const newTime = await dayjs(new Date()).format("hh:mm A");
    const sendData = {
      chatId: chatId,
      candidateAnswerToAIQuestion: candidateAnswerToAIQuestion,
    };
  
    setChatData((prevChatData) => [
      ...prevChatData,
      { text: candidateAnswerToAIQuestion, time: newTime, user: "sender" }, 
    ]);
  

    if (socket) {
      socket.emit('received_message', sendData); 
      console.log("Sent message:", sendData);
    } else {
      console.log("Socket is not connected.");
    }
  };

  const sendInitialAckMessage = async (interviewId, predefinedQuestionId, answer) => {
    if (socket) {
      const message = {
        interviewId: interviewId,
        predefinedQuestionId: predefinedQuestionId,
        answer: answer,
      };
  

      socket.emit('send_message', message);
      console.log("Sent initial message to Socket.IO server:", message);
  
      setChatData([]); 

      console.log("Initial message sent");
    } else {
      console.log("Socket is not connected.");
      console.log("Failed to send initial message (Socket not connected)");
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
  const [tab, setTab] = useState("home");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [userName, setUserName] = useState("User Name");
  const [chipData, setChipData] = useState();
  const [chatData, setChatData] = useState(chatdatas);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sampleChip, setSampleChip] = useState([]);
  const [style, setStyle] = useState();


  console.log(chatData)


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
    sendInitialAckMessage
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
