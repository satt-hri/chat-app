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

io.on("connection", (socket) => {
  console.log("socket is connected", socket.id);

  socket.on("disconnect", () => {
    console.log("socket is disconnect", socket.id);
  });
});

export { app, io ,server};
