
import React, { useState } from "react";
import { Send, Search, Menu, X } from "lucide-react";

const Message = () => {
  const [newMessage, setNewMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "user",
      text: "Hi, I'm interested in the grandfather clock. Can you tell me more about its history?",
      time: "10:28 AM",
    },
    {
      id: 2,
      sender: "seller",
      text: "Sure! It's a beautiful piece from the early 1900s, passed down through generations.",
      time: "10:30 AM",
    },
    {
      id: 3,
      sender: "user",
      text: "That sounds wonderful. Is there any specific documentation available?",
      time: "10:32 AM",
    },
    {
      id: 4,
      sender: "seller",
      text: "Yes, we have original purchase receipts and appraisal documents.",
      time: "10:35 AM",
    },
  ]);

  const conversations = [
    {
      id: 1,
      name: "Vintage Grandfather Clock",
      preview: "You: I'm interested in this item...",
      time: "10:30 AM",
      avatar: "🕐",
      active: true,
    },
    {
      id: 2,
      name: "Antique Silver Teapot",
      preview: "Seller: The teapot is in excellent condition...",
      time: "9:45 AM",
      avatar: "🫖",
    },
    {
      id: 3,
      name: "Rare Coin Collection",
      preview: "You: What's the provenance of the coins?",
      time: "8:20 AM",
      avatar: "🪙",
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "user",
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 ">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative md:translate-x-0 top-0 left-0 h-full w-72 sm:w-64 
           bg-white border-r border-gray-200 flex flex-col z-20 
           transform transition-transform duration-300`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto space-y-3 p-3">
          {conversations.map((c) => (
            <div
              key={c.id}
              className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                c.active ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{c.name}</h3>
                    <span className="text-xs text-gray-500">{c.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{c.preview}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
            <div>
              <h2 className="font-semibold text-gray-900">Vintage Grandfather Clock</h2>
              <p className="text-sm text-gray-500">Active now</p>
            </div>
          </div>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[80%] sm:max-w-md ${
                  m.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-md"
                    : "bg-gray-100 text-gray-900 rounded-bl-md"
                }`}
              >
                <p>{m.text}</p>
              </div>
              <span className="text-xs text-gray-400 ml-2 self-end">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200  p-4 mb-20 sm:mb-18 md:mb-0">
          <div className="flex items-end space-x-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="1"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 disabled:bg-gray-300"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;


