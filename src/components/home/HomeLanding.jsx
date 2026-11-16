import { Hero } from "@/components/home/Hero";
import { PopularCategories } from "@/components/home/PopularCategories";
import { Discover } from "@/components/home/Discover";
import { ExploreMenu } from "@/components/home/ExploreMenu";
import { VideoCta } from "@/components/home/VideoCta";
import { Chefs } from "@/components/home/Chefs";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramFeed } from "@/components/home/InstagramFeed";

export const HomeLanding = () => (
  <>
    <Hero />
    <PopularCategories />
    <Discover />
    <ExploreMenu />
    <VideoCta />
    <Chefs />
    <Testimonials />
    <InstagramFeed />
  </>
);

export default HomeLanding;
