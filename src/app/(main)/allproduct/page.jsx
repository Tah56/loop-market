import DashboardSkeleton from "@/component/loading";
import ProductCard from "@/component/ProductCard";
import React, { Suspense } from "react";

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
      <Suspense fallback={<DashboardSkeleton
        ></DashboardSkeleton>
      }>

      <ProductCard filters={searchQuery} data={data}></ProductCard>
      </Suspense>
    </div>
  );
};

export default page;
