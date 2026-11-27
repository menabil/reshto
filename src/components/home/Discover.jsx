import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { foodImages } from "@/constants/images";

export const Discover = () => (
  <section
    id="about"
    className="story-intro section bg-[#f7f3eb] transition-colors duration-300 dark:bg-[#0f0e0d]"
  >
    <Container className="grid items-center gap-12 lg:grid-cols-[.94fr_1.06fr] lg:gap-20">
      <Reveal className="story-portrait">
        <SafeImage
          src={foodImages.chefs[1]}
          alt="A Biteon chef preparing a dish with care"
        />
        <div className="story-portrait-note">
          <span className="story-portrait-mark">R</span>
          <span>
            <strong>Rooted in good company</strong>
            <small>Thoughtful dining, every day</small>
          </span>
        </div>
      </Reveal>

      <Reveal delay={100} className="story-intro-copy">
        <span className="story-kicker">
          <span aria-hidden="true" />
          Our story
        </span>
        <h2>
          Honest ingredients.
          <br />
          <em>Unforgettable evenings.</em>
        </h2>
        <p>
          Biteon began with a simple idea: bring people closer around food made
          with care. We work with the seasons, honor every ingredient, and make
          room at the table for the moments that matter.
        </p>
        <p>
          Come as you are. We&apos;ll take care of the rest, one thoughtful
          course at a time.
        </p>
        <div className="story-signature">
          <span className="story-signature-rule" aria-hidden="true" />
          <span>
            <strong>Good food, shared slowly.</strong>
            <small>The Biteon kitchen</small>
          </span>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/about" className="story-text-link">
            Read our full story <i className="ri-arrow-right-line" aria-hidden="true" />
          </Link>
          <Link href="/reservation" className="story-text-link">
            Find your seat <i className="ri-calendar-line" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </Container>
  </section>
);

export default Discover;
