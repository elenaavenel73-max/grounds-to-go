import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-cafe.jpg";
import interior from "@/assets/interior.jpg";
import patio from "@/assets/patio.jpg";
import barista from "@/assets/barista.jpg";
import lattes from "@/assets/lattes.jpg";
import pastries from "@/assets/pastries.jpg";
import matcha from "@/assets/matcha.jpg";
import cookie from "@/assets/cookie.jpg";
import scone from "@/assets/scone.jpg";
import croissant from "@/assets/croissant.jpg";
import toast from "@/assets/toast.jpg";
import cappuccino from "@/assets/cappuccino.jpg";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({
    meta: [
      { title: "Gallery — The Grove Café" },
      { name: "description", content: "A look inside The Grove Café — the space, the coffee, the pastries." },
      { property: "og:title", content: "Gallery — The Grove Café" },
      { property: "og:description", content: "Photos of the café, our menu, and everyday moments." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
});

const IMAGES = [
  { src: hero, alt: "Sunlit café interior" },
  { src: lattes, alt: "Matcha and cappuccino side by side" },
  { src: patio, alt: "Outdoor patio with yellow awning" },
  { src: pastries, alt: "Fresh baked pastries on a board" },
  { src: barista, alt: "Barista pouring latte art" },
  { src: interior, alt: "Café tables and hanging plants" },
  { src: cappuccino, alt: "Cappuccino from above" },
  { src: matcha, alt: "Matcha latte with art" },
  { src: cookie, alt: "Stack of chocolate chip cookies" },
  { src: scone, alt: "Blueberry scone" },
  { src: croissant, alt: "Buttery croissant" },
  { src: toast, alt: "Avocado toast" },
];

function Gallery() {
  return (
    <section className="container-page py-16 md:py-24">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">Gallery</p>
      <h1 className="mt-2 font-display text-5xl md:text-6xl">Come take a look.</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Little moments from behind the counter, the patio, and everything on it.
      </p>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {IMAGES.map((img, i) => (
          <figure
            key={i}
            className="break-inside-avoid overflow-hidden rounded-2xl shadow-soft"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full transition duration-700 hover:scale-[1.02]"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
