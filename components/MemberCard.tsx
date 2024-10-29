import Image from "next/image";
import React from "react";
import Avatar from "./Avatar";

const MemberCard = () => {
  return (
    <div className="flex flex-row w-full gap-2">
      <Avatar
              isOnline={false}
              imageUrl='/images/avatarEx.png'
              width={45}
              height={45}
              userName='Hello'
            />
      <div className="flex items-center">
          <h1 className="text-md font-medium ml-1">Pham Anh Dung</h1>
      </div>
    </div>
  );
};

export default MemberCard;
