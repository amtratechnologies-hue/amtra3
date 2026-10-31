import Container from '../../components/common/Container';
import SectionHeading from '../../components/common/SectionHeading';
import { technologyGroups } from '../../constants/technologies';

export default function TechnologiesSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Our toolkit"
          title="Technologies we work with"
          description="We choose tools based on the problem in front of us. These are the platforms and frameworks we reach for most often."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologyGroups.map((group) => (
            <div
              key={group.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <h3 className="text-sm font-semibold text-navy-950">{group.name}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Tool choices follow the problem — not the other way around.
        </p>
      </Container>
    </section>
  );
}
