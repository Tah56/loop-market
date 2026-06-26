import ProductCard from "@/component/ProductCard";
import React from "react";

const page = async ({searchParams}) => {
  const searchQuery = await searchParams;
  
console.log();

  const query = new URLSearchParams(searchQuery)
  const queryString = query.toString()

  console.log(queryString);
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/products?${queryString}`);
  const data = await res.json();
  console.log(data);
  return (
    <div>
      <ProductCard filters={searchQuery} data={data}></ProductCard>
    </div>
  );
};

export default page;
