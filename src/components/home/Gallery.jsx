import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { foodImages } from "@/constants/images";

const moments = [
  {
    image: foodImages.restaurant,
    alt: "The warm, intimate dining room at Reshto",
    label: "Room for one more",
    className: "gallery-tile-featured",
  },
  {
    image: foodImages.chefs[0],
    alt: "A chef finishing a dish in the kitchen",
    label: "A little theatre",
    className: "",
  },
  {
    image: foodImages.steak,
    alt: "A beautifully plated chef's special",
    label: "Made with intention",
    className: "",
  },
  {
    image: foodImages.pasta,
    alt: "Fresh pasta prepared in the Reshto kitchen",
    label: "From our kitchen",
    className: "",
  },
  {
    image: foodImages.dessert,
    alt: "A delicate dessert to finish the evening",
    label: "Stay for something sweet",
    className: "",
  },
];

export const Gallery = () => (
  <section
    id="ambiance"
    className="section gallery-section bg-[#f7f3eb] transition-colors duration-300 dark:bg-[#0f0e0d]"
  >
    <Container>
      <Reveal className="gallery-heading">
        <div>
          <span className="story-kicker">
            <span aria-hidden="true" />
            A seat at Reshto
          </span>
          <h2>Come for dinner.<br />Stay for the feeling.</h2>
        </div>
        <p>
          Warm light, open-hearted hospitality, and something wonderful
          arriving at the table.
        </p>
      </Reveal>

      <div className="gallery-grid">
        {moments.map((moment, index) => (
          <Reveal
            key={moment.label}
            delay={index * 45}
            className={`gallery-tile ${moment.className}`}
          >
            <SafeImage src={moment.image} alt={moment.alt} />
            <span className="gallery-caption">{moment.label}</span>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/gallery"
          className="btn-outline dark:bg-[#1e1c1a] dark:text-white dark:border-white/15 dark:hover:border-brand"
        >
          View Full Photo Gallery <i className="ri-arrow-right-line" />
        </Link>
      </div>
    </Container>
  </section>
);

export default Gallery;
