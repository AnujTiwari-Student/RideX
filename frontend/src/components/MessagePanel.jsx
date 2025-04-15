import { ArrowLeft, Send, SendHorizonal } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const MessagePanel = ({ setMessagePanelOpen }) => {

    const date = new Date()
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , hour12: true })

    const {user} = useSelector((state)=> state.user)
    const {captain} = useSelector((state)=> state.captain)

    const currentUser = user || captain;

  const [messages, setMessages] = useState([
    { text: "Hey, I'm on my way. I'll be there in 5 minutes.", sender: "captain" },
    { text: "Alright, see you soon! Waiting at the pickup point.", sender: "user" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { text: newMessage, sender: currentUser }]);
    setNewMessage("");
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col z-[2000]">
      {/* Header */}
      <div className="flex items-center gap-32 z-[2000] px-4 py-4 w-full bg-white">
        <ArrowLeft onClick={() => setMessagePanelOpen(false)} className="cursor-pointer" />
        <h3 className="text-xl font-bold text-center">Anuj</h3>
      </div>
      <div className="border-b-2 border-gray-500 mb-4"></div>

      <div className="w-full mb-4">
        <h5 className="text-sm text-gray-500 font-medium text-center">Today at {time}</h5>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`w-full flex ${msg.sender === currentUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] font-medium rounded-lg py-4 px-4 ${msg.sender === currentUser ? "bg-orange-400 text-white" : "bg-white text-black"} shadow`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="bg-white px-4 py-4 flex items-center border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage} className="ml-2 text-white px-4 py-2 rounded-lg">
          <SendHorizonal color="orange" size={28} />
        </button>
      </div>
    </div>
  );
};

export default MessagePanel;
