import Container from '../../components/common/Container';
import SectionHeading from '../../components/common/SectionHeading';
import { whyChooseUs } from '../../constants/company';

export default function WhyChooseUsSection() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-24">
      <div className="absolute inset-0 bg-grid-dark opacity-40" aria-hidden="true" />
      <div
        className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading
          tone="dark"
          eyebrow="Why AMTRA"
          title="A partner that stays accountable to the outcome."
          description="Good software is more than a working demo. We care about how it is built, how it is maintained, and how confidently your team can own it."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {whyChooseUs.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-accent-400/40 hover:bg-white/[0.07]"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/10 text-accent-300 ring-1 ring-accent-400/20">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
