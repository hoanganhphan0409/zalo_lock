import React, { useState } from "react";
import { cn } from "@/lib/utils";
import ImageAround from "./MemberCard";
import MemberCard from "./MemberCard";
const ImageSidebar = ({ isMinimized }: { isMinimized: boolean }) => {
  return (
    <aside
      className={cn(
        `relative hidden h-screen flex-none border-r transition-[width] duration-500 md:block`,
        isMinimized ? "w-80" : "w-0"
      )}
    >
      <div className="flex flex-col">
        <div className="flex justify-center space-x-3 border-b-2 pl-3 pb-3 pt-3">
          <h1
            className={cn(`text-xl font-medium`, isMinimized ? "" : "hidden")}
          >
            Member
          </h1>
        </div>
        <div className="flex flex-col p-2 m-2 space-y-5">
          <span className="text-md font-medium">Member List</span>
          <div className="flex flex-col gap-2 space-y-2">
            <MemberCard />
            <MemberCard />
            <MemberCard />
            <MemberCard />
            <MemberCard />
            <MemberCard />
            <MemberCard />
            <MemberCard />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ImageSidebar;
