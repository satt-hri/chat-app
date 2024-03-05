import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [receiverId, senderId],
      });
    }
    const newMessage = new Message({
      receiverId,
      senderId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    //socket send message
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json(newMessage);
  } catch (error) {
    console.log("sendMessage controller error", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: chatToUserId } = req.params;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatToUserId] },
    }).populate("messages");

    if (!conversation) {
      res.status(200).json([]);
    } else {
      res.status(200).json(conversation.messages);
    }
  } catch (error) {
    console.log("getMessages controller error", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
