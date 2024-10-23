import React from 'react';
import Avatar from '@/components/Avatar';

// Định nghĩa kiểu cho props
interface UserCardProps {
    userName: string;
    lastMessage: string;
    lastTimeMessage: string;
    imageUrl?: string;
    groupChatId: string;
    handleOpenMessageBox?: (id: string) => Promise<void>; // Thêm thuộc tính này và đánh dấu là có thể undefined
}
  
const UserCard: React.FC<UserCardProps> = ({ userName, lastMessage, lastTimeMessage, imageUrl, groupChatId, handleOpenMessageBox}) => {
    const handleClick = () => {
        if (handleOpenMessageBox) { // Kiểm tra trước khi gọi
            handleOpenMessageBox(groupChatId);
        }
    };

    return (
        <div 
            className='relative flex flex-row justify-between w-full cursor-pointer hover:bg-gray-100 pl-2 pr-2 pt-4 pb-4'
            onClick={handleClick} // Sửa ở đây
        >
            <div className='flex flex-row space-x-3 items-center w-full pr-2 pl-2'>
                <Avatar
                    isOnline={false}
                    imageUrl={imageUrl || '/images/defaultAvatar.png'} // fallback ảnh nếu không có
                    width={45}
                    height={45}
                    userName={userName}
                />
                <div className='flex flex-col justify-start'>
                    <h1 className='text-md font-semibold text-left'>{userName}</h1>
                    <p className='text-[14px] font-extralight text-gray-500'>{lastMessage}</p>
                </div>
            </div>
            <div className='absolute top-2 right-3'>
                <span className='text-xs text-gray-500'>{lastTimeMessage}</span>
            </div>
        </div>
    );
};

export default UserCard;
