import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function FaqAccordion({ items, className }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `faq-button-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white"
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-navy-950 transition-colors hover:bg-slate-50 sm:text-base"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300',
                    isOpen && 'rotate-180 text-accent-600',
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="border-t border-slate-100 px-5 py-4"
            >
              <p className="text-sm leading-7 text-slate-600">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
