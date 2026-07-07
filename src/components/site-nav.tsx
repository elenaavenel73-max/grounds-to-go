import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, Search, Sun, Moon, Coffee, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-store";
import { menu } from "@/lib/menu-data";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("grove-theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const d = stored ? stored === "dark" : prefers;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
  }, []);
  const toggle = () => {
    setDark((d) => {
      const nd = !d;
      document.documentElement.classList.toggle("dark", nd);
      localStorage.setItem("grove-theme", nd ? "dark" : "light");
      return nd;
    });
  };
  return { dark, toggle };
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const { dark, toggle } = useDarkMode();
  const count = useCart((s) => s.count());
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const results = q.trim()
    ? menu.filter((m) =>
        (m.name + " " + m.description).toLowerCase().includes(q.toLowerCase()),
      )
    : [];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-xl shadow-soft"
          : "bg-background/0",
      )}
    >
      <div className="container-page flex h-16 items-center gap-3 md:h-20">
        <Link to="/" className="flex items-center gap-2 font-display text-xl tracking-tight">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Coffee className="size-4" />
          </span>
          <span>The Grove</span>
        </Link>

        <nav className="ml-8 hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                path === n.to && "text-foreground font-medium",
              )}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search menu"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Toggle dark mode" onClick={toggle}>
            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>
          <Link to="/cart" aria-label={`Cart, ${count} items`} className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="size-5" />
            </Button>
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                {count}
              </span>
            )}
          </Link>
          <Link to="/menu" className="ml-1 hidden md:inline-flex">
            <Button variant="default" className="rounded-full">
              Order now
            </Button>
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm p-6">
              <SheetTitle className="font-display text-2xl">Menu</SheetTitle>
              <nav className="mt-6 flex flex-col gap-1">
                {NAV.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-lg hover:bg-muted"
                  >
                    {n.label}
                  </Link>
                ))}
                <Link to="/menu" onClick={() => setOpen(false)} className="mt-4">
                  <Button className="w-full rounded-full" size="lg">
                    Order online
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur">
          <div className="container-page py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Search lattes, pastries, matcha…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="pl-9 pr-9 h-11 rounded-full"
                aria-label="Search menu"
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setQ("");
                }}
                aria-label="Close search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            {q && (
              <ul className="mt-3 max-h-72 divide-y divide-border/60 overflow-auto rounded-2xl border border-border/60 bg-card">
                {results.length === 0 && (
                  <li className="px-4 py-3 text-sm text-muted-foreground">
                    No matches for &ldquo;{q}&rdquo;
                  </li>
                )}
                {results.map((r) => (
                  <li key={r.id}>
                    <Link
                      to="/menu"
                      hash={r.id}
                      onClick={() => {
                        setSearchOpen(false);
                        setQ("");
                      }}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-muted"
                    >
                      <img
                        src={r.image}
                        alt=""
                        loading="lazy"
                        className="size-10 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{r.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {r.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
