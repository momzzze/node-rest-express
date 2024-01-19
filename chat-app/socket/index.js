const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });
let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("new connection", socket.id);


    //listen for connection
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((user) => user.userId === userId) && onlineUsers.push({ userId, socketId: socket.id })      //if user is not in onlineUsers array then push user to onlineUsers array
        io.emit('getOnlineUsers', onlineUsers)   //emit getOnlineUsers event to all clients
    })
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)  //remove user from onlineUsers array when user disconnects
        io.emit('getOnlineUsers', onlineUsers)   //emit getOnlineUsers event to all clients
    })
});

io.listen(4000);