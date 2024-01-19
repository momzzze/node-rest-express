import {
    createContext,
    useCallback,
    useEffect,
    useState
} from "react"
import { getRequest, postRequest, baseUrl } from "../utils/services"
import { io } from "socket.io-client"

export const ChatContext = createContext({

})

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    //init socket
    useEffect(() => {
        const newSocket = io("http://localhost:4000");  //create new socket
        setSocket(newSocket);    //set socket state
        return () => {
            newSocket.disconnect()   //disconnect socket when component unmounts
        }
    }, [user])


    //add online users
    useEffect(() => {
        if (socket === null) return;    // if socket is not initialized, return
        socket.emit("addNewUser", user?._id)   //emit addNewUser event to server
        socket.on("getOnlineUsers", (users) => {    //listen for getOnlineUsers event we receive from server
            setOnlineUsers(users);     //set onlineUsers state
            console.log("online users", users);
        })
        return ()=>{
            socket.off("getOnlineUsers")    //remove getOnlineUsers event listener when component unmounts
        }
    }, [socket])


    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/users`);

            if (response?.error) {
                return console.log("Error fetching users", response);
            }
            const pChats = response.filter((u) => {
                let isChatCreated = false
                if (user?._id === u._id) return false;

                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                }
                return !isChatCreated
            });
            setPotentialChats(pChats);
        }

        getUsers();
    }, [userChats])

    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setIsUserChatsLoading(true);
                setUserChatsError(null);

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
                setIsUserChatsLoading(false);

                if (response?.error) {
                    return setUserChatsError(response)
                }
                setUserChats(response);
            }
        }

        getUserChats();
    }, [user])

    useEffect(() => {
        const getMessages = async () => {
            setIsMessagesLoading(true);
            const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);
            setIsMessagesLoading(false);

            if (response?.error) {
                return setMessagesError(response);
            }

            setMessages(response);
        }

        getMessages();
    }, [currentChat])

    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) return;
        const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage
        }));
        if (response.error) {
            return setSendTextMessageError(response);
        }
        setNewMessage(response);
        setMessages((prev) => [...prev, response]);
        setTextMessage("");

    }, [])

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, [])

    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({
            firstId, secondId
        }));
        if (response.error) {
            return console.log("Error creating chat", response);
        }
        setUserChats((prev) => {
            return [...prev, response]
        })

    }, [])

    return <ChatContext.Provider
        value={{
            userChats,
            isUserChatsLoading,
            userChatsError,
            potentialChats,
            createChat,
            updateCurrentChat,
            currentChat,
            messages,
            isMessagesLoading,
            messagesError,
            sendTextMessage,
            onlineUsers
        }}
    >
        {children}
    </ChatContext.Provider>
}