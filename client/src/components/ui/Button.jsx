import { cn } from '../../utils/cn';

const variants = {
  primary:
    'bg-navy-900 text-white hover:bg-navy-800 focus-visible:outline-navy-900',
  accent:
    'bg-accent-500 text-navy-950 hover:bg-accent-400 focus-visible:outline-accent-600',
  secondary:
    'bg-white text-navy-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus-visible:outline-navy-900',
  ghost:
    'text-navy-900 hover:bg-navy-50 focus-visible:outline-navy-900',
  outlineLight:
    'border border-white/25 text-white hover:bg-white/10 focus-visible:outline-white',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...props
}) {
  const componentProps = Component === 'button' ? { type } : {};

  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60',
        variants[variant],
        sizes[size],
        className,
      )}
      {...componentProps}
      {...props}
    >
      {children}
    </Component>
  );
}
