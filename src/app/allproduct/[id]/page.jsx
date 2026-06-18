import ProductDetailsPage from "@/component/ProductDetailsPage";
import React from "react";

const page = async ({params}) => {
    const {id}= await params
    console.log(id);
    
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/products/${id}`);
  const data =  await res.json()
  console.log(data);
  return (
    <div>
      <ProductDetailsPage data={data}></ProductDetailsPage>
    </div>
  );
};

export default page;
