import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — The Grove Café" },
      {
        name: "description",
        content:
          "Visit us at 295 Lancaster St W, Kitchener. Hours, phone, email, and map.",
      },
      { property: "og:title", content: "Contact — The Grove Café" },
      { property: "og:description", content: "Say hi, book a catering order, or just come by." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

const HOURS = [
  { day: "Monday", hrs: "8am – 5pm" },
  { day: "Tuesday", hrs: "8am – 5pm" },
  { day: "Wednesday", hrs: "8am – 5pm" },
  { day: "Thursday", hrs: "8am – 5pm" },
  { day: "Friday", hrs: "8am – 5pm" },
  { day: "Saturday", hrs: "8am – 5pm" },
  { day: "Sunday", hrs: "9am – 4pm" },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(5, "Tell us a little more").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Message sent — we'll get back to you soon!");
    }, 700);
  };

  return (
    <section className="container-page py-16 md:py-24">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">Contact</p>
      <h1 className="mt-2 font-display text-5xl md:text-6xl">Say hello.</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Questions, catering, or just a hi. We'd love to hear from you.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <InfoBlock icon={MapPin} title="Visit">
            295 Lancaster St W, Unit B
            <br />
            Kitchener, ON N2H 4V4
          </InfoBlock>
          <InfoBlock icon={Phone} title="Call">
            <a href="tel:+15195550100" className="hover:text-foreground">
              (519) 555-0100
            </a>
          </InfoBlock>
          <InfoBlock icon={Mail} title="Email">
            <a href="mailto:hello@thegrovecafe.ca" className="hover:text-foreground">
              hello@thegrovecafe.ca
            </a>
          </InfoBlock>
          <InfoBlock icon={Clock} title="Hours">
            <ul className="space-y-1">
              {HOURS.map((h) => (
                <li key={h.day} className="flex justify-between gap-6">
                  <span>{h.day}</span>
                  <span className="text-foreground">{h.hrs}</span>
                </li>
              ))}
            </ul>
          </InfoBlock>
        </div>

        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-3xl border border-border/60 shadow-soft">
            <iframe
              title="Map to The Grove Café"
              src="https://www.google.com/maps?q=295+Lancaster+St+W,+Kitchener,+ON+N2H+4V4&output=embed"
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <form
            onSubmit={onSubmit}
            className="mt-8 rounded-3xl border border-border/60 bg-card p-6 shadow-soft md:p-8"
          >
            <h2 className="font-display text-2xl">Send a message</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="c-name">Name</Label>
                <Input
                  id="c-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  maxLength={100}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="c-email">Email</Label>
                <Input
                  id="c-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  maxLength={255}
                  className="mt-1.5"
                />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="c-msg">Message</Label>
              <Textarea
                id="c-msg"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                maxLength={1000}
                className="mt-1.5"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="mt-6 w-full rounded-full sm:w-auto"
              disabled={submitting}
            >
              {submitting ? "Sending…" : "Send message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
        <h3 className="font-display text-lg">{title}</h3>
      </div>
      <div className="mt-3 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
