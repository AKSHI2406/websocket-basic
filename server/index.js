//create express server
const express = require("express");
const app = express(); //app is an instance of the express library to create BE server
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app); //create http server in express
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }, //properties that we need with cors
});

//listen to events
io.on("connection", (socket) => {
  // console.log(`Connected: ${socket.id}`)
  socket.on("join_room",(data)=>{
    socket.join(data);
  })
  socket.on("send_message", (data) => {
    //broadcast to everyone connected to this BE server
    socket.to(data.room).emit("received_message", data);
  });
});

server.listen(3001, () => {
  console.log("Server running...");
});
