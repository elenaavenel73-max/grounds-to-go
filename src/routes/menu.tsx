import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { menu, categories, type MenuItem } from "@/lib/menu-data";
import { formatMoney } from "@/lib/cart-store";
import { MenuItemDialog } from "@/components/menu-item-dialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/menu")({
  component: MenuPage,
  head: () => ({
    meta: [
      { title: "Menu — The Grove Café" },
      {
        name: "description",
        content:
          "Order espresso, matcha, cold brew, fresh scones, cookies, croissants, and more from The Grove Café in Kitchener.",
      },
      { property: "og:title", content: "Menu — The Grove Café" },
      { property: "og:description", content: "Hand-crafted drinks and baked goods, made fresh daily." },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
});

function MenuPage() {
  const [active, setActive] = useState<string>("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<MenuItem | null>(null);

  // Open dialog from hash e.g. /menu#matcha
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const item = menu.find((m) => m.id === hash);
      if (item) setSelected(item);
    }
  }, []);

  const filtered = useMemo(() => {
    return menu.filter((m) => {
      const catOk = active === "all" || m.category === active;
      const qOk = !q || (m.name + " " + m.description).toLowerCase().includes(q.toLowerCase());
      return catOk && qOk;
    });
  }, [active, q]);

  const grouped = useMemo(() => {
    return categories
      .map((c) => ({ ...c, items: filtered.filter((m) => m.category === c.id) }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  return (
    <>
      {/* Header */}
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="container-page py-14 md:py-20">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Menu</p>
          <h1 className="mt-2 font-display text-5xl md:text-6xl">Everything, made fresh.</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Tap any item to customize it and add it to your cart. Available for pickup or
            delivery.
          </p>

          <div className="relative mt-8 max-w-lg">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search the menu…"
              aria-label="Search the menu"
              className="h-12 rounded-full pl-10"
            />
          </div>

          {/* Sticky category chips */}
          <div className="mt-8 -mx-5 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0">
            <div className="flex gap-2">
              <CategoryChip
                active={active === "all"}
                onClick={() => setActive("all")}
                label="All"
              />
              {categories.map((c) => (
                <CategoryChip
                  key={c.id}
                  active={active === c.id}
                  onClick={() => setActive(c.id)}
                  label={c.label}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Items */}
      <section className="container-page py-14 md:py-20">
        {filtered.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">
            No items match &ldquo;{q}&rdquo;.
          </p>
        )}
        <div className="space-y-16">
          {grouped.map((g) => (
            <div key={g.id}>
              <h2 className="font-display text-3xl md:text-4xl">{g.label}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((item) => (
                  <button
                    key={item.id}
                    id={item.id}
                    onClick={() => setSelected(item)}
                    className="group flex overflow-hidden rounded-2xl border border-border/60 bg-card text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="flex-1 p-5">
                      <div className="flex flex-wrap gap-1">
                        {item.tags?.map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="rounded-full text-[10px] uppercase tracking-wider"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="mt-2 font-display text-xl">{item.name}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {formatMoney(item.basePrice)}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition group-hover:bg-primary/90">
                          <Plus className="size-3" /> Add
                        </span>
                      </div>
                    </div>
                    <div className="relative w-28 shrink-0 sm:w-32">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <MenuItemDialog
        item={selected}
        open={!!selected}
        onOpenChange={(v) => !v && setSelected(null)}
      />
    </>
  );
}

function CategoryChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <Button
      onClick={onClick}
      variant={active ? "default" : "outline"}
      className={cn(
        "shrink-0 rounded-full",
        !active && "bg-background hover:bg-muted",
      )}
      size="sm"
    >
      {label}
    </Button>
  );
}
