// const express = require("express");
// const app = express();
// const path = require("path")

// const http = require("http");

// const socketio = require("socket.io");
// const server = http.createServer(app);
// const io = socketio(server);

// app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public")))  

// io.on("connection", function(socket) {
//     console.log("connected");
// });

// app.get("/", function (req, res) {
//     res.render("index");
// });

// app.listen(3000);



                    // CHATGPT

const express = require("express");
const app = express();
const path = require("path");

const http = require("http");
const socketio = require("socket.io");

// Create HTTP server
const server = http.createServer(app);

// Initialize socket.io with the server
const io = socketio(server);

// Set view engine and static folder
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));  // ❗ use `app.use`, not `app.set`

// Socket.io connection handler
io.on("connection", function(socket) {
    socket.on("send-location", function (data){
        io.emit("receive-location", {id: socket.id, ...data});
    });
    socket.on("disconnect", function() {
        io.emit("user-disconnect", socket.id)
    });
});

// Root route
app.get("/", function (req, res) {
    res.render("index");
});

// Start server
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
