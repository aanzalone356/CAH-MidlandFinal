//install cors, socket.io and socket.io-client


///INCOMPLETE BOILERPLATE CODE

const app = require('express')();
const cors = require('cors');
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors());

io.on("connection", (socket) => {
    console.log("New Client Connected");

    socket.on("message", (msg) => {
        io.emit("message", msg);
    }); 
    
    socket.on("disconnect", () => {
        console.log("Client Disconnected");
    });
});

server.listen(8080, () => console.log("server started"));


//socket.join
//socket.to
