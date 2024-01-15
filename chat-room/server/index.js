// import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const PORT=process.env.PORT || 3500;





// const httpServer = createServer();
const app=express();
app.use(express.static(path.join(__dirname, 'public')))


const expressServer=app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})



const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5500','http://127.0.0.1:5500'],
    }
});

io.on('connection', (socket) => {
    // console.log(`User ${socket.id} connected`);
    // only to user
    socket.emit('message', 'Welcome to chat app');
    
    // to all users except the user who joined
    socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)} joined the chat`);


    //listening for message event
    socket.on('message', (data) => {
        console.log(data);
        io.emit('message', `User ${socket.id.substring(0, 5)} : ${data}`);
    });

    //when user disconnects
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
        socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)} left the chat`);
    });

    //listening for activity event
    socket.on('activity', (name) => {
        socket.broadcast.emit('activity', name);
    });
});



// httpServer.listen(3500, () => {
//     console.log('listening on *:3500');
// });