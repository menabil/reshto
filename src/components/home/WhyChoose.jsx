import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { whyChoose } from "@/data/data";

const tones = {
  primary: "bg-brand-50 text-brand-800 border-brand-100 dark:bg-white/5 dark:text-brand-200 dark:border-white/10",
  success: "bg-[#f0e8d9] text-[#76501d] border-[#e7dac4] dark:bg-white/5 dark:text-brand-200 dark:border-white/10",
  warning: "bg-soft-warning text-brand-700 border-brand-100 dark:bg-white/5 dark:text-brand-200 dark:border-white/10",
};

export const WhyChoose = () => {
  return (
    <section className="section bg-ink text-white transition-colors duration-300 dark:bg-[#0f0e0d]">
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
