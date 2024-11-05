"use client";

import { ContactRound } from "lucide-react";

const ContactControl = () => {
  return (
    <div className="flex flex-cols border-[1px] border-t-0 h-screen ">
      <div className="flex flex-row items-center gap-2 w-full p-3 bg-blue-200">
        <ContactRound className="ml-2 w-8 h-8" />
        <h1 className="text-lg font-semibold ml-1 ">List friend</h1>
      </div>
    </div>
  );
};

export default ContactControl;
