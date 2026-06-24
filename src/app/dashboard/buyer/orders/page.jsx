import MyOrders from '@/component/MyOrdersSection';
import { headers } from 'next/headers';
import React from 'react';

const page = async() => {
    const headersList = await headers();
        const origin = headersList.get("origin");
        console.log(origin);
        
    return (
        <div>
            <MyOrders></MyOrders>
        </div>
    );
};

export default page;