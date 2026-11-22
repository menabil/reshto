import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Chefs } from "@/components/home/Chefs";
import { SafeImage } from "@/components/ui/SafeImage";
import { foodImages } from "@/constants/images";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata = {
  title: "About Us",
  description: "Learn more about Reshto, our team, history and our love for fresh culinary craft.",
};

export default function AboutPage() {
  return <AboutContent />;
}
