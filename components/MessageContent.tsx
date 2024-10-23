"use client";
import React, { useEffect, useRef } from 'react';
import Avatar from "@/components/Avatar";

interface MessageContentProps {
  messages: { groupChatId: number; content: string; isSelf: boolean; sendAt: string }[]; // Định nghĩa kiểu cho messages
}

const MessageContent: React.FC<MessageContentProps> = ({ messages }) => {
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
            key={message.groupChatId}
            className={`flex items-center mb-3 ${message.isSelf === true ? "justify-end" : "justify-start"}`}
          >
            {message.isSelf === false && (
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
                  <span className="text-xs text-gray-500 mt-1">{message.sendAt}</span>
                </div>
              </div>
            )}
            {message.isSelf === true && (
              <div className="flex items-center space-x-3">
                <div className="max-w-xs p-3 rounded-lg bg-blue-200 text-black">
                  <p>{message.content}</p>
                  <span className="text-xs text-gray-500 mt-1">{message.sendAt}</span>
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
