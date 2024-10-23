"use client"
import React, { useState } from 'react';
import MessageControl from '@/components/control/MessageControl';
import MessageContent from '@/components/MessageContent';

const HomeChat = () => {
  const [messages, setMessages] = useState<any[]>([]); // State để lưu trữ tin nhắn

  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-3 min-w-[350px] flex-shrink-0 hidden md:block'>
        <MessageControl setMessages={setMessages} /> {/* Truyền setMessages vào MessageControl */}
      </div>
      <div className='col-span-9 min-w-[300px] max-w-full flex-grow flex-shrink-0'>
        <MessageContent messages={messages} /> {/* Truyền messages vào MessageContent */}
      </div>
    </div>
  );
};

export default HomeChat;
