"use client"
import React, { useEffect, useRef } from 'react';
import Avatar from "@/components/Avatar";

// Giả sử bạn có một mảng chứa các tin nhắn
const messages = [
  { id: 1, content: "Xin chào, Dũng!", sender: "other", time: "10:05 AM" },
  { id: 2, content: "Chào bạn!", sender: "me", time: "10:06 AM" },
  { id: 3, content: "Bạn đang làm gì đó?", sender: "other", time: "10:07 AM" },
  { id: 4, content: "Mình đang học React!", sender: "me", time: "10:08 AM" },
  { id: 5, content: "Mình đang học React!", sender: "me", time: "10:08 AM" },
  { id: 6, content: "Mình đang học React!", sender: "me", time: "10:08 AM" },
  { id: 7, content: "Mình đang học React!", sender: "me", time: "10:08 AM" },
  { id: 8, content: "Mình đang học React!", sender: "me", time: "10:08 AM" },
  { id: 9, content: "Mình đang học React!", sender: "me", time: "10:08 AM" },
  { id: 10, content: "Mình đang học React!", sender: "me", time: "10:08 AM" },
  { id: 11, content: "Mình đang học React!", sender: "me", time: "10:08 AM" },
];

const MessageContent = () => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); 

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Header - Thông tin người dùng */}
      <div className="relative flex items-center space-x-3 border-b-2 pl-3 pb-3 pt-3">
        <Avatar
          isOnline={false}
          imageUrl="/images/avatarEx.png"
          width={50}
          height={50}
          userName="User profile image"
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">Phạm Anh Dũng</h1>
          <span className="text-sm text-gray-500">Đang hoạt động</span>
        </div>
      </div>

      {/* Message list */}
      <div className="flex flex-col bg-gray-100 w-full h-full overflow-y-auto p-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-center mb-3 ${
              message.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "other" && (
              <div className="flex items-center space-x-3">
                <Avatar
                  isOnline={false}
                  imageUrl="/images/avatarEx.png"
                  width={40}
                  height={40}
                  userName="User profile image"
                />
                <div className="max-w-xs p-3 rounded-lg bg-white text-black">
                  <p>{message.content}</p>
                  <span className="text-xs text-gray-500 mt-1">
                    {message.time}
                  </span>
                </div>
              </div>
            )}
            {message.sender === "me" && (
              <div className="flex items-center space-x-3">
                <div className="max-w-xs p-3 rounded-lg bg-blue-200 text-black">
                  <p>{message.content}</p>
                  <span className="text-xs text-gray-500 mt-1">
                    {message.time}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
        {/* Thêm một div để đánh dấu phần cuối */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default MessageContent;
