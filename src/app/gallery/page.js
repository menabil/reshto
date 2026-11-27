import { GalleryExperience } from "@/components/gallery/GalleryExperience";

export const metadata = {
  title: { absolute: "Photo Gallery | Biteon" },
  description: "Browse photos of Biteon's dining room, signature dishes, and kitchen.",
};

export default function GalleryPage() {
  return <GalleryExperience />;
}
