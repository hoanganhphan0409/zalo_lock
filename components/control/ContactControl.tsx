"use client";

import { ContactRound } from "lucide-react";

const ContactControl = () => {
  return (
    <div className="flex flex-cols border-[1px] border-t-0 h-screen ">
      <div className="flex flex-row items-center gap-2 w-full p-3 hover:bg-gray-500">
        <ContactRound className="ml-2" />
        <h1 className="text-md font-thin ml-1 ">List friend</h1>
      </div>
    </div>
  );
};

export default ContactControl;
