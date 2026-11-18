import { Hero } from "@/components/home/Hero";
import { PopularCategories } from "@/components/home/PopularCategories";
import { Discover } from "@/components/home/Discover";
import { ExploreMenu } from "@/components/home/ExploreMenu";
import { VideoCta } from "@/components/home/VideoCta";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Chefs } from "@/components/home/Chefs";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { BookTable } from "@/components/home/BookTable";

export const HomeLanding = () => (
  <>
    <Hero />
    <PopularCategories />
    <Discover />
    <ExploreMenu />
    <VideoCta />
    <WhyChoose />
    <Chefs />
    <Testimonials />
    <BookTable />
    <InstagramFeed />
  </>
);

export default HomeLanding;
