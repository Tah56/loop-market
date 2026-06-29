import DashboardNavbar from '@/component/DashboardNav';
import { Navigation } from '@/component/DashboardSideBar';


import DashNav from '@/component/Dashnav';
import React from 'react';

const layout = ({children}) => (


    <div>
        <DashNav></DashNav>
        <div className='flex min-h-screen'>
            <Navigation />
            <main className='flex-1'>
                {children}
            </main>
        </div>
    </div>
);

export default layout;