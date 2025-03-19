import { useState, useRef, useEffect } from "react";
import ChatBody from "../ChatComponents/ChatBody";
import SearchBar from "../ChatComponents/SearchBar";
import { Box } from "@mui/material";

const ExpandableChatWindow = ({ isSelectedQuestion }) => {
  console.log(isSelectedQuestion);
  const [width, setWidth] = useState(0);
  console.log(width);
  const isDraggingRef = useRef(false);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;

    const newWidth = window.innerWidth - e.clientX;

    setWidth(newWidth);
  };

  useEffect(() => {
    isSelectedQuestion ? setWidth(25) : setWidth(0);
  }, [isSelectedQuestion]);

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <Box
      className="rounded-md border-2 border-[#EBEAE6] h-full bg-opacity-100  overflow-visible"
      style={{
        maxHeight: "89.5vh",
        position: "absolute",
        right: 0,
        width: `${width}px`,
      }}
    >
      <div
        className={`w-full bg-box-header rounded-t-button py-5 px-4 flex justify-between ${
          width < 250 ? "hidden" : ""
        }`}
        style={{ width: `${width}px` }}
      >
        <div className="px-3.5 py-2.5">Conversation</div>
      </div>

      <div
        className={`w-full flex flex-col h-[86%] bg-white/100 ${
          width < 250 ? "hidden" : ""
        }`}
      >
        <ChatBody />
        <SearchBar />
      </div>

      <div
        onMouseDown={handleMouseDown}
        style={{
          width: "15px",
          height: "40px",
          background: "grey",
          borderRadius: "5px",
          position: "absolute",
          left: "-15px",
          zIndex: "10",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "ew-resize",
          boxShadow: "0 0 5px rgba(0,0,0,0.3)",
        }}
      />
    </Box>
  );
};

export default ExpandableChatWindow;
