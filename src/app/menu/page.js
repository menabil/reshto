import { ExploreMenu } from "@/components/home/ExploreMenu";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Our Menu",
  "Explore Reshto's dishes, ingredients, and signature favorites.",
  "/menu",
);

export default function MenuPage() {
  return <ExploreMenu />;
}
