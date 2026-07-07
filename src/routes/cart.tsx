import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, formatMoney, TAX_RATE } from "@/lib/cart-store";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Your Cart — The Grove Café" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function CartPage() {
  const lines = useCart((s) => s.lines);
  const updateQty = useCart((s) => s.updateQty);
  const removeLine = useCart((s) => s.removeLine);
  const subtotal = useCart((s) => s.subtotal());
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  if (lines.length === 0) {
    return (
      <section className="container-page py-24 text-center">
        <ShoppingBag className="mx-auto size-10 text-muted-foreground" />
        <h1 className="mt-4 font-display text-4xl">Your cart is empty.</h1>
        <p className="mt-2 text-muted-foreground">
          Add a warm drink or a fresh pastry to get started.
        </p>
        <Link to="/menu" className="mt-6 inline-block">
          <Button size="lg" className="rounded-full">
            Browse the menu
          </Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="container-page py-14 md:py-20">
      <h1 className="font-display text-5xl">Your cart</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-border/60">
          {lines.map((l) => (
            <li key={l.lineId} className="flex gap-4 py-5">
              <img
                src={l.image}
                alt=""
                loading="lazy"
                className="size-24 shrink-0 rounded-2xl object-cover"
              />
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg leading-tight">{l.name}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {[l.sizeLabel, l.milkLabel, ...l.extras.map((e) => e.label)]
                        .filter(Boolean)
                        .join(" · ") || "As it comes"}
                    </p>
                    {l.notes && (
                      <p className="mt-1 text-xs italic text-muted-foreground">
                        “{l.notes}”
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    {formatMoney(l.unitPrice * l.quantity)}
                  </span>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-full border border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => updateQty(l.lineId, l.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-4" />
                    </Button>
                    <span className="w-6 text-center text-sm">{l.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => updateQty(l.lineId, l.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                  <button
                    onClick={() => removeLine(l.lineId)}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                    aria-label={`Remove ${l.name}`}
                  >
                    <Trash2 className="size-3.5" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-3xl border border-border/60 bg-card p-6 shadow-soft lg:sticky lg:top-24">
          <h2 className="font-display text-xl">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatMoney(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">HST (13%)</dt>
              <dd>{formatMoney(tax)}</dd>
            </div>
            <div className="mt-3 flex justify-between border-t border-border/60 pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatMoney(total)}</dd>
            </div>
          </dl>
          <Link to="/checkout" className="mt-6 block">
            <Button size="lg" className="w-full rounded-full">
              Checkout <ArrowRight className="ml-1 size-4" />
            </Button>
          </Link>
          <Link
            to="/menu"
            className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground"
          >
            Add more items
          </Link>
        </aside>
      </div>
    </section>
  );
}
