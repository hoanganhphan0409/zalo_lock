"use client";
import { ContactRound, Group } from "lucide-react";

interface ContactControlProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ContactControl = ({ activeTab, setActiveTab }: ContactControlProps) => {
  return (
    <div className="flex flex-col border-[1px] border-t-0 h-screen">
      <button
        className={`flex items-center gap-2 w-full p-3 ${
          activeTab === "friends" ? "bg-blue-400" : "bg-white hover:bg-blue-200"
        } `}
        onClick={() => setActiveTab("friends")}
      >
        <ContactRound className="ml-2 w-8 h-8" />
        <h1 className="text-lg font-medium ml-1">List friends</h1>
      </button>
      <button
        className={`flex items-center gap-2 w-full p-3 ${
          activeTab === "groups" ? "bg-blue-400" : "bg-white hover:bg-blue-200"
        } `}
        onClick={() => setActiveTab("groups")}
      >
        <Group className="ml-2 w-8 h-8" />
        <h1 className="text-lg font-medium ml-1">List groups</h1>
      </button>
    </div>
  );
};

export default ContactControl;
