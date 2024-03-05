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

export const getReceiverSocketId =(receiverId)=> userSocketMap[receiverId]

io.on("connection", (socket) => {
  console.log("socket is connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("socket is disconnect", socket.id);
    delete userSocketMap[userId]
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
  });
>>>>>>> 0e2197b98fd05bce8d2cca4bcd8c0b1e8d3935cf
});

export { app, io, server };
