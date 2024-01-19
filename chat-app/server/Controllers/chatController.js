const express = require('express');
const chatModel = require('../Models/chatModel');

// create chat

// first we search for the chat in the database
// if the chat exists then we will send the chat
// if the chat does not exist then we will create a new chat
// and then send the chat
const createChat = async (req, res) => {
    const { firstChatterId, secondChatterId } = req.body;

    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstChatterId, secondChatterId] }  // if both the ids are in the members array then return the chat
        });
        if (chat) {
            return res.status(200).json(chat);
        }

        const newChat = new chatModel({
            members: [firstChatterId, secondChatterId]
        });
        const response = await newChat.save();
        res.status(200).json(response);


    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }
}

// get all user chats
const findUserChats = async (req, res) => {
    const userId = req.params.userId;

    try {
        const chats = await chatModel.find({
            members: { $in: [userId] } // if the userId is in the members array then return the chat
        });

        res.status(200).json(chats);

    } catch (error) {
        res.status(500).json("Something went wrong");
    }

}

// find Chat
const findChat = async (req, res) => {
    const { firstId, secondId } = req.body;
    try {
        const chat = await chatModel.find({
            members: { $all: [firstId, secondId] }
        });

        if (!chat) {
            return res.status(400).json("Chat not found");
        }

        res.status(200).json(chat);

    } catch (error) {
        res.status(500).json("Something went wrong");
    }
}

module.exports ={
    createChat,
    findUserChats,
    findChat
}