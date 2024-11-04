"use client";
import React, { useState } from 'react';
import ContactControl from '@/components/control/ContactControl';

const ContactPage = () => {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-3 min-w-[350px] flex-shrink-0 hidden md:block'>
        <ContactControl/>
      </div>
    </div>
  );
};

export default ContactPage