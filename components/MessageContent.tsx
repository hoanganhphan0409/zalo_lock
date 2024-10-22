import React from 'react'
import Avatar from '@/components/Avatar'

const MessageContent = () => {
  return (
    <div className='flex justify-start mt-3 flex-col w-full'>
      {/* User */}
      <div className='relative flex items-center space-x-3 border-b-2 pl-3 pb-3'>
        <Avatar
          isOnline={false}
          imageUrl='/images/avatarEx.png'
          width={50}
          height={50}
          userName='User profile image'
        />
        <div className='flex flex-col'>
          <h1 className='text-xl font-semibold'>Phạm Anh Dũng</h1>
          <span className='text-sm text-gray-500'>Đang hoạt động</span>
        </div>
        <div className='absolute'>

        </div>
      </div>
      {/* Message */}
      <div className='flex flex-col bg-gray-100 w-full h-screen'>
          Message
      </div>
    </div>

  )
}

export default MessageContent