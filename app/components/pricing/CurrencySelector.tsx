'use client';

import { Currency } from '@/lib/pricing';
import { cn } from '@/lib/utils';

interface CurrencySelectorProps {
  selected: Currency;
  onChange: (currency: Currency) => void;
}

export default function CurrencySelector({ selected, onChange }: CurrencySelectorProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <div className="bg-white p-1 rounded-xl shadow-sm border border-maru-line flex">
        <button
          onClick={() => onChange('ZAR')}
          className={cn(
            "px-6 py-2 rounded-lg text-sm font-bold transition-all duration-200",
            selected === 'ZAR' 
              ? "bg-maru-navy text-white shadow-md" 
              : "text-maru-grey hover:text-maru-grey hover:bg-maru-cloud"
          )}
        >
          ZA Market (ZAR)
        </button>
        <button
          onClick={() => onChange('USD')}
          className={cn(
            "px-6 py-2 rounded-lg text-sm font-bold transition-all duration-200",
            selected === 'USD' 
              ? "bg-maru-navy text-white shadow-md" 
              : "text-maru-grey hover:text-maru-grey hover:bg-maru-cloud"
          )}
        >
          Other Markets (USD)
        </button>
      </div>
    </div>
  );
}
