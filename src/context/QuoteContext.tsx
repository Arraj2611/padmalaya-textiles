"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { capture } from "@/lib/analytics";

export interface QuoteItem {
  productId: string;
  productName: string;
  slug: string;
}

interface QuoteContextValue {
  items: QuoteItem[];
  addToQuote: (item: QuoteItem) => void;
  removeFromQuote: (productId: string) => void;
  clearQuote: () => void;
  isInQuote: (productId: string) => boolean;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

const STORAGE_KEY = "padmalaya_quote";

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as QuoteItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToQuote = useCallback((item: QuoteItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.productId === item.productId)) return prev;
      capture("product_added_to_quote", { product_name: item.productName, slug: item.slug });
      return [...prev, item];
    });
  }, []);

  const removeFromQuote = useCallback((productId: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.productId === productId);
      if (item) capture("product_removed_from_quote", { product_name: item.productName, slug: item.slug });
      return prev.filter((i) => i.productId !== productId);
    });
  }, []);

  const clearQuote = useCallback(() => setItems([]), []);

  const isInQuote = useCallback(
    (productId: string) => items.some((i) => i.productId === productId),
    [items]
  );

  return (
    <QuoteContext.Provider value={{ items, addToQuote, removeFromQuote, clearQuote, isInQuote }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used inside <QuoteProvider>");
  return ctx;
}
