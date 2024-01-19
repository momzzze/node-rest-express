const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./Routes/userRoute');
const chatRouter = require('./Routes/chatRoute');

const app = express();

app.use(express.json())   //middleware
app.use(cors())           //middleware used to connect to frontend
app.use('/api/users', userRouter);  //middleware
app.use('/api/chats', chatRouter)  //middleware

//CRUD operations
app.get("/", (req, res) => {
    res.send("Hello from server");
})


require('dotenv').config();


const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.log('MongoDB connection error: ', err.message);
});
