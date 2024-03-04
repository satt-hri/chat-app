import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = new express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  // ...
  console.log("socket is connected",socket.id)

  socket.on("disconnect",()=>{
    console.log("socket is disconnect",socket.id)
  })
});

export { app, io, server };
