"use client";
import React, { useState } from 'react';
import MessageControl from '@/components/control/MessageControl';
import MessageContent from '@/components/MessageContent';

const HomeChat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null); // State để lưu thông tin user được chọn

  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-3 min-w-[350px] flex-shrink-0 hidden md:block'>
        <MessageControl setMessages={setMessages} setSelectedUser={setSelectedUser} />
      </div>
      <div className='col-span-9 min-w-[300px] max-w-full flex-grow flex-shrink-0'>
        {selectedUser && (
          <MessageContent messages={messages} userInfo={selectedUser} /> 
        )}
      </div>
    </div>
  );
};

export default HomeChat;
