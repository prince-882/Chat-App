"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let GlobalArray = [];
function findRoomId(socket) {
    let roomId;
    GlobalArray.forEach(el => {
        if (el.socket === socket) {
            roomId = el.roomId;
        }
    });
    return roomId;
}
wss.on("connection", function (socket) {
    console.log("connected");
    socket.on("message", (message) => {
        let data = JSON.parse(message);
        if (data.type === "join") {
            GlobalArray.push({
                socket,
                roomId: data.payload.roomId,
                username: data.payload.username
            });
            console.log("joined");
        }
        if (data.type === "chat") {
            let roomId = findRoomId(socket);
            GlobalArray.forEach(el => {
                if (el.roomId === roomId) {
                    el.socket.send(JSON.stringify({
                        message: data.payload.message,
                        username: data.payload.username,
                    }));
                    console.log("sent");
                }
            });
            socket.on("close", () => {
                GlobalArray = GlobalArray.filter(el => el.socket !== socket);
            });
        }
  });
});
console.log(JSON.stringify({
    type: "join",
    payload: {
        username: "prince",
        roomId: "redd"
    }
}));
