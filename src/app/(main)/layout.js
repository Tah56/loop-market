

import Footer from '@/component/Footer';
import AppNavbar from '@/component/Navbar';
import React from 'react';
import { Toaster } from 'react-hot-toast';


const mainLayout = ({children}) => {
    return (
        <div>
            <AppNavbar/>
            {children}
             <Toaster />
        <Footer></Footer>
        </div>
    );
};

export default mainLayout;