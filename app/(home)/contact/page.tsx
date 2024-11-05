"use client";
import React, { useState } from 'react';
import ContactControl from '@/components/control/ContactControl';
import ContactContent from '@/components/ContactContent';

const ContactPage = () => {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-3 min-w-[350px] flex-shrink-0 hidden md:block'>
        <ContactControl/>
      </div>
      <div className='col-span-9 min-w-[300px] max-w-full flex-grow flex-shrink-0'>
        <ContactContent/>
      </div>
    </div>
  );
};

export default ContactPage