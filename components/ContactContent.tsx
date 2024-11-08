"use client";
import { useState, useEffect } from "react";
import MemberCard from "./MemberCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import DetailPopup from "./PopupDetail";
interface MemberInfor {
  zaloName: string;
  avatar: string;
  cover?: string;
  gender?: number;
  sdob?: string;
  phoneNumber?: string;
  id: string;
}

interface MemberGroupInfor {
  name: string;
  avtUrl: string;
}

interface ContactContentProps {
  activeTab: string;
  setLoading: (isLoading: boolean) => void;
}

const ContactContent = ({ activeTab, setLoading }: ContactContentProps) => {
  const [members, setMembers] = useState<MemberInfor[]>([]);
  const [selectedMember, setSelectedMember] = useState<MemberInfor | null>(
    null
  );
  const [groupMember, setGroupMembers] = useState<MemberGroupInfor[]>([]);
  useEffect(() => {
    const fetchMembers = async () => {
      setMembers([]);
      setLoading(true);
      try {
        const url =
          activeTab === "friends"
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/friends`
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}/groups`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${activeTab}`);
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [activeTab, setLoading]);

  useEffect(() => {
    const fetchGroupMember = async () => {
      if (selectedMember && activeTab !== "friends") {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/groups/${selectedMember.id}`
        );
        if (!response.ok) throw new Error(`Failed to fetch `);
        const data = await response.json();
        setGroupMembers(data);
      } else {
        setGroupMembers([]);
      }
    };
  
    fetchGroupMember();
  }, [selectedMember, activeTab]);

  return (
    <div className="flex flex-col p-2 mt-2 mb-2 ml-2 space-y-5 max-h-screen overflow-auto">
      <span className="text-md font-medium">
        {activeTab === "friends" ? "Friends List" : "Groups List"}
      </span>
      {members.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ScrollArea className="h-screen w-full rounded-md border">
          <div className="flex flex-col">
            {members.map((member) => (
              <MemberCard
                key={member.zaloName}
                memberInfor={{
                  name: member.zaloName,
                  avtUrl: member.avatar,
                  onClick: () => setSelectedMember(member),
                }}
              />
            ))}
            {selectedMember && (
              <DetailPopup
                member={selectedMember}
                onClose={() => setSelectedMember(null)}
                isGroup={activeTab !== "friends"}
                membersGroupInfor={groupMember}
              />
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default ContactContent;
