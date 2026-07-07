import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, Clock, MapPin, Leaf } from "lucide-react";
import heroImg from "@/assets/hero-cafe.jpg";
import lattesImg from "@/assets/lattes.jpg";
import baristaImg from "@/assets/barista.jpg";
import pastriesImg from "@/assets/pastries.jpg";
import { Button } from "@/components/ui/button";
import { menu } from "@/lib/menu-data";
import { formatMoney } from "@/lib/cart-store";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "The Grove Café — Coffee + Community in Kitchener" },
      {
        name: "description",
        content:
          "Ethically sourced coffee, hand-crafted beverages, and fresh in-house baked goods. Order online for pickup or delivery in Kitchener, ON.",
      },
      { property: "og:title", content: "The Grove Café — Coffee + Community" },
      {
        property: "og:description",
        content:
          "Hand-crafted coffee and fresh baked goods on Lancaster Street. Order online for pickup or delivery.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CafeOrCoffeeShop",
          name: "The Grove Café",
          address: {
            "@type": "PostalAddress",
            streetAddress: "295 Lancaster St W, Unit B",
            addressLocality: "Kitchener",
            addressRegion: "ON",
            postalCode: "N2H 4V4",
            addressCountry: "CA",
          },
          telephone: "+1-519-555-0100",
          priceRange: "$",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "198",
          },
        }),
      },
    ],
  }),
});

function Home() {
  const featured = menu.filter((m) => m.featured);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="The Grove Café interior in warm morning light"
            width={1600}
            height={1200}
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/50 to-background" />
        </div>
        <div className="container-page relative flex min-h-[86vh] flex-col justify-end pb-16 pt-28 text-primary-foreground md:min-h-[92vh] md:pb-24">
          <div className="max-w-2xl fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs backdrop-blur">
              <Leaf className="size-3.5" /> Ethically sourced · Baked fresh daily
            </span>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] tracking-tight text-balance md:text-7xl">
              Coffee + community, all in one place.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-white/85 text-balance">
              Small-batch beans, warm regulars, and the best chocolate chip cookies on
              Lancaster Street. Come in, or order ahead.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/menu">
                <Button
                  size="lg"
                  className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Order online <ArrowRight className="ml-1 size-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white"
                >
                  Visit us
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/85">
              <span className="flex items-center gap-2">
                <Star className="size-4 fill-accent text-accent" /> 4.8 · 198 Google reviews
              </span>
              <span className="flex items-center gap-2">
                <Clock className="size-4" /> Open today 8am–5pm
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="size-4" /> 295 Lancaster St W, Kitchener
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-page py-20 md:py-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              Loved by regulars
            </p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Today's favorites</h2>
          </div>
          <Link
            to="/menu"
            className="hidden text-sm font-medium hover:underline md:inline-flex"
          >
            See full menu →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <Link
              key={item.id}
              to="/menu"
              hash={item.id}
              className="group overflow-hidden rounded-3xl bg-card shadow-soft transition hover:shadow-lift"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg">{item.name}</h3>
                  <span className="text-sm font-medium text-primary">
                    {formatMoney(item.basePrice)}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STORY STRIP */}
      <section className="bg-secondary/60">
        <div className="container-page grid gap-12 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={baristaImg}
              alt="Barista pouring latte art"
              loading="lazy"
              className="aspect-[3/4] w-full rounded-3xl object-cover shadow-soft"
            />
            <img
              src={pastriesImg}
              alt="Fresh baked pastries"
              loading="lazy"
              className="mt-8 aspect-[3/4] w-full rounded-3xl object-cover shadow-soft"
            />
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              Our story
            </p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">
              A neighborhood table, one cup at a time.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The Grove started with a simple idea: a warm room, good coffee, and space
              for the neighborhood to gather. Every bean is traceable, every scone is
              mixed by hand, and every regular is remembered.
            </p>
            <Link to="/about" className="mt-6 inline-block">
              <Button variant="outline" className="rounded-full">
                Read our story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="container-page py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            What people say
          </p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">
            Kind words, cozy corners.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              q: "Great vibes, good customer service, yummy coffee 😋",
              a: "Priya M.",
              stars: 5,
            },
            {
              q: "Welcoming to those with a dog and also has a small selection of food choices.",
              a: "Michael R.",
              stars: 5,
            },
            {
              q: "Ordered a flight — it included two coffees, an espresso and a latte. Loved it.",
              a: "Sarah K.",
              stars: 5,
            },
          ].map((r) => (
            <figure
              key={r.a}
              className="flex flex-col justify-between rounded-3xl border border-border/60 bg-card p-6 shadow-soft"
            >
              <div>
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-lg leading-snug text-balance">
                  “{r.q}”
                </blockquote>
              </div>
              <figcaption className="mt-6 text-sm text-muted-foreground">
                — {r.a}, Google review
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="container-page pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary p-10 text-primary-foreground md:p-16">
          <img
            src={lattesImg}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="relative max-w-xl">
            <h2 className="font-display text-4xl md:text-5xl">
              Skip the line. Order ahead.
            </h2>
            <p className="mt-3 text-lg opacity-90">
              Pick your drink, customize it exactly how you like it, and we'll have it
              waiting at the counter.
            </p>
            <Link to="/menu" className="mt-6 inline-block">
              <Button
                size="lg"
                className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Start an order <ArrowRight className="ml-1 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
