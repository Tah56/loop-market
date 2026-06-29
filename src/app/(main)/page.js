import HeroSection from "@/component/HeroSection";
import CategoriesSection from "@/component/HeroSection-2";
import MarketplaceStats from "@/component/marketPlaceStats";
import TopProductsSection from "@/component/Products";
import SuccessStories from "@/component/Success";
import SustainabilityImpact from "@/component/Sustainablity";
import TrustedSellers from "@/component/TrustedSeller";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <HeroSection></HeroSection>
    <CategoriesSection></CategoriesSection>
    <TopProductsSection></TopProductsSection>
    <SuccessStories></SuccessStories>
    <MarketplaceStats></MarketplaceStats>
    <SustainabilityImpact></SustainabilityImpact>
    <TrustedSellers></TrustedSellers>
    </>
  );
}
