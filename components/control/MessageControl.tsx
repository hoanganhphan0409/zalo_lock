"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ChevronDown, Ellipsis } from "lucide-react";
import UserCard from "@/components/UserCard";
import { formatDistanceToNow } from "date-fns";
import { io } from "socket.io-client";

const socket = io("http://localhost:8888");

// Khai báo kiểu dữ liệu cho người dùng
interface Conversation {
  groupChatName: string;
  lastTimeMessage: string;
  lastMessage: string;
  groupAvtUrl: string;
  groupChatId: string;
  isPrivate: boolean;
}

interface MessageControlProps {
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<Conversation>>; 
}

const MessageControl: React.FC<MessageControlProps> = ({ setMessages, setSelectedUser }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentGroupChatId, setCurrentGroupChatId] = useState<string>();
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

  useEffect(() => {
    const fetchMessages = async (groupId: string) => {
      try {
        const response = await fetch(`http://localhost:8081/messages/${groupId}`);
        if (!response.ok) {
          throw new Error("Không thể lấy tin nhắn");
        }
        const data = await response.json();        
        setMessages(data); 
      } catch (error) {
        console.error("Lỗi khi lấy tin nhắn:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8081/groupChats");
        const data = await response.json();
        setConversations(data.conversations);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    socket.on("newMessage", (data) => {
        fetchUsers();
        if (data.groupChatId === currentGroupChatId) {
          setMessages([]);
        fetchMessages(data.groupChatId); 
        }
    });

    return () => {
      socket.off("newMessage");
    };
  });
  const handleOpenMessageBox = async (id: string, conversation: Conversation): Promise<void> => {
    setMessages([]); 
    const fetchMessageBox = async (groupId: string) => {
      try {
        const response = await fetch(`http://localhost:8081/messages/${groupId}`);
        if (!response.ok) {
          throw new Error("Không thể lấy tin nhắn");
        }
        const data = await response.json();
        setMessages(data); // Cập nhật state tin nhắn
      } catch (error) {
        console.error("Lỗi khi lấy tin nhắn:", error);
      }
    };

    setSelectedUser(conversation); 
    setCurrentGroupChatId(id)
    await fetchMessageBox(id);
  };

  return (
    <div className="flex-cols border-[1px] border-t-0 h-screen">
      <div className="flex flex-col w-full overflow-auto scrollbar justify-start">
        {conversations.map((conversation, index) => {
          const lastTimeRelative = formatDistanceToNow(
            new Date(conversation.lastTimeMessage),
            { addSuffix: true }
          );

          return (
            <UserCard
              handleOpenMessageBox={() => handleOpenMessageBox(conversation.groupChatId, conversation)} // Truyền thêm conversation
              key={conversation.groupChatId + "-" + index}
              groupChatId={conversation.groupChatId}
              userName={conversation.groupChatName}
              lastMessage={conversation.lastMessage}
              lastTimeMessage={lastTimeRelative}
              imageUrl={conversation.groupAvtUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MessageControl;
