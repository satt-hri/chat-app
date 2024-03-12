import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on("connection", (socket) => {
  console.log("socket is connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  console.log("userSocketMap",userSocketMap)
  socket.on("disconnect", () => {
    console.log("socket is disconnect", socket.id);
    delete userSocketMap[userId];
    console.log("userSocketMap",userSocketMap)
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
