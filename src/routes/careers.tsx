import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/careers")({
  component: Careers,
  head: () => ({
    meta: [
      { title: "Careers — The Grove Café" },
      { name: "description", content: "Join the team at The Grove Café. Baristas, bakers, and floor leads." },
      { property: "og:title", content: "Careers — The Grove Café" },
      { property: "og:description", content: "We're always looking for warm, curious people." },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
});

const ROLES = [
  { title: "Barista", type: "Part-time", location: "Kitchener, ON" },
  { title: "Pastry Baker", type: "Full-time · early shift", location: "Kitchener, ON" },
  { title: "Weekend Floor Lead", type: "Weekends", location: "Kitchener, ON" },
];

function Careers() {
  return (
    <section className="container-page py-16 md:py-24">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">Careers</p>
      <h1 className="mt-2 font-display text-5xl md:text-6xl">Come work with us.</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        We hire for warmth first, coffee skills second. Tips are pooled, shifts are
        respected, and everyone learns to pull a great shot.
      </p>

      <div className="mt-12 grid gap-4">
        {ROLES.map((r) => (
          <div
            key={r.title}
            className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border/60 bg-card p-6 shadow-soft md:flex-row md:items-center"
          >
            <div>
              <h3 className="font-display text-2xl">{r.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {r.type} · {r.location}
              </p>
            </div>
            <a href="mailto:hello@thegrovecafe.ca?subject=Application">
              <Button className="rounded-full">Apply</Button>
            </a>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Don't see your role? Drop us a note anyway at{" "}
        <a href="mailto:hello@thegrovecafe.ca" className="underline">
          hello@thegrovecafe.ca
        </a>
        .
      </p>
    </section>
  );
}
