"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ChevronDown, Ellipsis } from "lucide-react";
import UserCard from "@/components/UserCard";
import { formatDistanceToNow } from "date-fns";
// Khai báo kiểu dữ liệu cho người dùng
interface Conversation {
  groupChatName: string;
  lastTimeMessage: string;
  lastMessage: string;
  groupAvtUrl: string;
  groupChatId: string;
}

const MessageControl: React.FC = () => {
  // Sử dụng kiểu `User[]` cho state `users`
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Hàm gọi API để lấy danh sách người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8081/groupChats");
        const data = await response.json();
        setConversations(data.conversations);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);
  const handleOpenMessageBox = async (id: string): Promise<void> => {
    const fetchMessageBox = async (groupId: string) => {
      try {
        const response = await fetch(`http://localhost:8081/messages/${groupId}`);

        if (!response.ok) {
          throw new Error("Không thể lấy tin nhắn");
        }
        const data = await response.json();
        console.log("Tin nhắn:", data);
        return data; // Trả về dữ liệu nếu cần
      } catch (error) {
        console.error("Lỗi khi lấy tin nhắn:", error);
      }
    };

    await fetchMessageBox(id);
  };

  return (
    <div className="flex-cols border-[1px] border-t-0 h-screen">
      {/* Header Message */}
      <div className="flex-cols mt-5 justify-between space-y-8 border-b-[1px] pb-1">
        <div className="flex-rows w-full gap-3 pr-2 pl-2">
          <div className="relative w-[80%]">
            <Image
              src="/icons/search.svg"
              width={20}
              height={20}
              alt="Search icon"
              className="absolute top-2 left-2"
            />
            <Input
              type="text"
              placeholder="Tìm kiếm"
              className="w-full message-control-input"
            />
          </div>
          <div className="flex flex-row gap-2 w-[20%]">
            <div className="w-full h-full cursor-pointer">
              <Image
                src="/icons/user.svg"
                width={20}
                height={20}
                alt="Add friend"
                className="message-control-icon"
              />
            </div>
            <div className="w-full h-full cursor-pointer">
              <Image
                src="/icons/users-group.svg"
                width={20}
                height={20}
                alt="Add group"
                className="message-control-icon"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-10 w-full">
          <div className="flex-rows items-center gap-1">
            <div className="message-control-button">Tất cả</div>
            <div className="message-control-button">Chưa đọc</div>
          </div>
          <div className="flex-rows">
            <div className="flex-rows message-control-button">
              Phân loại
              <ChevronDown />
            </div>
            <div className="message-control-button">
              <Ellipsis />
            </div>
          </div>
        </div>
      </div>

      {/* List user message */}
      <div className="flex flex-col w-full overflow-auto scrollbar justify-start">
        {conversations.map((conversation, index) => {
          const lastTimeRelative = formatDistanceToNow(
            new Date(conversation.lastTimeMessage),
            { addSuffix: true }
          );

          return (
            <UserCard
              handleOpenMessageBox={handleOpenMessageBox}
              key={conversation.groupChatId}
              groupChatId={conversation.groupChatId}
              userName={conversation.groupChatName}
              lastMessage={conversation.lastMessage}
              lastTimeMessage={lastTimeRelative} // Thời gian tương đối
              imageUrl={conversation.groupAvtUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MessageControl;
