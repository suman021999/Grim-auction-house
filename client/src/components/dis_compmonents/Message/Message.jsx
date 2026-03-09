import React, { useEffect, useState } from "react";
import axios from "axios";
import { Send, Search, Menu, X, Users } from "lucide-react";

const Message = () => {
  const [newMessage, setNewMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);

  // ✅ search state
  const [search, setSearch] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const BASE_MESSAGE_URL = import.meta.env.VITE_MESSAGE_URL;

  // ✅ Load Conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(`${BASE_MESSAGE_URL}/my`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setConversations(res.data);

        if (res.data.length > 0) {
          setActiveConversation(res.data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchConversations();
  }, []);

  // ✅ Load Messages
  useEffect(() => {
    if (!activeConversation) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${BASE_MESSAGE_URL}/${activeConversation._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, [activeConversation]);

  // ✅ Send Message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const receiver =
        storedUser._id === activeConversation.buyer._id
          ? activeConversation.seller._id
          : activeConversation.buyer._id;

      const res = await axios.post(
        `${BASE_MESSAGE_URL}`,
        {
          conversationId: activeConversation._id,
          receiver,
          text: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ✅ Filter conversations
  const filteredConversations = conversations.filter((c) => {
    const otherUser = storedUser._id === c.buyer._id ? c.seller : c.buyer;

    return (
      c.auctionId?.title?.toLowerCase().includes(search.toLowerCase()) ||
      otherUser.username?.toLowerCase().includes(search.toLowerCase())
    );
  });

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto space-y-3 p-3">
          {filteredConversations.map((c) => {
            const otherUser =
              storedUser._id === c.buyer._id ? c.seller : c.buyer;

            return (
              <div
                key={c._id}
                onClick={() => setActiveConversation(c)}
                className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  activeConversation?._id === c._id
                    ? "bg-blue-50 border-l-4 border-l-blue-500"
                    : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                    💬
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium text-gray-900 truncate">
                        {c.auctionId?.title}
                      </h3>

                      <span className="text-xs text-gray-500">
                        {new Date(c.createdAt).toLocaleTimeString()}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 truncate">
                      Chat with {otherUser.username}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          {activeConversation && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  {activeConversation.auctionId?.title}
                </h2>

                <p className="text-sm text-gray-500">Auction Chat</p>
              </div>
            </div>
          )}

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
              key={m._id}
              className={`flex ${
                m.sender === storedUser._id || m.sender?._id === storedUser._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[80%] sm:max-w-md ${
                  m.sender === storedUser._id ||
                  m.sender?._id === storedUser._id
                    ? "bg-blue-500 text-white rounded-br-md"
                    : "bg-gray-100 text-gray-900 rounded-bl-md"
                }`}
              >
                {m.text}
              </div>

              <span className="text-xs text-gray-400 ml-2 self-end">
                {new Date(m.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 p-4 mb-20 sm:mb-18 md:mb-0">
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
