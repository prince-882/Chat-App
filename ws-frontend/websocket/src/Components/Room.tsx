import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
const Room = () => {
  interface message {
    message: string;
    username: string;
  }
  const [messages, setMessages] = useState<message[]>([]);
  const [username, setusername] = useState("");
  const [data, setData] = useState("");
  let params = useParams();
  const ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    let usr = localStorage.getItem("username");
    if (!usr) {
      usr = prompt("Enter your username") as string;
      if (usr) {
        localStorage.setItem("username", usr);
      }
    }
    setusername(usr || "");
    let socket = new WebSocket("ws://localhost:8080");
    ws.current = socket;
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: params.roomId,
            username,
          },
        })
      );
    };
    socket.onmessage = (ev) => {
      setMessages((pr) => [...pr, JSON.parse(ev.data)]);
    };
  }, []);
  function deleteMessage(message: string, username: string) {
    setMessages((prev) =>
      prev.filter(
        (item) => !(item.username === username && item.message === message)
      )
    );
  }
  function HandleSend() {
    if (!ws.current) return;
    ws.current.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: data,
          username,
        },
      })
    );
    setData("");
  }
  function HandleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!ws.current) return;
    ws.current.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: data,
          username,
        },
      })
    );
  }
  return (
    <>
      <div className="h-[92vh] chatbox bg-gray-900 w-[100vw] m-0 py-8 overflow-y-scroll ">
        <div className="flex flex-col gap-4 items-start   w-full p-8  mx-auto">
          {messages.map((item: message, index: number) => {
            return (
              <div key={index} className="w-full">
                {item.username !== username && (
                  <div className="bg-gradient-to-r from-blue-800 via-indigo-800 min-w-[20vw] to-purple-800 p-4 rounded-xl shadow-lg border border-blue-700/40 w-full flex items-center justify-between max-w-[80%]">
                    <div>
                      <span className="block text-blue-300 font-semibold mb-1 text-sm">
                        {item.username}
                      </span>
                      <span className="block text-blue-100 text-xs">
                        {item.message}
                      </span>
                    </div>
                  </div>
                )}
                {item.username === username && (
                  <div className="w-full  flex justify-end">
                    <div className="bg-gradient-to-r left-3 relative  from-blue-800 via-indigo-800 to-purple-800 p-4 rounded-xl shadow-lg border border-blue-700/40 flex items-center justify-between max-w-[80%]">
                      <div>
                        <span className="block text-blue-300 font-semibold mb-1 text-sm">
                          You
                        </span>
                        <span className="block text-blue-100 text-xs">
                          {item.message}
                        </span>
                      </div>
                    <button
                      onClick={() => {
                        deleteMessage(item.message, item.username);
                      }}
                      className="ml-4 p-2 rounded hover:bg-blue-900 transition-colors"
                    >
                      <img
                        src="/delete.svg"
                        alt="Delete"
                        className="w-15 h-5"
                      />
                    </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {/* Message from another user (left) */}
          {/* Message from you (right) */}
        </div>
      </div>
      <div className="flex justify-center  gap-3 items-center ">
        <input
          type="text"
          placeholder="Enter Your Message"
          value={data}
          onChange={(e) => {
            setData(e.target.value);
          }}
          className="flex-1  p-3 rounded-lg   bg-[#181a2b] text-blue-200 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-800/40 shadow-inner text-lg transition-all duration-200"
        />
        <button
          onClick={HandleSend}
          type="submit"
          className=" px-6 py-3 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 hover:from-blue-800 hover:to-indigo-900 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 text-lg border border-blue-400/30"
        >
          Send
        </button>
      </div>
    </>
  );
};

export default Room;
