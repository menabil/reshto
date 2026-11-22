import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ExploreMenu } from "@/components/home/ExploreMenu";
import { PopularCategories } from "@/components/home/PopularCategories";

export const metadata = {
  title: "Our Menu",
  description: "Explore the complete Reshto restaurant menu featuring breakfast, lunch, dinner, desserts, and artisan drinks.",
};

export default function MenuPage() {
  return (
    <>
      <section className="subpage-hero">
        <Container>
          <span className="hero-eyebrow">
            <i className="ri-restaurant-2-fill" /> Culinary Delights
          </span>
          <h1>
            Crafted with passion.<br />
            <span>Served with love.</span>
          </h1>
          <p>
            Explore our curated selection of seasonal dishes, farm-fresh ingredients, and handcrafted flavors.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/order" className="btn-brand">
              Order Online Now <i className="ri-arrow-right-line" />
            </Link>
            <Link href="/reservation" className="btn-dark">
              Book a Table
            </Link>
          </div>
        </Container>
      </section>

      <PopularCategories />

      <div className="py-6">
        <ExploreMenu />
      </div>

      <section className="bg-brand py-14 text-white text-center">
        <Container>
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">
            Have a special dietary request?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 md:text-base">
            We are happy to accommodate vegan, gluten-free, or specific allergen preferences.
            Let our servers know or give us a call before ordering.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-ink shadow-lg transition hover:bg-white/90">
              Contact Kitchen <i className="ri-chat-3-line" />
            </Link>
            <Link href="/order" className="rounded-2xl border border-white/30 bg-black/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-black/20">
              Browse Order Catalog <i className="ri-shopping-bag-3-line" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
