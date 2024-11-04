"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Avatar from "@/components/Avatar";
import Modal from "react-modal";
import { io } from "socket.io-client";
import { Button } from "./ui/button";
import { UsersRound } from "lucide-react";
import ImageSidebar from "./MemberSidebar";

const socket = io("http://localhost:8888");

interface MemberInfor {
  name: string;
  avtUrl: string;
}

interface Conversation {
  groupChatName: string;
  lastTimeMessage: string;
  lastMessage: string;
  groupAvtUrl: string;
  groupChatId: string;
  isPrivate: boolean;
  members?: MemberInfor[];
}

interface Message {
  groupChatId: number;
  content?: string;
  attachmentUrl?: string;
  cardData?: any;
  videoData?: any;
  isSelf: boolean;
  sentAt: string;
  senderAvtUrl: string;
  senderName: string;
  type: string; // Thêm type để kiểm tra loại tin nhắn
  fileData?: any;
  locationData: any;
}

interface MessageContentProps {
  messages: Message[];
  userInfo: Conversation;
}

const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes < 1024) return `${sizeInBytes} B`;
  if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  if (sizeInBytes < 1024 * 1024 * 1024)
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

const MessageContent: React.FC<MessageContentProps> = ({
  messages,
  userInfo,
}) => {
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
    const timeout = setTimeout(scrollToBottom, 300); // Đặt thời gian chờ bằng 0
    return () => clearTimeout(timeout);
  }, [messages]); // Mỗi khi messages thay đổi, sẽ cuộn đến cuối

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

    let formattedTime;

    // Kiểm tra xem tin nhắn có phải trong ngày hôm nay không
    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      // Hiển thị giờ và phút
      formattedTime = messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      // Hiển thị ngày và giờ
      formattedTime = messageDate.toLocaleString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    switch (message.type) {
      case "chat.sticker":
        return (
          <div>
            <img
              src={message.attachmentUrl}
              alt="Sticker"
              className="w-25 h-25 bg-none"
            />
            <span className="p-2 text-xs text-gray-500 mt-1">
              {formattedTime}
            </span>
          </div>
        );
      case "chat.photo":
        return (
          <div>
            <img
              src={message.attachmentUrl}
              alt="Photo"
              className="max-w-xs bg-none"
              onClick={() => openImageModal(message.attachmentUrl)}
            />
            <span className="p-2 text-xs text-gray-500 mt-1">
              {formattedTime}
            </span>
          </div>
        );
      case "chat.video.msg":
        return (
          <div className="max-w-xs bg-none">
            <video controls className="max-w-full">
              <source src={message.videoData?.href} type="video/mp4" />
              Your browser does not support the video element.
            </video>
            <span className="p-1 text-xs text-gray-500 mt-1">
              {formattedTime}
            </span>
          </div>
        );
      case "chat.gif":
        return (
          <div>
            <img
              src={message.attachmentUrl}
              alt="GIF"
              className="max-w-xs bg-none "
            />
            <span className="p-1 text-xs text-gray-500 mt-1">
              {formattedTime}
            </span>
          </div>
        );
      case "chat.doodle":
        return (
          <div>
            <img
              src={message.attachmentUrl}
              alt="Doodle"
              className="max-w-xs  bg-white"
            />
            <span className="p-1 text-xs text-gray-500 mt-1">
              {formattedTime}
            </span>
          </div>
        );
      case "chat.voice":
        return (
          <div>
            <audio controls>
              <source src={message.attachmentUrl} type="audio/amr" />
              Your browser does not support the audio element.
            </audio>
            <span className="p-1 text-xs text-gray-500 mt-1">
              {formattedTime}
            </span>
          </div>
        );
      case "chat.recommended":
        const cardData = JSON.parse(message.cardData.description); // Phân tích JSON từ description
        return (
          <div className="w-[100%]">
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
            <span className="p-1 text-xs text-gray-500 mt-1">
              {formattedTime}
            </span>
          </div>
        );
      case "share.file":
        const fileParams = JSON.parse(message.fileData.params); // Parse params để lấy thông tin file
        return (
          <div>
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
            <span className="p-1 text-xs text-gray-500 mt-1">
              {formattedTime}
            </span>
          </div>
        );
      case "chat.location.new":
        const locationParams = JSON.parse(message.locationData.params); // Parse params để lấy thông tin vị trí
        const { latitude, longitude } = locationParams;

        // URL cho Google Maps với tọa độ từ dữ liệu
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

        return (
          <div className="p-3 bg-gray-100 rounded-lg border border-gray-300">
            <h3 className="font-semibold">{message.locationData.title}</h3>
            <p className="text-sm text-black">
              {message.locationData.description}
            </p>
            <iframe
              title="Google Maps"
              src={googleMapsUrl}
              width="100%"
              height="200px"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              className="rounded-lg mt-2"
            />
            <span className="p-1 text-xs text-gray-500 mt-1">
              {formattedTime}
            </span>
          </div>
        );

      default: // Mặc định hiển thị tin nhắn dạng text
        return (
          <div className="p-1">
            <p>{message.content}</p>
            <span className="text-xs text-gray-500 mt-1">{formattedTime}</span>
          </div>
        );
    }
  };

  const [isMinimized, setIsMinimized] = useState(false);
  return (
    <div className="flex">
      <div className="flex flex-col w-full h-screen border-r-[1px] ">
        {/* Header - Thông tin người dùng */}
        <div className="relative flex items-center justify-between space-x-3 border-b-2 pl-3 pb-3 pt-3">
          <div className="flex items-center space-x-3">
            <Avatar
              isOnline={false}
              imageUrl={userInfo.groupAvtUrl}
              width={50}
              height={50}
              userName={userInfo.groupChatName}
            />
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">
                {userInfo.groupChatName}
              </h1>
            </div>
          </div>
          <div
            className="pr-6 pb-3 pt-3 cursor-pointer"
            onClick={() => setIsMinimized((prev) => !prev)}
          >
            {!userInfo.isPrivate && <UsersRound className="w-8 h-8" />}
          </div>
        </div>

        {/* Message list */}
        <div
          className="flex flex-col bg-gray-100 w-full h-full overflow-y-auto p-3"
          ref={messageList}
        >
          {messages.map((message) => {
            return (
              <div
                key={message.groupChatId}
                className={`flex items-center mb-3 ${
                  message.isSelf ? "justify-end" : "justify-start"
                }`}
              >
                {!message.isSelf && (
                  <div className="flex flex-col items-start justify-start space-y-1">
                    {!userInfo.isPrivate && (
                      <span className="text-xs text-green-600">
                        {message.senderName}
                      </span>
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
            );
          })}
          {/* Thêm một div để đánh dấu phần cuối */}
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeImageModal}
          className="flex items-center justify-center w-full h-full bg-black bg-opacity-75 relative"
        >
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 text-white text-6xl font-bold"
          >
            ×
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Enlarged"
              className="max-w-full max-h-full"
            />
          )}
        </Modal>
      </div>
      <ImageSidebar
        isMinimized={userInfo.isPrivate ? false : isMinimized}
        members={userInfo.members}
      />
    </div>
  );
};

export default MessageContent;
