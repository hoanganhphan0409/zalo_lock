import SidebarLeft from '@/components/layout/SidebarLeft'
import React from 'react'

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className='flex flex-row min-h-screen w-full overflow-hidden'>
            <div className='min-w-[80px] max-w-[5%] flex-shrink-0 h-screen'>
                <SidebarLeft />
            </div>
            <div className='min-w-[calc(100%-80px)] max-w-[95%] flex-shrink-0 h-screen'>
                {children}
            </div>
        </div>
    )
}

export default RootLayout