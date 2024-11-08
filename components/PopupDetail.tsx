"use client";
import { Dialog } from "@headlessui/react";
import { ScrollArea } from "./ui/scroll-area";
import Avatar from "@/components/Avatar";

interface MemberInfor {
  zaloName: string;
  avatar: string;
  cover?: string;
  gender?: number;
  sdob?: string;
  phoneNumber?: string;
}

interface MemberGroupInfor {
  name: string;
  avtUrl: string;
}

interface UserDetailPopupProps {
  member: MemberInfor;
  onClose: () => void;
  isGroup: boolean;
  membersGroupInfor?: MemberGroupInfor[];
}

const DetailPopup = ({
  member,
  onClose,
  isGroup,
  membersGroupInfor,
}: UserDetailPopupProps) => {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-md w-full p-5 z-20">
          <ScrollArea className="max-h-[calc(100dvh-200px)] overflow-auto">
            {!isGroup && member.cover && (
              <img
                src={member.cover}
                alt="Cover"
                className="w-full h-32 object-cover rounded-t-lg"
              />
            )}

            <div
              className={`flex flex-col items-center ${
                !isGroup && member.cover ? "-mt-12" : "mt-4"
              }`}
            >
              <Avatar
                isOnline={false}
                imageUrl={member.avatar}
                width={75}
                height={75}
                userName={member.zaloName}
              />
              <div className="flex items-center mt-2">
                <h1 className="text-lg font-semibold ml-1 text-center">
                  {member.zaloName}
                </h1>
              </div>
            </div>

            {isGroup ? (
              <div className="flex flex-col space-y-2 mt-4">
                <h1 className="font-semibold text-base">Group Members:</h1>
                <ul className="list-disc pl-5">
                  {membersGroupInfor?.map((groupMember, index) => (
                    <li key={index} className="flex items-start space-x-2 p-2">
                      <Avatar
                        isOnline={false}
                        imageUrl={groupMember.avtUrl}
                        width={40}
                        height={40}
                        userName={groupMember.name}
                      />
                      <div className="flex items-center mt-2">
                        <h1 className="text-base font-medium ml-1">
                          {groupMember.name}
                        </h1>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 mt-4">
                {member.gender !== undefined && (
                  <p>
                    <strong>Gender: </strong>
                    {member.gender ? "Female" : "Male"}
                  </p>
                )}
                {member.sdob && (
                  <p>
                    <strong>Birthday:</strong> {member.sdob}
                  </p>
                )}
                {member.phoneNumber && (
                  <p>
                    <strong>Phone Number:</strong> +{member.phoneNumber}
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end mt-5">
              <button
                onClick={onClose}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </ScrollArea>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DetailPopup;
