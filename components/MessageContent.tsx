"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import Avatar from "@/components/Avatar";
import Modal from "react-modal";

// Interface và hàm khác...

const MessageContent: React.FC<MessageContentProps> = ({ messages, userInfo }) => {
  const messageList = useRef<HTMLDivElement | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useLayoutEffect(() => {
    const scrollToBottom = () => {
      if (messageList.current) {
        messageList.current.scrollTop = messageList.current.scrollHeight;
      }
    };
    scrollToBottom();
    const timeout = setTimeout(scrollToBottom, 300);
    return () => clearTimeout(timeout);
  }, [messages]);

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const renderMessageContent = (message: Message) => {
    const messageDate = new Date(message.sentAt);
    const today = new Date();
    const formattedTime =
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
        ? messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : messageDate.toLocaleString([], { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });

    switch (message.type) {
      case "chat.photo":
        return (
          <div>
            <img
              src={message.attachmentUrl}
              alt="Photo"
              className="max-w-xs bg-none cursor-pointer"
              onClick={() => openImageModal(message.attachmentUrl)}
            />
            <span className="p-2 text-xs text-gray-500 mt-1">{formattedTime}</span>
          </div>
        );
      // Các case khác giữ nguyên...
      default:
        return (
          <div className="p-1">
            <p>{message.content}</p>
            <span className="text-xs text-gray-500 mt-1">{formattedTime}</span>
          </div>
        );
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

      {/* Danh sách tin nhắn */}
      <div
        className="flex flex-col bg-gray-100 w-full h-full overflow-y-auto p-3"
        ref={messageList}
      >
        {messages.map((message, index) => (
          <div
            key={message.groupChatId}
            className={`flex items-center mb-3 ${message.isSelf ? "justify-end" : "justify-start"}`}
          >
            {!message.isSelf && (
              <div className="flex flex-col items-start justify-start space-y-1">
                {!userInfo.isPrivate && (
                  <span className="text-xs text-green-600">{message.senderName}</span>
                )}
                <div className="flex items-start space-x-3">
                  <Avatar
                    isOnline={false}
                    imageUrl={message.senderAvtUrl}
                    width={40}
                    height={40}
                    userName={message.senderName}
                  />
                  <div className="max-w-md p-[8px] rounded-lg bg-white text-black">
                    {renderMessageContent(message)}
                  </div>
                </div>
              </div>
            )}
            {message.isSelf && (
              <div className="flex items-center space-x-3">
                <div className="max-w-md p-[8px] rounded-lg bg-blue-200 text-black">
                  {renderMessageContent(message)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal hiển thị ảnh phóng to */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeImageModal}
        className="flex items-center justify-center w-full h-full bg-black bg-opacity-75 relative"
      >
        <button
          onClick={closeImageModal}
          className="absolute top-4 right-4 text-white text-5xl font-bold"
        >
          ×
        </button>
        {selectedImage && (
          <img src={selectedImage} alt="Enlarged" className="max-w-full max-h-full" />
        )}
      </Modal>
    </div>
  );
};

export default MessageContent;
