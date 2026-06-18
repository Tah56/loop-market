import ProductCard from "@/component/ProductCard";
import React from "react";

const page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/products`);
  const data = await res.json();
  console.log(data);
  return (
    <div>
      <ProductCard data={data}></ProductCard>
    </div>
  );
};

export default page;
