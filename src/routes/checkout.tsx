import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Store, Bike, CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart, formatMoney, TAX_RATE, DELIVERY_FEE } from "@/lib/cart-store";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({
    meta: [
      { title: "Checkout — The Grove Café" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const schema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(20),
  address: z.string().trim().max(200).optional(),
});

function nextPickupSlots(count = 8) {
  const now = new Date();
  const start = new Date(now.getTime() + 15 * 60 * 1000);
  // Round up to next 15 min
  start.setMinutes(Math.ceil(start.getMinutes() / 15) * 15, 0, 0);
  const slots: { value: string; label: string }[] = [];
  for (let i = 0; i < count; i++) {
    const t = new Date(start.getTime() + i * 15 * 60 * 1000);
    const label = t.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    slots.push({ value: t.toISOString(), label });
  }
  return slots;
}

function Checkout() {
  const navigate = useNavigate();
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const subtotal = useCart((s) => s.subtotal());

  const [method, setMethod] = useState<"pickup" | "delivery">("pickup");
  const slots = useMemo(() => nextPickupSlots(10), []);
  const [time, setTime] = useState(slots[0]?.value ?? "");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [notes, setNotes] = useState("");
  const [placing, setPlacing] = useState(false);

  const fee = method === "delivery" ? DELIVERY_FEE : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + fee;

  if (lines.length === 0) {
    return (
      <section className="container-page py-24 text-center">
        <h1 className="font-display text-3xl">Nothing to check out.</h1>
        <Link to="/menu" className="mt-4 inline-block">
          <Button className="rounded-full">Browse the menu</Button>
        </Link>
      </section>
    );
  }

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error("Please fill in your contact details.");
      return;
    }
    if (method === "delivery" && !form.address?.trim()) {
      toast.error("Please add a delivery address.");
      return;
    }
    setPlacing(true);
    // Simulated payment — structured so Stripe can drop in later.
    setTimeout(() => {
      const orderNumber = "GR-" + Math.random().toString(36).slice(2, 7).toUpperCase();
      const pickupLabel =
        slots.find((s) => s.value === time)?.label ?? "shortly";
      clear();
      navigate({
        to: "/order-confirmed",
        search: {
          n: orderNumber,
          m: method,
          t: pickupLabel,
          total: total.toFixed(2),
          name: form.name,
        },
      });
    }, 900);
  };

  return (
    <section className="container-page py-14 md:py-20">
      <h1 className="font-display text-5xl">Checkout</h1>

      <form onSubmit={placeOrder} className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          {/* Method */}
          <fieldset>
            <legend className="font-display text-2xl">How would you like it?</legend>
            <RadioGroup
              value={method}
              onValueChange={(v) => setMethod(v as "pickup" | "delivery")}
              className="mt-4 grid gap-3 sm:grid-cols-2"
            >
              <MethodCard value="pickup" icon={Store} title="Pickup" desc="Free · Ready in ~15 min" />
              <MethodCard
                value="delivery"
                icon={Bike}
                title="Delivery"
                desc={`${formatMoney(DELIVERY_FEE)} · ~30–45 min`}
              />
            </RadioGroup>
          </fieldset>

          {/* Time */}
          <fieldset>
            <legend className="font-display text-2xl">
              {method === "pickup" ? "Pickup time" : "Delivery time"}
            </legend>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="mt-4 h-12 rounded-xl">
                <SelectValue placeholder="Choose a time" />
              </SelectTrigger>
              <SelectContent>
                {slots.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </fieldset>

          {/* Contact */}
          <fieldset>
            <legend className="font-display text-2xl">Your details</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="mt-1.5"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="mt-1.5"
                />
              </div>
              {method === "delivery" && (
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Delivery address</Label>
                  <Input
                    id="address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Street, unit, city, postal code"
                    required
                    className="mt-1.5"
                  />
                </div>
              )}
              <div className="sm:col-span-2">
                <Label htmlFor="notes">Order notes (optional)</Label>
                <Textarea
                  id="notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>
          </fieldset>

          {/* Payment (simulated) */}
          <fieldset>
            <legend className="font-display text-2xl">Payment</legend>
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-dashed border-border bg-muted/40 p-4 text-sm">
              <CreditCard className="mt-0.5 size-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Payment simulated for this demo</p>
                <p className="text-muted-foreground">
                  This checkout is wired up so Stripe (or any provider) can be added
                  later. No card details are collected.
                </p>
              </div>
            </div>
          </fieldset>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-3xl border border-border/60 bg-card p-6 shadow-soft lg:sticky lg:top-24">
          <h2 className="font-display text-xl">Summary</h2>
          <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto text-sm">
            {lines.map((l) => (
              <li key={l.lineId} className="flex gap-3">
                <img src={l.image} alt="" className="size-12 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {l.quantity} × {l.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {[l.sizeLabel, l.milkLabel].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <span className="text-sm">
                  {formatMoney(l.unitPrice * l.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border/60 pt-4 text-sm">
            <Row label="Subtotal" value={formatMoney(subtotal)} />
            <Row label="HST (13%)" value={formatMoney(tax)} />
            {method === "delivery" && <Row label="Delivery fee" value={formatMoney(fee)} />}
            <div className="mt-2 flex justify-between border-t border-border/60 pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatMoney(total)}</dd>
            </div>
          </dl>
          <Button
            type="submit"
            size="lg"
            className="mt-6 w-full rounded-full"
            disabled={placing}
          >
            <Lock className="mr-1 size-4" />
            {placing ? "Placing order…" : `Place order · ${formatMoney(total)}`}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            By placing this order you agree to our friendly terms.
          </p>
        </aside>
      </form>
    </section>
  );
}

function MethodCard({
  value,
  icon: Icon,
  title,
  desc,
}: {
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-border p-4 hover:bg-muted has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
      <RadioGroupItem value={value} id={`m-${value}`} />
      <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <span>
        <span className="block font-medium">{title}</span>
        <span className="block text-xs text-muted-foreground">{desc}</span>
      </span>
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
