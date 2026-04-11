import React, { createContext, useContext, useState, useEffect } from "react";

type Rates = {
  rate18K: number;
  rate20K: number;
  rate22K: number;
  silver: number;
};

type GoldRateContextValue = {
  rates: Rates;
  loading: boolean;
  error: string | null;
  refreshRates: () => Promise<void>;
};

const RATES_CACHE_KEY = "live-metal-rates";
const OUNCE_TO_GRAMS = 31.1034768;
const GOLD_API_KEY = import.meta.env.VITE_GOLD_API_KEY || "";

const defaultRates: Rates = {
  rate18K: 0,
  rate20K: 0,
  rate22K: 0,
  silver: 0,
};

const readCachedRates = (): Rates => {
  try {
    const cached = localStorage.getItem(RATES_CACHE_KEY);
    if (!cached) return defaultRates;
    const parsed = JSON.parse(cached) as Rates;
    if (
      typeof parsed.rate18K === "number" &&
      typeof parsed.rate20K === "number" &&
      typeof parsed.rate22K === "number" &&
      typeof parsed.silver === "number"
    ) {
      return parsed;
    }
  } catch {
    // Ignore invalid cache and fallback to defaults.
  }

  return defaultRates;
};

const GoldRateContext = createContext<GoldRateContextValue | undefined>(
  undefined,
);

export const GoldRateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rates, setRates] = useState<Rates>(readCachedRates);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const roundRate = (value: number) => Math.round(value);

  const fetchRates = async () => {
    try {
      if (!GOLD_API_KEY) {
        throw new Error("Missing VITE_GOLD_API_KEY in .env");
      }

      setError(null);

      const headers = new Headers();
      headers.append("x-access-token", GOLD_API_KEY);
      headers.append("Content-Type", "application/json");

      const requestOptions: RequestInit = {
        method: "GET",
        headers,
        redirect: "follow",
      };

      const [goldResponse, silverResponse] = await Promise.all([
        fetch("https://www.goldapi.io/api/XAU/INR", requestOptions),
        fetch("https://www.goldapi.io/api/XAG/INR", requestOptions),
      ]);

      if (!goldResponse.ok || !silverResponse.ok) {
        throw new Error(
          `GoldAPI request failed (${goldResponse.status}/${silverResponse.status})`,
        );
      }

      const goldData = await goldResponse.json();
      const silverData = await silverResponse.json();

      const goldPricePerOunce = Number(goldData?.price ?? 0);
      const silverPricePerOunce = Number(silverData?.price ?? 0);

      if (!goldPricePerOunce || !silverPricePerOunce) {
        throw new Error("Invalid GoldAPI response data");
      }

      const rate24K = goldPricePerOunce / OUNCE_TO_GRAMS;

      const nextRates: Rates = {
        rate22K: roundRate((rate24K * 22) / 24),
        rate20K: roundRate((rate24K * 20) / 24),
        rate18K: roundRate((rate24K * 18) / 24),
        silver: roundRate(silverPricePerOunce / OUNCE_TO_GRAMS),
      };

      setRates(nextRates);
      localStorage.setItem(RATES_CACHE_KEY, JSON.stringify(nextRates));
    } catch (error) {
      console.error("Failed to fetch live rates:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load rates right now.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();

    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GoldRateContext.Provider
      value={{ rates, loading, error, refreshRates: fetchRates }}
    >
      {children}
    </GoldRateContext.Provider>
  );
};

export const useGoldRate = () => {
  const context = useContext(GoldRateContext);

  if (!context) {
    throw new Error("useGoldRate must be used within GoldRateProvider");
  }

  return context;
};
