import { Hero } from "@/components/home/Hero";
import { PopularCategories } from "@/components/home/PopularCategories";
import { Discover } from "@/components/home/Discover";
import { WhyChoose } from "@/components/home/WhyChoose";
import { ExploreMenu } from "@/components/home/ExploreMenu";
import { VideoCta } from "@/components/home/VideoCta";
import { Testimonials } from "@/components/home/Testimonials";
import { Chefs } from "@/components/home/Chefs";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { BookTable } from "@/components/home/BookTable";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularCategories />
      <Discover />
      <WhyChoose />
      <ExploreMenu />
      <VideoCta />
      <Testimonials />
      <Chefs />
      <InstagramFeed />
      <BookTable />
    </>
  );
}
