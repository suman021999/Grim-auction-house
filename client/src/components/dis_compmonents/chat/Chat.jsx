import { Send } from "lucide-react";
import React, { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Alice",
      text: "Is the clock fully restored?",
      type: "other",
    },
    {
      id: 2,
      user: "You",
      text: "Yes, it's in excellent working condition.",
      type: "me",
    },
    {
      id: 3,
      user: "Bob",
      text: "Any shipping options available?",
      type: "other",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      { id: messages.length + 1, user: "You", text: newMessage, type: "me" },
    ]);
    setNewMessage("");
  };

  return (
    <section >
      <h3 className="font-semibold p-2 mb-2">Live Chat</h3>
      <div className="border-t  border-gray-300" />
      <div className="flex flex-col h-[650px] mt-2">

      {/* Messages */}
      <div className="flex-1 overflow-scroll overflow-x-hidden mb-4 space-y-3 p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.type === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-[70%] ${
                msg.type === "me"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm font-semibold bg-amber-300 w-10 h-10 flex items-center justify-center rounded-full">
                {msg.user}
              </p>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Divider */}
      <div className="border-t  border-gray-300" />

      {/* Input */}
      <div className="flex pt-2 items-center p-2 gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 rounded-lg p-2 text-sm outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-2 py-2 rounded-lg"
        >
          <Send />
        </button>
      </div>
      </div>

     
    </section>
  );
};

export default Chat;
