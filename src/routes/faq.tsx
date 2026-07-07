import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  component: FAQ,
  head: () => ({
    meta: [
      { title: "FAQ — The Grove Café" },
      { name: "description", content: "Answers to the questions we hear most — orders, allergies, pickup, catering, and more." },
      { property: "og:title", content: "FAQ — The Grove Café" },
      { property: "og:description", content: "Everything you might want to know before you visit." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
});

const FAQS = [
  {
    q: "Do you offer non-dairy milk?",
    a: "Yes — oat, almond, and coconut milk are available on every drink for a small upcharge.",
  },
  {
    q: "Is your café dog-friendly?",
    a: "Dogs are welcome on our patio, and we have a wall of good-boy photos inside to prove it.",
  },
  {
    q: "How does online ordering work?",
    a: "Add items to your cart, choose pickup or delivery, pick a time, and we'll have it ready. You'll get a confirmation with your order number.",
  },
  {
    q: "Do you offer catering?",
    a: "Absolutely — meetings, weddings, small events. Email hello@thegrovecafe.ca at least 48 hours in advance.",
  },
  {
    q: "Are your baked goods made in-house?",
    a: "Every day, from scratch, by our baker. Scones, cookies, muffins, and croissants are usually out by 9am.",
  },
  {
    q: "Do you have gluten-free options?",
    a: "We rotate a gluten-free bake each week. Ask the barista — they'll know what's fresh.",
  },
  {
    q: "Can I bring my laptop and work here?",
    a: "You can, and lots of people do. Free Wi-Fi, plenty of outlets, and no time limit — we'll only ask you to make room during our lunch rush.",
  },
  {
    q: "Do you have parking?",
    a: "Yes, free street parking on Lancaster and a small lot behind the building.",
  },
];

function FAQ() {
  return (
    <section className="container-page py-16 md:py-24">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">FAQ</p>
      <h1 className="mt-2 font-display text-5xl md:text-6xl">Good questions.</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Can't find what you're looking for?{" "}
        <a href="mailto:hello@thegrovecafe.ca" className="underline">
          Email us
        </a>{" "}
        — we're quick to reply.
      </p>

      <div className="mx-auto mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`i-${i}`}>
              <AccordionTrigger className="font-display text-left text-lg hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
