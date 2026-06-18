import { Navigation } from '@/component/DashboardSideBar';
import React from 'react';

const layout = ({children}) => {
    return (
        <div className='flex min-h-screen'>
            <Navigation></Navigation>
            <main className='flex-1'>
                {children}
            </main>
        </div>
    );
};

export default layout;