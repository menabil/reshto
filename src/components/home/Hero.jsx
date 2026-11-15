import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { icon: "ri-emotion-happy-line", value: "1000+", label: "Happy Customers" },
  { icon: "ri-restaurant-line", value: "50+", label: "Signature Dishes" },
  { icon: "ri-award-line", value: "12", label: "Award Winning Chef" },
];

export const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-brand-50" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-soft-warning/70" />

      <Container className="relative z-10 grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
        <Reveal className="text-center lg:text-left">
          <span className="section-pill">
            <i className="ri-leaf-line" />
            Best Healthy Food
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] text-ink md:text-6xl">
            Enjoy <span className="text-brand">Delicious</span> Food in Your Healthy Life
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-700/70 lg:mx-0">
            This is a type of restaurant which typically serves food and drink, in addition to light
            refreshments such as baked goods.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href="#menu" className="btn-brand px-7! py-3.5! text-base!">
              Get Started <i className="ri-arrow-right-line" />
            </a>
            <a href="#book" className="btn-dark px-7! py-3.5! text-base!">
              Order Now
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 lg:justify-start">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand">
                  <i className={`${s.icon} text-xl`} />
                </span>
                <span className="text-left">
                  <span className="block font-display text-lg font-bold text-ink">{s.value}</span>
                  <span className="block text-xs text-ink-700/60">{s.label}</span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-square">
            <div className="absolute inset-0 animate-[spin_28s_linear_infinite] rounded-full border-2 border-dashed border-brand/30" />
            <div className="absolute inset-6 overflow-hidden rounded-full bg-linear-to-br from-brand-400 via-brand-500 to-brand-700 shadow-card">
              <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_25%_25%,#fff_0,transparent_45%),radial-gradient(circle_at_75%_75%,#fff_0,transparent_40%)]" />
              <div className="grid h-full w-full place-items-center">
                <i className="ri-restaurant-2-fill text-[6rem] text-white/90" />
              </div>
            </div>

            {/* floating chips */}
            <div className="absolute -left-2 top-10 animate-float rounded-2xl bg-white px-4 py-3 shadow-card">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-soft-success text-emerald-600">
                  <i className="ri-leaf-fill" />
                </span>
                <span className="text-xs font-semibold text-ink">
                  100% Fresh
                  <span className="block text-[10px] font-normal text-ink-700/60">Ingredients</span>
                </span>
              </div>
            </div>

            <div className="absolute -right-2 bottom-12 animate-float rounded-2xl bg-white px-4 py-3 shadow-card [animation-delay:1.2s]">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-soft-warning text-amber-600">
                  <i className="ri-star-fill" />
                </span>
                <span className="text-xs font-semibold text-ink">
                  4.9 Rating
                  <span className="block text-[10px] font-normal text-ink-700/60">2.5k reviews</span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default Hero;
