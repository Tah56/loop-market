import EditProduct from '@/component/EditProduct';
import React from 'react';

const page = async({params}) => {
    const {id} = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/products/${id}`)
const data = await res.json()
console.log(data);
    return (
        <div>
            <EditProduct user={data}></EditProduct>
        </div>
    );
};

export default page;