import HeroSection from "@/component/HeroSection";
import CategoriesSection from "@/component/HeroSection-2";
import TopProductsSection from "@/component/Products";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <HeroSection></HeroSection>
    <CategoriesSection></CategoriesSection>
    <TopProductsSection></TopProductsSection>
    </>
  );
}
