"use client";
import React, { useEffect, useRef } from "react";
import Avatar from "@/components/Avatar";

interface Conversation {
  groupChatName: string;
  lastTimeMessage: string;
  lastMessage: string;
  groupAvtUrl: string;
  groupChatId: string;
  isPrivate: boolean;
}

interface Message {
  groupChatId: number;
  content?: string;
  attachmentUrl?: string;
  cardData?: any;
  isSelf: boolean;
  sendAt: string;
  senderAvtUrl: string;
  senderName: string;
  type: string; // Thêm type để kiểm tra loại tin nhắn
}

interface MessageContentProps {
  messages: Message[];
  userInfo: Conversation;
}

const MessageContent: React.FC<MessageContentProps> = ({
  messages,
  userInfo,
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const renderMessageContent = (message: Message) => {
    console.log("wtf" + message.type);

    switch (message.type) {
      case "chat.sticker":
        return (
          <img
            src={message.attachmentUrl}
            alt="Sticker"
            className="w-25 h-25 bg-none"
          />
        );
      case "chat.photo":
        return (
          <img
            src={message.attachmentUrl}
            alt="Photo"
            className="max-w-xs bg-none"
          />
        );
      case "chat.gif":
        return (
          <img
            src={message.attachmentUrl}
            alt="GIF"
            className="max-w-xs bg-none "
          />
        );
      case "chat.doodle":
        return (
          <img
            src={message.attachmentUrl}
            alt="Doodle"
            className="max-w-xs  bg-white"
          />
        );
      case "chat.voice":
        return (
          <audio controls>
            <source src={message.attachmentUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        );
      case "chat.recommended":
        const cardData = JSON.parse(message.cardData.description); // Phân tích JSON từ description
        return (
          <div className="bg-gray-200 p-3 rounded-lg">
            {/* Hiển thị thông tin card từ message.cardData */}
            <p className="font-semibold">{message.cardData.title}</p>
            <img
              src={message.cardData.thumb}
              alt={message.cardData.title}
              className="w-full h-auto rounded"
            />
            <p>Phone: {cardData.phone}</p>

            {/* Hiển thị QR code */}
            <img
              src={cardData.qrCodeUrl}
              alt="QR Code"
              className="w-32 h-32 mt-2" // Bạn có thể điều chỉnh kích thước tùy ý
            />
          </div>
        );

      default: // Mặc định hiển thị tin nhắn dạng text
        return <p>{message.content}</p>;
    }
  };

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Header - Thông tin người dùng */}
      <div className="relative flex items-center space-x-3 border-b-2 pl-3 pb-3 pt-3">
        <Avatar
          isOnline={false}
          imageUrl={userInfo.groupAvtUrl}
          width={50}
          height={50}
          userName={userInfo.groupChatName}
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{userInfo.groupChatName}</h1>
        </div>
      </div>

      {/* Message list */}
      <div className="flex flex-col bg-gray-100 w-full h-full overflow-y-auto p-3">
        {messages.map((message) => (
          <div
            key={message.groupChatId}
            className={`flex items-center mb-3 ${
              message.isSelf ? "justify-end" : "justify-start"
            }`}
          >
            {!message.isSelf && (
              <div className="flex flex-col items-start space-y-1">
                {/* Chỉ hiển thị tên người gửi nếu isPrivate = false */}
                {!userInfo.isPrivate && (
                  <span className="text-xs text-green-600">
                    {message.senderName}
                  </span>
                )}
                <div className="flex items-center space-x-3">
                  <Avatar
                    isOnline={false}
                    imageUrl={message.senderAvtUrl}
                    width={40}
                    height={40}
                    userName={message.senderName}
                  />
                  <div className="max-w-md p-3 rounded-lg bg-white text-black">
                    {renderMessageContent(message)}
                    <span className="text-xs text-gray-500 mt-1">
                      {message.sendAt}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {message.isSelf && (
              <div className="flex items-center space-x-3">
                <div className="max-w-md p-3 rounded-lg bg-blue-200 text-black">
                  {renderMessageContent(message)}
                  <span className="text-xs text-gray-500 mt-1">
                    {message.sendAt}
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
