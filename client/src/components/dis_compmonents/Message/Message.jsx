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

<>


  <div className="flex flex-col h-screen md:flex-row  bg-gray-50">

      {/* Sidebar (Mobile overlay + Desktop fixed) */}
    <div
  className={`fixed lg:static top-0 left-0 h-full w-72
     sm:w-64 bg-white border-r border-gray-200 
      flex flex-col z-20 transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  `}
>

        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
          {/* Close button on mobile */}
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
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto overscroll-contain space-y-3 p-3">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                conversation.active
                  ? "bg-blue-50 border-l-4 border-l-blue-500"
                  : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                  {conversation.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {conversation.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.preview}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"></div>
            <div>
              <h2 className="font-semibold text-gray-900">
                Vintage Grandfather Clock
              </h2>
              <p className="text-sm text-gray-500">Active now</p>
            </div>
          </div>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex items-end space-x-2 max-w-[80%] sm:max-w-md">
                {message.sender === "seller" && (
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm"></div>
                )}
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-gray-100 text-gray-900 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm sm:text-base">{message.text}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400 ml-2 self-end pb-1">
                {message.time}
              </span>
            </div>
          ))}
        </div>






        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-end space-x-2">
            <div className="flex-1 relative min-w-0">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                rows="1"
                style={{ minHeight: "44px", maxHeight: "120px" }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
</div>

</>
    
  );
};

export default Message;






