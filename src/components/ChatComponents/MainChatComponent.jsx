import ChatBody from "./ChatBody";
import { ChatContext } from "../../contexts/ChatContext";
import SearchBar from "./SearchBar";
import { Box } from "@mui/material";


const MainChatComponent = () =>{
    return (
        <Box
          className="rounded-md border-2 border-[#EBEAE6] h-full overflow-hidden"
        >
          <div className="w-full bg-box-header rounded-t-button py-5 px-4 flex justify-between">
            <div className="px-3.5 py-2.5">Conversation</div>
          </div>
    
          <div className="w-full flex flex-col h-[86%] bg-white/100">
              <ChatBody/>
              <SearchBar/>
          </div>
        </Box>
      );
}

export default MainChatComponent