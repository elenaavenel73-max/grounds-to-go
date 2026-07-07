import { Link } from "@tanstack/react-router";
import { Coffee, Instagram, Facebook, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/60">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-display text-2xl">
            <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
              <Coffee className="size-4" />
            </span>
            The Grove Café
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Coffee + community, all in one place. Ethically sourced beans, hand-crafted
            beverages, and baked goods made fresh in-house every morning.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="grid size-10 place-items-center rounded-full border border-border hover:bg-muted"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="grid size-10 place-items-center rounded-full border border-border hover:bg-muted"
            >
              <Facebook className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg">Visit</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="size-4 shrink-0 mt-0.5" />
              <span>
                295 Lancaster St W, Unit B
                <br />
                Kitchener, ON N2H 4V4
              </span>
            </li>
            <li className="flex gap-2">
              <Phone className="size-4 shrink-0 mt-0.5" />
              <a href="tel:+15195550100" className="hover:text-foreground">
                (519) 555-0100
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/menu" className="hover:text-foreground">Menu</Link></li>
            <li><Link to="/about" className="hover:text-foreground">Our story</Link></li>
            <li><Link to="/gallery" className="hover:text-foreground">Gallery</Link></li>
            <li><Link to="/careers" className="hover:text-foreground">Careers</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} The Grove Café. All rights reserved.</p>
          <p>Made with care in Kitchener, Ontario.</p>
        </div>
      </div>
    </footer>
  );
}
