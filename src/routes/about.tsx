import { createFileRoute } from "@tanstack/react-router";
import { Heart, Leaf, Users, Coffee } from "lucide-react";
import interior from "@/assets/interior.jpg";
import barista from "@/assets/barista.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — The Grove Café" },
      {
        name: "description",
        content:
          "The Grove Café is a neighborhood coffee shop in Kitchener serving ethically sourced coffee, house-made baked goods, and warm community.",
      },
      { property: "og:title", content: "About — The Grove Café" },
      { property: "og:description", content: "How a small neighborhood café became a Kitchener favorite." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function AboutPage() {
  return (
    <>
      <section className="container-page py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Our story
          </p>
          <h1 className="mt-2 font-display text-5xl md:text-6xl text-balance">
            A little room with a big welcome.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            The Grove Café opened its doors on Lancaster Street with one goal: to be the
            kind of place where the barista knows your name, your dog gets a treat, and
            your coffee tastes like it was made just for you.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-8 pb-16 md:grid-cols-2 md:pb-24">
        <img
          src={interior}
          alt="Cozy interior of The Grove Café with brick walls and plants"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft"
        />
        <img
          src={barista}
          alt="Barista pouring milk into an espresso"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft"
        />
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="container-page grid gap-8 md:grid-cols-4">
          {[
            { icon: Leaf, title: "Ethically sourced", body: "Traceable single-origin beans from farms we know by name." },
            { icon: Coffee, title: "House-roasted", body: "Small batches, roasted for balance and clarity." },
            { icon: Heart, title: "Baked in-house", body: "Scones, cookies, and pastries made from scratch every morning." },
            { icon: Users, title: "Community first", body: "A room built for regulars, newcomers, and everyone in between." },
          ].map((v) => (
            <div key={v.title} className="rounded-3xl bg-card p-6 shadow-soft">
              <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
                <v.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-xl">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            We opened in a modest little space with big windows and a bright yellow
            awning, and started brewing coffee for anyone who wanted to sit and stay
            awhile. Ten years later, the recipe hasn't changed much: good beans, patient
            hands, and a room that feels like a second living room.
          </p>
          <p>
            Every latte is pulled shot by shot. Every scone is folded and cut by our
            baker before sunrise. And every review, every friendly hello, every dog on
            the patio makes this place a little more ours — and yours.
          </p>
          <p className="font-display text-2xl text-foreground text-balance">
            Thanks for being part of The Grove. See you soon.
          </p>
        </div>
      </section>
    </>
  );
}
