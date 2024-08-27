import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
//connection to the BE server, we can use this to emit or listen for events
const socket = io.connect("http://localhost:3001"); //url for the backend

function App() {
  const [msg, setMsg] = useState("");
  const [msgReceived, setMsgReceived] = useState("");
  const [room, setRoom] = useState("");
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  const handleSendMessage = () => {
    //emit and event for the other person to listen
    socket.emit("send_message", { msg,room }); //specify the room we are sending it to
  };
  useEffect(() => {
    socket.on("received_message", (data) => {
      setMsgReceived(data.msg);
      alert(data.msg);
    });
  }, [socket]);
  return (
    <div className="App">
      <input
        placeholder="Enter Room Number"
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom}>Join Room</button>
      <input
        placeholder="Type..."
        onChange={(e) => {
          setMsg(e.target.value);
        }}
      />
      <button onClick={handleSendMessage}>Send Message</button>
      <h1>Message:</h1>
      <p>{msgReceived}</p>
    </div>
  );
}

export default App;
