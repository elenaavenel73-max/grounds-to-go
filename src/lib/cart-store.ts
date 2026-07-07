import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  lineId: string;
  itemId: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  sizeId?: string;
  sizeLabel?: string;
  milkId?: string;
  milkLabel?: string;
  extras: { id: string; label: string; priceDelta: number }[];
  notes?: string;
};

type CartState = {
  lines: CartLine[];
  addLine: (line: Omit<CartLine, "lineId">) => void;
  updateQty: (lineId: string, qty: number) => void;
  removeLine: (lineId: string) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
};

export const TAX_RATE = 0.13; // Ontario HST
export const DELIVERY_FEE = 4.99;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addLine: (line) =>
        set((s) => ({
          lines: [...s.lines, { ...line, lineId: crypto.randomUUID() }],
        })),
      updateQty: (lineId, qty) =>
        set((s) => ({
          lines: s.lines
            .map((l) => (l.lineId === lineId ? { ...l, quantity: Math.max(0, qty) } : l))
            .filter((l) => l.quantity > 0),
        })),
      removeLine: (lineId) =>
        set((s) => ({ lines: s.lines.filter((l) => l.lineId !== lineId) })),
      clear: () => set({ lines: [] }),
      subtotal: () => get().lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0),
      count: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
    }),
    { name: "grove-cart-v1" },
  ),
);

export function formatMoney(n: number) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n);
}
