"use client";
import { useState, useEffect } from "react";
import MemberCard from "./MemberCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MemberInfor {
  zaloName: string;
  avatar: string;
}

const ContactContent = () => {
  const [members, setMembers] = useState<MemberInfor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}/friends`);
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/friends`);
        if (!response.ok) throw new Error("Failed to fetch friends");
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="flex flex-col p-2 mt-2 mb-2 ml-2 space-y-5 max-h-screen overflow-auto">
      <span className="text-md font-medium">Friends List</span>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ScrollArea className="h-screen w-full rounded-md border">
          <div className="flex flex-col">
            {members.map((member) => (
              <MemberCard
                memberInfor={{ name: member.zaloName, avtUrl: member.avatar }}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default ContactContent;
