import Image from "next/image";
import React from "react";
import Avatar from "./Avatar";

interface MemberInfor {
  name: string;
  avtUrl: string;
}

const MemberCard = ({ memberInfor }: { memberInfor: MemberInfor}) => {
  return (
    <div className="flex flex-row w-full gap-2 hover:bg-gray-200 p-2">
      <Avatar
              isOnline={false}
              imageUrl={memberInfor.avtUrl}
              width={45}
              height={45}
              userName={memberInfor.name}
            />
      <div className="flex items-center">
          <h1 className="text-md font-medium ml-1">{memberInfor.name}</h1>
      </div>
    </div>
  );
};

export default MemberCard;
