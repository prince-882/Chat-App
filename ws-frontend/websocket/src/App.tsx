import {  useState } from "react";
import "./App.css";
import { Link } from "react-router";

function App() {
  function generateRoomId(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  const [roomId, setroomId] = useState("");
  return (
    <>
      <div className="m-auto  w-screen h-screen flex items-center justify-center bg-gradient-to-br from-black via-indigo-900 to-blue-900 relative overflow-hidden p-4">
        <div className="absolute inset-0 pointer-events-none  z-0">
          <svg
            width="100%"
            height="100%"
            className="absolute inset-0"
            style={{ opacity: 0.18 }}
          >
            <defs>
              <radialGradient id="star" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
            </defs>
            {Array.from({ length: 40 }).map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 1600}
                cy={Math.random() * 900}
                r={Math.random() * 1.5 + 0.5}
                fill="url(#star)"
              />
            ))}
          </svg>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] p-8 bg-gradient-to-br from-[#23272f] via-[#1a1a2e] to-[#23272f] rounded-2xl shadow-2xl w-full max-w-md gap-8 border border-blue-800/40">
          <h1 className="text-4xl font-extrabold text-blue-200 text-center mb-4 tracking-widest drop-shadow-lg">
            Space Chat
          </h1>
          <button
          onClick={()=>{
            let str = generateRoomId()
             setroomId(str)
          }
          }
          className="w-[90%] py-3 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 text-lg mb-2 border border-blue-400/30">
            🚀 Create Room
          </button>
          <div className="flex items-center justify-center text-blue-300 mb-2">
            <span className="w-1/5 border-b border-blue-700"></span>
            <span className="mx-2 text-sm">or</span>
            <span className="w-1/5 border-b border-blue-700"></span>
          </div>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Room ID"
              className=" p-3 rounded-lg bg-[#181a2b] text-blue-200 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-800/40 shadow-inner"
              value={roomId}
              onChange={(e) => {
                setroomId(e.target.value);
              }}
            />
            <Link to={"/" + roomId}>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 hover:from-blue-800 hover:to-indigo-900 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 text-lg border border-blue-400/30"
            >
              🪐 Join Room
            </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
