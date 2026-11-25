import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Chefs } from "@/components/home/Chefs";
import { SafeImage } from "@/components/ui/SafeImage";
import { foodImages } from "@/constants/images";
import { AboutContent } from "@/components/about/AboutContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "About Us",
  "Learn more about Reshto, our team, history and our love for fresh culinary craft.",
  "/about",
);

export default function AboutPage() {
  return <AboutContent />;
}
