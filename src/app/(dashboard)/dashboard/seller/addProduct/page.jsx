import AddProductPage from '@/component/AddProductPage';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const page = async() => {
  const session =  await auth.api.getSession({
    headers: await headers()
  })
  return (
    <div>
      <AddProductPage user={session}/>
    </div>
  );
};

export default page;