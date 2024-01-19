const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: String,
    senderId: String,
    text: String
}, {
    timestamps: true
})


const messageModel = mongoose.model('Message', messageSchema);  // (Name , shcema)
module.exports = messageModel;