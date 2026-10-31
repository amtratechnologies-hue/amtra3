import { UserRound } from 'lucide-react';
import { cn } from '../../utils/cn';

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .filter((character) => /[A-Za-z0-9]/.test(character))
    .join('')
    .toUpperCase();
}

export default function TeamCard({ member, className }) {
  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-lg hover:shadow-navy-900/5',
        className,
      )}
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-navy-900 to-navy-700 ring-4 ring-navy-50">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-xl font-bold tracking-wide text-accent-300">
            {getInitials(member.name)}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-lg font-semibold text-navy-950">{member.name}</h3>
      <p className="mt-1 text-sm font-medium text-accent-700">{member.role}</p>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
        {member.description}
      </p>

      <p className="mt-5 inline-flex items-center justify-center gap-1.5 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
        <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
        Profile coming soon
      </p>
    </article>
  );
}
