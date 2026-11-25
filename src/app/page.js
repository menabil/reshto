import { HomeLanding } from "@/components/home/HomeLanding";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Fresh Dining & Online Ordering",
  "Discover Reshto's fresh menu, reserve a table, and order your favorite meals for pickup or delivery.",
  "/",
);

export default function HomePage() {
  return <HomeLanding />;
}
