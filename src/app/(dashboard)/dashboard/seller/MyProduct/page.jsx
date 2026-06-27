import MyProductCard from '@/component/MyProductSection';
import ProductCard from '@/component/ProductCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const page = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    
    
const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/myproduct/${session?.user?.id}`)
const data = await res.json()
console.log(data);

    return (
        <>
            <MyProductCard data={data}></MyProductCard>
        </>
    );
};

export default page;