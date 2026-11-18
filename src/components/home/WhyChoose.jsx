import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { whyChoose } from "@/data/data";

const tones = {
  primary: "bg-soft-primary text-emerald-700 border-soft-primary dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/40",
  success: "bg-soft-success text-emerald-600 border-soft-success dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/40",
  warning: "bg-soft-warning text-amber-600 border-soft-warning dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800/40",
};

export const WhyChoose = () => {
  return (
    <section className="section bg-ink text-white transition-colors duration-300 dark:bg-[#08100c]">
      <Container>
        <Reveal className="mb-14">
          <SectionTitle eyebrow="Our Promise" title="Why Choose Reshto?" light />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {whyChoose.map((item, index) => (
            <Reveal key={item.id} delay={index * 80}>
              <article className="h-full rounded-3xl bg-white/[0.04] p-8 text-center ring-1 ring-white/10 transition duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07] dark:bg-white/[0.03] dark:ring-white/10">
                <span
                  className={`mx-auto grid h-16 w-16 place-items-center rounded-3xl border text-3xl ${tones[item.tone]}`}
                >
                  <i className={item.icon} />
                </span>
                <h5 className="mt-5 font-display text-xl font-bold">{item.title}</h5>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChoose;
