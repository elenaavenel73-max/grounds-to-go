import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MapPin, Clock } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const search = z.object({
  n: z.string().default(""),
  m: z.enum(["pickup", "delivery"]).default("pickup"),
  t: z.string().default(""),
  total: z.string().default("0"),
  name: z.string().default(""),
});

export const Route = createFileRoute("/order-confirmed")({
  validateSearch: (s) => search.parse(s),
  component: Confirmed,
  head: () => ({
    meta: [
      { title: "Order Confirmed — The Grove Café" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function Confirmed() {
  const { n, m, t, total, name } = Route.useSearch();
  return (
    <section className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-lg text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-8" />
        </span>
        <h1 className="mt-6 font-display text-4xl md:text-5xl">
          Thanks{name ? `, ${name.split(" ")[0]}` : ""}!
        </h1>
        <p className="mt-3 text-muted-foreground">
          Your order is confirmed. We're brewing it up now.
        </p>

        <div className="mt-8 rounded-3xl border border-border/60 bg-card p-6 text-left shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Order
            </span>
            <span className="font-mono text-sm">{n}</span>
          </div>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Clock className="size-4 text-muted-foreground" />
              <span>
                {m === "pickup" ? "Ready for pickup at" : "Delivery around"}{" "}
                <strong>{t}</strong>
              </span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-muted-foreground" />
              <span>
                {m === "pickup"
                  ? "The Grove Café · 295 Lancaster St W, Kitchener"
                  : "Delivered to your address"}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-border/60 pt-3">
              <span className="text-muted-foreground">Total charged</span>
              <span className="font-semibold">${total}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/menu">
            <Button className="rounded-full">Order something else</Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="rounded-full">
              Back home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
