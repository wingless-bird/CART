import Hero from "../components/store/Hero";
import CategoryBoxes from "../components/CategoryBoxes";
import FeaturedProducts from "../components/FeaturedProducts";

export default function StoreHome() {
  return (
    <>
      <Hero />

      <CategoryBoxes />

      <FeaturedProducts />
    </>
  );
}