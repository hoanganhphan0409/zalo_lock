"use client";

import { ContactRound, Group } from "lucide-react";

const ContactControl = () => {
  return (
    <div className="flex flex-cols border-[1px] border-t-0 h-screen ">
      <div className="flex flex-row items-center gap-2 w-full p-3 bg-white hover:bg-blue-200">
        <ContactRound className="ml-2 w-8 h-8" />
        <h1 className="text-lg font-medium ml-1 ">List friends</h1>
      </div>
      <div className="flex flex-row items-center gap-2 w-full p-3 bg-white hover:bg-blue-200">
        <Group className="ml-2 w-8 h-8" />
        <h1 className="text-lg font-medium ml-1 ">List groups</h1>
      </div>
    </div>
  );
};

export default ContactControl;
