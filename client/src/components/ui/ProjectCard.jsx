import { ArrowUpRight, FolderKanban } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function ProjectCard({ project, className }) {
  const {
    title,
    category,
    summary,
    image,
    imageAlt,
    technologies = [],
    href,
  } = project;

  const content = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
        {image ? (
          <img
            src={image}
            alt={imageAlt || title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-900 to-navy-700">
            <FolderKanban className="h-10 w-10 text-accent-300" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {category ? (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-700">
            {category}
          </p>
        ) : null}

        <div className="mt-2 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-navy-950">{title}</h3>
          {href ? (
            <ArrowUpRight
              className="mt-1 h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-accent-600"
              aria-hidden="true"
            />
          ) : null}
        </div>

        <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{summary}</p>

        {technologies.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {technology}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );

  const classes = cn(
    'group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-lg hover:shadow-navy-900/5',
    className,
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return <article className={classes}>{content}</article>;
}
