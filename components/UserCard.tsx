import React from 'react'
import Avatar from '@/components/Avatar'

const UserCard = () => {
    return (
        <div className='relative flex flex-row justify-between w-full cursor-pointer hover:bg-gray-100 pl-2 pr-2 pt-4 pb-4'>
            <div className='flex flex-row space-x-3 items-center w-full pr-2 pl-2'>
                <Avatar
                    isOnline={true}
                    imageUrl='/images/avatarEx.png'
                    width={45}
                    height={45}
                    userName='User profile image'
                />
                <div className='flex flex-col items-center'>
                    <h1 className='text-md font-semibold text-center'>Phạm Anh Dũng</h1>
                    <p className='text-[14px] font-extralight text-gray-500 text-center'>How are you today?</p>
                </div>

            </div>
            <div className='absolute top-2 right-3'>
                <span className='text-xs text-gray-500'>1 giờ</span>
            </div>
        </div>

    )
}

export default UserCard