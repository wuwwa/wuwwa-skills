# Geist Serif

Checked 2026-11-07. Vercel announced this display serif on 2026-10-30. It is a typography reference/package integration, not an agent skill.

The announcement shows installation through `geist` and a Next.js example importing `GeistSerifRegular` from `geist/font/serif/regular`, then applying its CSS variable. Check the installed package's actual exports before copying the example to another framework; the browser-only/Vite route may use downloaded font files instead.

Use the current display face for large text where it fits the brief. Do not assume a complete text-weight or italic family exists; the announcement describes future expansion separately from the released styles. Preserve the existing UI font unless the requested design change includes it. Check language/glyph coverage, loading, fallback and headline wrapping.

Sources: [Vercel announcement](https://vercel.com/blog/introducing-geist-serif), [font page](https://vercel.com/font), [rauchg post](https://x.com/rauchg/status/2116193690700198059). Package integration not tested here.
