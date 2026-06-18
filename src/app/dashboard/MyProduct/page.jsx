import MyProductCard from '@/component/MyProductSection';
import ProductCard from '@/component/ProductCard';
import React from 'react';

const page = async() => {
const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/products`)
const data = await res.json()
console.log(data);

    return (
        <div className='grid grid-cols-3 p-3'>
            <MyProductCard data={data}></MyProductCard>
        </div>
    );
};

export default page;