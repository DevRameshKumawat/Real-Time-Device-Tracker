const express = require("express");
const app = express();
const path = require("path");

const http = require("http");

const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); // to use public files and html files

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });

  socket.on("sendLocation", (data) => {
    io.emit("receiveLocation", { id: socket.id, ...data });
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(4000, () => {
  console.log("Server started on port 4000");
});
