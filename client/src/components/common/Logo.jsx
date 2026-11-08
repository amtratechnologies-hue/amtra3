import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

function LogoMark({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn('h-10 w-10', className)}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="64" height="64" rx="16" fill="#101827" />
      <path
        d="M14 47 27.4 17h9.2L50 47h-9.1l-2.4-6.2H25.5L23.1 47H14Zm14.4-13.6h7.2L32 24.5l-3.6 8.9Z"
        fill="#3985D6"
      />
      <circle cx="50" cy="15" r="3" fill="#7957D5" />
    </svg>
  );
}

export default function Logo({ tone = 'dark', className, onClick }) {
  const isLight = tone === 'light';

  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn('group inline-flex items-center gap-3 rounded-lg', className)}
    >
      <LogoMark className="shrink-0 transition-transform duration-300 group-hover:scale-[1.03]" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-lg font-extrabold tracking-[0.14em]',
            isLight ? 'text-white' : 'text-navy-950',
          )}
        >
          AMTRA
        </span>
        <span
          className={cn(
            'mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em]',
            isLight ? 'text-slate-400' : 'text-slate-500',
          )}
        >
          Technologies
        </span>
      </span>
    </Link>
  );
}
