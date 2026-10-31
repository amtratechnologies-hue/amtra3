import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function LoadingSpinner({
  label = 'Loading…',
  fullPage = false,
  className,
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-center justify-center gap-3 text-sm font-medium text-slate-600',
        fullPage ? 'min-h-[60vh]' : 'py-12',
        className,
      )}
    >
      <Loader2 className="h-5 w-5 animate-spin text-accent-600" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
