import SellerOrders from '@/component/SellerOrderSection';
import { getUsers } from '@/lib/core/session,';
import React from 'react';

const page = async () => {
  const sellerId =await getUsers()
  const email = sellerId
  console.log(email);
  
  return (
    <div>
      <SellerOrders sellerId={sellerId}></SellerOrders>
    </div>
  );
};

export default page;