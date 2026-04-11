import React from "react";
import { useGoldRate } from "../context/GoldRateContext";

const GoldRateTicker: React.FC = () => {
  const { rates, loading, error } = useGoldRate();

  if (loading) {
    return (
      <div className="bg-stone-50 text-stone-400 py-2 text-center text-[10px] font-semibold tracking-[0.2em] uppercase border-b border-stone-100">
        Syncing market rates...
      </div>
    );
  }

  const hasRates =
    rates.rate18K > 0 ||
    rates.rate20K > 0 ||
    rates.rate22K > 0 ||
    rates.silver > 0;

  if (!hasRates) {
    return (
      <div className="bg-stone-50 text-stone-500 py-2 text-center text-[10px] font-semibold tracking-[0.15em] uppercase border-b border-stone-100">
        {error ? "Rates unavailable right now" : "Rates unavailable"}
      </div>
    );
  }

  const tickerItems = [
    { label: "GOLD 18K", value: rates.rate18K },
    { label: "GOLD 20K", value: rates.rate20K },
    { label: "GOLD 22K", value: rates.rate22K },
    { label: "SILVER", value: rates.silver },
  ];

  // Repeat items for seamless animation
  const repeatedItems = [
    ...tickerItems,
    ...tickerItems,
    ...tickerItems,
    ...tickerItems,
  ];

  return (
    <div className="bg-white text-stone-600 h-12 flex items-center overflow-hidden whitespace-nowrap border-b border-stone-200 relative z-[60] shadow-sm">
      <div className="inline-block animate-marquee">
        <div className="flex items-center gap-12 px-6">
          {repeatedItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-[11px] lg:text-[12px] font-bold tracking-[0.1em] text-[#5B0E23] uppercase opacity-90">
                {item.label}
              </span>
              <span className="text-[14px] lg:text-[16px] font-bold tracking-tight text-[#5B0E23]">
                Rs {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoldRateTicker;
