"use client";

import { createContext, useContext, useState, useCallback } from "react";

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

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);

  const addToQuote = useCallback((item: QuoteItem) => {
    setItems((prev) =>
      prev.some((i) => i.productId === item.productId) ? prev : [...prev, item]
    );
  }, []);

  const removeFromQuote = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
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
