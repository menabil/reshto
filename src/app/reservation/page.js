import { Container } from "@/components/ui/Container";
import { ReservationExperience } from "@/components/reservation/ReservationExperience";
import { siteConfig } from "@/constants/site";

export const metadata = {
  title: { absolute: "Book a Table & Seating Zones | Biteon" },
  description:
    "Reserve your dining table at Biteon. Select outdoor patio, window corner, or VIP lounge with customized anniversary and birthday decoration notes.",
};

const guidelines = [
  {
    icon: "ri-time-line",
    title: "15-Minute Grace Period",
    desc: "Your table will be held for up to 15 minutes past your booking time before releasing to walk-ins.",
  },
  {
    icon: "ri-group-line",
    title: "Large Parties (8+)",
    desc: "For groups larger than 12 guests or private hall reservations, please contact us directly via phone.",
  },
  {
    icon: "ri-calendar-check-line",
    title: "Cancellation Policy",
    desc: "Please let us know at least 2 hours in advance if you need to reschedule or cancel your reservation.",
  },
  {
    icon: "ri-cake-3-line",
    title: "Special Occasions",
    desc: "Celebrating a birthday or anniversary? Let us know in advance and we'll arrange complimentary dessert surprises.",
  },
];

export default function ReservationPage() {
  return (
    <>
      <ReservationExperience />

      {/* Reservation Guidelines & FAQs */}
      <section className="section bg-[#f7f3eb] transition-colors duration-300 dark:bg-[#0f0e0d]">
        <Container>
          <div className="mb-12 text-center">
            <span className="section-pill dark:bg-brand-900/40 dark:text-brand-300">
              <i className="ri-information-line" /> Useful Information
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-ink dark:text-white md:text-4xl">
              Reservation Guidelines &amp; Policies
            </h2>
            <p className="mt-2 text-sm text-ink-700/70 dark:text-white/60">
              A few things to help make your visit smooth and pleasant.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guidelines.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-white/10 dark:bg-[#1e1c1a]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-xl text-brand dark:bg-brand/20 dark:text-brand-300">
                  <i className={item.icon} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-700/70 dark:text-white/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-linear-to-r from-[#1e1c1a] to-[#3a2813] p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-bold">Prefer to book over the phone?</h3>
              <p className="text-xs text-white/70 mt-1">Our hosting team is available daily from 8:00 AM to 11:00 PM.</p>
            </div>
            <a href={`tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`} className="btn-brand shrink-0">
              <i className="ri-phone-line" /> Call {siteConfig.contact.phone}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
