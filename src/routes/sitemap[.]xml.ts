import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          { path: "/", priority: "1.0", changefreq: "weekly" },
          { path: "/menu", priority: "0.9", changefreq: "weekly" },
          { path: "/about", priority: "0.7", changefreq: "monthly" },
          { path: "/gallery", priority: "0.6", changefreq: "monthly" },
          { path: "/contact", priority: "0.7", changefreq: "monthly" },
          { path: "/faq", priority: "0.5", changefreq: "monthly" },
          { path: "/careers", priority: "0.5", changefreq: "monthly" },
        ];
        const urls = paths
          .map(
            (p) =>
              `  <url>\n    <loc>${BASE_URL}${p.path}</loc>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
