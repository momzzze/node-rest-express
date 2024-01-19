import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"

const Chat = () => {
    const { userChats, isUserChatsLoading, userChatsErro } = useContext(ChatContext)

    console.log("userChats", userChats);
    console.log("isUserChatsLoading", isUserChatsLoading);
    console.log("userChatsErro", userChatsErro);
    return (
        <div>Chat</div>
    )
}

export default Chat