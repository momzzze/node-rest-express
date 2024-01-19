const messageModel = require('../Models/messageModel');
const chatModel = require('../Models/chatModel');


// create message
const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;

    const message = new messageModel({
        chatId,
        senderId,
        text
    })

    try {
        const response = await message.save();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json("Something went wrong: " + error);
    }

}



// getMessages

const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await messageModel.find({ chatId })
        res.status(200).json(messages)
        
    } catch (error) {
        res.status(500).json("Something went wrong: " + error);
    }

}

module.exports = { createMessage, getMessages };