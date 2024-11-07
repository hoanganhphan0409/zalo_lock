"use client";
import React, { useState } from "react";
import ContactControl from "@/components/control/ContactControl";
import ContactContent from "@/components/ContactContent";

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [isLoading, setIsLoading] = useState(false); 
  const handleTabChange = (tab: string) => {
    if (activeTab === tab) return;
    setActiveTab(tab);
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 min-w-[350px] flex-shrink-0 hidden md:block">
        <ContactControl activeTab={activeTab} setActiveTab={handleTabChange} />
      </div>
      <div className="col-span-9 min-w-[300px] max-w-full flex-grow flex-shrink-0">
        <ContactContent activeTab={activeTab} setLoading={setIsLoading} />
      </div>
    </div>
  );
};

export default ContactPage;
