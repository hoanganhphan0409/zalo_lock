import React from 'react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { ChevronDown, Ellipsis } from 'lucide-react'
import UserCard from '@/components/UserCard'

const MessageControl = () => {
  return (
    <div className='flex-cols border-[1px] border-t-0 h-screen'>
      {/* Header Message */}
      <div className='flex-cols mt-5 justify-between space-y-8 border-b-[1px] pb-1'>
        <div className='flex-rows w-full gap-3 pr-2 pl-2'>
          <div className='relative w-[80%]'>
            <Image
              src='/icons/search.svg'
              width={20}
              height={20}
              alt='Search icon'
              className='absolute top-2 left-2'
            />
            <Input
              type='text'
              placeholder='Tìm kiếm'
              className='w-full message-control-input'
            />
          </div>
          <div className='flex flex-row gap-2 w-[20%]'>
            <div className='w-full h-full cursor-pointer'>
              <Image
                src='/icons/user.svg'
                width={20}
                height={20}
                alt='Add friend'
                className='message-control-icon'
              />
            </div>
            <div className='w-full h-full cursor-pointer'>
              <Image
                src='/icons/users-group.svg'
                width={20}
                height={20}
                alt='Add group'
                className='message-control-icon'
              />
            </div>

          </div>
        </div>
        <div className='flex flex-row items-center justify-between gap-10 w-full'>
          <div className='flex-rows items-center gap-1'>
            <div className='message-control-button'>
              Tất cả
            </div>
            <div className='message-control-button'>
              Chưa đọc
            </div>
          </div>
          <div className='flex-rows'>
            <div className='flex-rows message-control-button'>
              Phân loại
              <ChevronDown />
            </div>
            <div className='message-control-button'>
              <Ellipsis />
            </div>
          </div>
        </div>
      </div>
      {/* List user message */}
      <div className='flex-cols w-full overflow-auto scrollbar justify-start'>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>

    </div>
  )
}

export default MessageControl