"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/ui/SafeImage";
import { foodImages, menuImages } from "@/constants/images";

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Candlelit Dining Ambiance",
    category: "ambiance",
    categoryLabel: "Interior & Ambiance",
    image: foodImages.restaurant,
    desc: "Warm wooden accents, intimate lighting, and spacious seating designed for memorable evenings.",
  },
  {
    id: 2,
    title: "Wood-Fired Margherita",
    category: "dishes",
    categoryLabel: "Signature Dishes",
    image: foodImages.pizza,
    desc: "Neapolitan-style blistered crust with San Marzano tomatoes, fresh buffalo mozzarella, and basil.",
  },
  {
    id: 3,
    title: "Prime Dry-Aged Ribeye",
    category: "dishes",
    categoryLabel: "Signature Dishes",
    image: foodImages.steak,
    desc: "Seared over open flames and basted with garlic rosemary compound butter.",
  },
  {
    id: 4,
    title: "Artisan Dark Chocolate Truffle Cake",
    category: "desserts",
    categoryLabel: "Desserts & Drinks",
    image: foodImages.dessert,
    desc: "Decadent 70% dark Belgian cocoa ganache paired with Madagascar vanilla bean puree.",
  },
  {
    id: 5,
    title: "Master Chef Herman in Action",
    category: "kitchen",
    categoryLabel: "Kitchen Craft",
    image: foodImages.chefs[0],
    desc: "Precision plating and relentless perfection on every single service night.",
  },
  {
    id: 6,
    title: "Fresh Hand-Rolled Fettuccine",
    category: "dishes",
    categoryLabel: "Signature Dishes",
    image: foodImages.pasta,
    desc: "Made fresh in-house every morning using organic semolina and pasture-raised eggs.",
  },
  {
    id: 7,
    title: "Signature Mint Basil Mojito",
    category: "desserts",
    categoryLabel: "Desserts & Drinks",
    image: menuImages.drink[3], // Lemonade/drink
    desc: "Refreshing cold-pressed citrus, muddled orchard herbs, and sparkling botanical tonic.",
  },
  {
    id: 8,
    title: "Pastry Artist Olivia Finishing Tarts",
    category: "kitchen",
    categoryLabel: "Kitchen Craft",
    image: foodImages.chefs[1],
    desc: "Delicate handcrafted desserts prepared with local seasonal berries and edible flowers.",
  },
  {
    id: 9,
    title: "Crispy Garlic Butter Shrimp Scampi",
    category: "dishes",
    categoryLabel: "Signature Dishes",
    image: foodImages.shrimp,
    desc: "Wild-caught jumbo shrimp sautéed with white wine, cold-pressed olive oil, and lemon zest.",
  },
];

const CATEGORIES = [
  { key: "all", label: "All Photos" },
  { key: "dishes", label: "Signature Dishes" },
  { key: "ambiance", label: "Dining & Ambiance" },
  { key: "desserts", label: "Desserts & Cocktails" },
  { key: "kitchen", label: "Behind The Scenes" },
];

export const GalleryExperience = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filtered = activeTab === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  return (
    <>
      <section className="subpage-hero">
        <Container>
          <span className="hero-eyebrow">
            <i className="ri-image-line" /> Visual Journey
          </span>
          <h1>
            A glimpse into the<br />
            <span>Reshto experience.</span>
          </h1>
          <p>
            Immerse yourself in our warm ambiance, exquisite culinary creations, and the vibrant passion
            of our kitchen.
          </p>
        </Container>
      </section>

      <section className="section bg-[#f7f3eb] transition-colors duration-300 dark:bg-[#0f0e0d]">
        <Container>
          {/* Category Filter Tabs */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full px-5 py-2.5 text-xs font-bold transition ${
                  activeTab === tab.key
                    ? "bg-brand text-white shadow-md dark:bg-brand dark:text-[#171512]"
                    : "border border-ink/10 bg-white text-ink-700/80 hover:bg-brand/10 hover:text-brand dark:border-white/10 dark:bg-[#1e1c1a] dark:text-white/70 dark:hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#1e1c1a]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute bottom-4 left-4 right-4 text-xs font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-between">
                    <span>Click to view photo</span>
                    <i className="ri-zoom-in-line text-lg" />
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand dark:text-brand-300">
                    {item.categoryLabel}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-bold text-ink dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-700/70 dark:text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedPhoto ? (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
              onClick={() => setSelectedPhoto(null)}
            >
              <div
                className="relative max-w-3xl overflow-hidden rounded-4xl bg-white shadow-2xl dark:bg-[#1e1c1a]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white transition hover:bg-black"
                >
                  <i className="ri-close-line text-xl" />
                </button>
                <div className="relative max-h-[60vh] overflow-hidden">
                  <SafeImage
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    className="w-full object-cover"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-300">
                    {selectedPhoto.categoryLabel}
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-bold text-ink dark:text-white">
                    {selectedPhoto.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700/70 dark:text-white/70">
                    {selectedPhoto.desc}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/menu" className="btn-brand py-2.5! text-xs!">
                      Explore Menu <i className="ri-arrow-right-line" />
                    </Link>
                    <Link href="/reservation" className="btn-dark py-2.5! text-xs!">
                      Book a Table
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <h3 className="font-display text-2xl font-bold text-ink dark:text-white">
              Ready to experience Reshto in person?
            </h3>
            <p className="mt-2 text-xs text-ink-700/70 dark:text-white/60">
              We look forward to welcoming you and crafting a dinner to remember.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/reservation" className="btn-brand">
                Reserve Your Table <i className="ri-calendar-line" />
              </Link>
              <Link href="/order" className="btn-dark">
                Order Delivery <i className="ri-truck-line" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
