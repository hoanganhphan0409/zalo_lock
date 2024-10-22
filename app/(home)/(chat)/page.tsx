import React from 'react'
import MessageControl from '@/components/control/MessageControl'
import MessageContent from '@/components/MessageContent'

const HomeChat = () => {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-3 min-w-[350px] flex-shrink-0 hidden md:block'>
        <MessageControl />
      </div>
      <div className='col-span-9 min-w-[300px] max-w-full flex-grow flex-shrink-0'>
        <MessageContent />
      </div>
    </div>

  )
}

export default HomeChat