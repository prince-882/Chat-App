import { WebSocket, WebSocketServer } from "ws";
const wss = new WebSocketServer({port:8080})
interface Objs{
  "roomId":string,
  "socket":WebSocket,
  "username":string
}
let GlobalArray: Objs[] = []
function findRoomId(socket:WebSocket){
  let roomId ;
  GlobalArray.forEach(el => {
    if (el.socket === socket) {
      roomId =  el.roomId
    }
  });
  return roomId
}
wss.on("connection", function(socket){
  console.log("connected");
  
socket.on("message",(message:string)=>{
let data = JSON.parse(message)
if (data.type === "join") {
  GlobalArray.push({
    socket,
    roomId:data.payload.roomId,
    username:data.payload.username
  })
  console.log("joined");
  
}
if (data.type === "chat") {
 let roomId =  findRoomId(socket) as unknown as string
 GlobalArray.forEach(el => {
  if (el.roomId === roomId) {
    el.socket.send(JSON.stringify({
      message:data.payload.message,
      username:data.payload.username,
    }))
    console.log("sent");
    
  }
 });
 socket.on("close", ()=>{
  GlobalArray = GlobalArray.filter(el => el.socket !== socket)
 })
}
})
})

