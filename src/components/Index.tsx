import { useMemo, useState } from "react";
import bookmarks from "../data/bookmarks.json";

type Link = { title: string; url: string };
type Sub = { name: string | null; links: Link[] };
type Category = { name: string; subs: Sub[] };

const data = bookmarks as Category[];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

function domain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function splitEmoji(name: string): { emoji: string; label: string } {
  const m = name.match(/^(\p{Extended_Pictographic}\uFE0F?)\s*(.*)$/u);
  if (m) return { emoji: m[1], label: m[2] };
  return { emoji: "•", label: name };
}

export function Index() {
  const [q, setQ] = useState("");

  const totalLinks = useMemo(
    () =>
      data.reduce(
        (a, c) => a + c.subs.reduce((x, s) => x + s.links.length, 0),
        0,
      ),
    [],
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return data;
    return data
      .map((cat) => ({
        ...cat,
        subs: cat.subs
          .map((s) => ({
            ...s,
            links: s.links.filter(
              (l) =>
                l.title.toLowerCase().includes(needle) ||
                l.url.toLowerCase().includes(needle),
            ),
          }))
          .filter((s) => s.links.length),
      }))
      .filter((c) => c.subs.length);
  }, [q]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <header
        className="relative border-b border-border w-full flex items-center justify-center"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-6xl px-6 pt-10 pb-12 md:pt-16 md:pb-20">
          <nav className="flex items-center justify-center">
            <a href="#top" className="flex items-center gap-2">
              <span className="font-display text-3xl">zeLinks</span>
            </a>
          </nav>

          <div
            id="top"
            className="mt-12  max-w-6xl flex flex-col items-center justify-center"
          >
            <p className="font-mono text-xl uppercase text-muted-foreground">
              A personal directory
            </p>
            <p className="mt-2 text-base md:text-lg text-muted-foreground max-w-2xl text-center">
              hand-picked tools, libraries, fonts and AI services across
              different categories.
            </p>
          </div>
        </div>
      </header>

      {/* Layout: sticky sidebar + content */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10">
        <aside className="hidden md:block">
          <div className="sticky top-6">
            <p className="font-mono text-[10px] uppercase text-muted-foreground mb-3">
              Categories
            </p>
            <ul className="space-y-1">
              {data.map((c) => {
                const { emoji, label } = splitEmoji(c.name);
                return (
                  <li key={c.name}>
                    <a
                      href={`#${slugify(c.name)}`}
                      className="group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition"
                    >
                      <span className="text-base leading-none">{emoji}</span>
                      <span className="truncate">{label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <main className="min-w-0">
          {filtered.length === 0 && (
            <p className="text-muted-foreground">No resources match "{q}".</p>
          )}

          <div className="space-y-16">
            {filtered.map((cat) => {
              const { emoji, label } = splitEmoji(cat.name);
              const count = cat.subs.reduce((a, s) => a + s.links.length, 0);
              return (
                <section
                  key={cat.name}
                  id={slugify(cat.name)}
                  className="scroll-mt-6"
                >
                  <header className="flex items-baseline justify-between border-b border-border pb-3 mb-6">
                    <h2 className="font-display text-3xl md:text-4xl flex items-center gap-3">
                      <span>{emoji}</span>
                      <span>{label}</span>
                    </h2>
                    <span className="font-mono text-xs text-muted-foreground">
                      {count} links
                    </span>
                  </header>

                  {cat.subs.map((sub, i) => (
                    <div key={i} className="mb-8 last:mb-0">
                      {sub.name && (
                        <h3 className="font-mono text-lg uppercase text-muted-foreground mb-3">
                          {sub.name}
                        </h3>
                      )}
                      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {sub.links.map((l) => (
                          <li key={l.url + l.title}>
                            <a
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group block rounded-lg border border-border bg-card hover:bg-muted/70 hover:border-primary/40 px-3 py-2.5 transition-colors"
                              style={{ boxShadow: "var(--shadow-card)" }}
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={`https://www.google.com/s2/favicons?domain=${domain(l.url)}&sz=64`}
                                  alt=""
                                  width={16}
                                  height={16}
                                  loading="lazy"
                                  className="h-4 w-4 rounded-sm shrink-0 opacity-90"
                                />
                                <span className="truncate text-sm font-medium group-hover:text-primary transition-colors">
                                  {l.title}
                                </span>
                              </div>
                              <span className="mt-1 block truncate font-mono text-[11px] text-muted-foreground">
                                {domain(l.url)}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              );
            })}
          </div>
        </main>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
          <p className="font-mono text-xs">zeLinks</p>
        </div>
      </footer>
    </div>
  );
}
