import React from 'react'
import Image from 'next/image'
import Avatar from '@/components/Avatar'

const SidebarLeft = () => {
  return (
    <div className='flex-cols bg-blue-500 h-screen space-y-10 pt-10'>
      <div className='flex items-center justify-center cursor-pointer hover:scale-110'>
        <Avatar
          isOnline={true}
          imageUrl='/images/avatarEx.png'
          width={50}
          height={50}
          userName='User profile image'
        />
      </div>
      <div className='flex-cols w-full space-y-0'>
        <div className='flex-center sidebar-button'>
          <Image
            src='/icons/message.svg'
            width={40}
            height={40}
            alt='Message button'
            className=''
          />
        </div>
        <div className='flex-center sidebar-button'>
          <Image
            src='/icons/contact.svg'
            width={30}
            height={30}
            alt='Message button'
            className=''
          />
        </div>
      </div>
      <div className='flex items-end w-full h-full'>
        <div className='flex justify-center items-center sidebar-button'>
          <Image
            src='/icons/settings.svg'
            width={40}
            height={40}
            alt='Message button'
            className=''
          />
        </div>
      </div>

    </div>

  )
}

export default SidebarLeft