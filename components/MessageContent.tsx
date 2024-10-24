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
  videoData?: any;
  isSelf: boolean;
  sendAt: string;
  senderAvtUrl: string;
  senderName: string;
  type: string; // Thêm type để kiểm tra loại tin nhắn
  fileData?: any;
}

interface MessageContentProps {
  messages: Message[];
  userInfo: Conversation;
}

const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes < 1024) return `${sizeInBytes} B`;
  if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  if (sizeInBytes < 1024 * 1024 * 1024) return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};


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
      case "chat.video.msg":
        return (
          <div className="max-w-xs bg-none">
            <video controls className="max-w-full">
              <source src={message.videoData?.href} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          </div>
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
          <div>
            <audio controls>
              <source src={message.attachmentUrl} type="audio/amr" />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      case "chat.recommended":
        const cardData = JSON.parse(message.cardData.description); // Phân tích JSON từ description
        return (
          <div className="flex flex-row w-full bg-blue-500 text-white rounded-lg p-2 gap-5 items-start">
            <div className="w-[70%] flex flex-row gap-2 mt-[10px]">
              <Avatar
                height={50}
                width={50}
                imageUrl={message.cardData.thumb}
                isOnline={false}
                userName={message.cardData.title}
              />
              <div className="flex flex-col justify-start">
                <h2 className="text-lg font-semibold">
                  {message.cardData.title}
                </h2>
                <p className="text-md mb-2 text-start">{cardData.phone}</p>
              </div>
            </div>

            {/* QR code (assuming you have a way to generate or obtain the URL) */}
            {cardData.qrCodeUrl && (
              <img
                src={cardData.qrCodeUrl}
                alt="QR Code"
                className="w-28 h-28 mt-4" // Adjust size as needed
              />
            )}
          </div>
        );
      case "share.file":
        const fileParams = JSON.parse(message.fileData.params); // Parse params để lấy thông tin file
        return (
          <div className="p-3 bg-gray-100 rounded-lg border border-gray-300">
            <h3 className="font-semibold">{message.fileData.title}</h3>
            <p className="text-sm text-gray-500">
              Size: {formatFileSize(fileParams.fileSize)}
            </p>
            <a
              href={message.fileData.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Download file
            </a>
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
                <div className="max-w-md p-[6px] rounded-lg bg-blue-200 text-black">
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
