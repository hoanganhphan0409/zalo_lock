"use client";
import { Dialog } from "@headlessui/react";

interface MemberInfor {
  zaloName: string;
  avatar: string;
  cover?: string;
  gender?: number;
  sdob?: string;
  phoneNumber?: string;
}

interface UserDetailPopupProps {
  member: MemberInfor;
  onClose: () => void;
}

const DetailPopup = ({ member, onClose}: UserDetailPopupProps) => {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-md w-full p-5 z-20">
          <img
            src={member.cover}
            alt="Cover"
            className="w-full h-32 object-cover rounded-t-lg"
          />

          <div className="flex flex-col items-center -mt-12">
            <img
              src={member.avatar}
              alt="Avatar"
              className="rounded-full w-24 h-24 border-4 border-white"
            />
            <h2 className="text-xl font-semibold text-center mt-2">
              {member.zaloName}
            </h2>
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            {member.gender !== undefined && (
              <p>
                <strong>Gender: </strong>
                {member.gender ? "Female" : "Male"}
              </p>
            )}

            {member.sdob && (
              <p>
                <strong>Birthday :</strong> {member.sdob}
              </p>
            )}
            {member.phoneNumber && (
              <p>
                <strong>Phone Number :</strong> +{member.phoneNumber}
              </p>
            )}
          </div>
          <div className="flex justify-end mt-5">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DetailPopup;
