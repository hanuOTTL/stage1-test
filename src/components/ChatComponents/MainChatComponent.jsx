import ChatBody from "../ChatComponents/ChatBody";
import { ChatContext } from "../../contexts/ChatContext";
import SearchBar from "../ChatComponents/SearchBar";
import { Box } from "@mui/material";


const MainChatComponent = () =>{
    return (
        <Box
          className="rounded-md border-2 border-[#EBEAE6] h-full overflow-hidden"
        >
          <div className="w-full bg-box-header rounded-t-button py-2 px-2 flex justify-between">
            <div className="py-1.5">Conversation</div>
          </div>
    
          <div className="w-full flex flex-col h-[90%] bg-white/100">
              <ChatBody/>
              <SearchBar/>
          </div>
        </Box>
      );
}

export default MainChatComponent