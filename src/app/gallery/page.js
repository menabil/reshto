import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Photo Gallery",
  "Browse photos of Reshto's dining room, signature dishes, and kitchen.",
  "/gallery",
);

export default function GalleryPage() {
  return <GalleryExperience />;
}
