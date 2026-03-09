import { Send } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../../../common/socket";

const Chat = ({ auctionId, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // ✅ Fetch old messages
  useEffect(() => {
    if (!auctionId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_CHAT_URL}/${auctionId}`,
          { withCredentials: true },
        );

        const formatted = res.data.map((msg) => ({
          id: msg._id,
          user: msg.sender?.username,
          text: msg.message,
          type: msg.sender?._id === (user?._id || user?.id) ? "me" : "other",
        }));

        setMessages(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();

    // ✅ Join auction room
    socket.emit("joinAuction", auctionId);

    // ✅ Listen for new messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          id: msg._id,
          user: msg.sender?.username,
          text: msg.message,
          type: msg.sender?._id === (user?._id || user?.id) ? "me" : "other",
        },
      ]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [auctionId, user]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    console.log("Sending message:", user);
    // 🔥 Send via socket
    socket.emit("sendMessage", {
      auctionId,
      senderId: user?._id || user?.id,
      message: newMessage,
    });

    setNewMessage("");
  };

  return (
    <section>
      <h3 className="font-semibold p-2 mb-2">Live Chat</h3>
      <div className="border-t border-gray-300" />
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
        <div className="border-t mb-4 border-gray-300" />

        {/* Input */}
        <div className="relative pt-2 items-center p-2 gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 w-full rounded-lg p-2 text-sm outline-none border-gray-300 pr-12"
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            className="
              bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-blue-700 transition
              md:absolute md:bottom-2 md:right-2
            "
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Chat;
