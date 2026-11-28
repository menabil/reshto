import { Hero } from "@/components/home/Hero";
import { PopularCategories } from "@/components/home/PopularCategories";
import { Discover } from "@/components/home/Discover";
import { WhyChoose } from "@/components/home/WhyChoose";
import { VideoCta } from "@/components/home/VideoCta";
import { Gallery } from "@/components/home/Gallery";
import { Chefs } from "@/components/home/Chefs";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramFeed } from "@/components/home/InstagramFeed";

export const HomeLanding = () => (
  <>
    <Hero />
    <Discover />
    <PopularCategories />
    <Gallery />
    <VideoCta />
    <WhyChoose />
    <Chefs />
    <Testimonials />
    <InstagramFeed />
  </>
);

export default HomeLanding;
