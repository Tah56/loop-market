import ProductDetailsPage from "@/component/ProductDetailsPage";
import { authClient } from "@/lib/auth-client";
import React from "react";

const page = async ({params}) => {
    const {id}= await params
    console.log(id);
      const { data: session } = await authClient.getSession();
    
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/products/${id}`);
  const data =  await res.json()
  console.log(data);
  return (
    <div>
      <ProductDetailsPage session={session} data={data}></ProductDetailsPage>
    </div>
  );
};

export default page;
