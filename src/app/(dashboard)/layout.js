import DashboardNavbar from '@/component/DashboardNav';
import { Navigation } from '@/component/DashboardSideBar';
import DashNav from '@/component/Dashnav';
import React from 'react';

const layout = ({children}) => {
    return (


        <div>
           <DashNav></DashNav>
        <div className='flex min-h-screen'>
            <Navigation></Navigation>
            <main className='flex-1'>
                {children}
            </main>
        </div>
        </div>
    );
};

export default layout;