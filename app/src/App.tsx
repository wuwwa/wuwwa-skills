import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Box,
  Circle,
  Layers,
  Library,
  Moon,
  Search,
  Sparkles,
  Sun,
  Type,
  Waves,
} from "lucide-react";
import { Button } from "./components/arc/button/button";
import { SearchField } from "./components/arc/search-field/search-field";
import SegmentedControl from "./components/arc/segmented-control/segmented-control";
import { Dialog, DialogContent } from "./components/arc/dialog/dialog";
import { Select } from "./components/arc/select/select";
import { EmptyState } from "./components/arc/empty-state/empty-state";
import { Textarea } from "./components/arc/textarea/textarea";
import catalog from "../../catalog.json";

type Item = (typeof catalog)[number];
const categories = [
  "All",
  "Design",
  "Components",
  "Motion",
  "3D",
  "Effects",
  "Branding",
];
const types = [
  { value: "All", label: "All" },
  { value: "Skill", label: "Skills" },
  { value: "Library", label: "Libraries" },
  { value: "Tool", label: "Tools" },
];
const symbols = {
  Design: Type,
  Components: Layers,
  Motion: Circle,
  "3D": Box,
  Effects: Waves,
  Branding: Sparkles,
};
const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date + "T00:00:00Z"));
const isLocal = (item: Item) => ["design", "motion"].includes(item.demo);

function DesignDemo() {
  const [view, setView] = useState("after");
  return (
    <div className="demo">
      <SegmentedControl
        label="Compare design"
        value={view}
        onValueChange={setView}
        options={[
          { value: "before", label: "Before" },
          { value: "after", label: "After" },
        ]}
      />
      <div className={`design-example ${view}`}>
        {view === "before" && (
          <p className="sample-extra">Workspace / Projects / Getting started</p>
        )}
        <h3>Ready for your next idea?</h3>
        <p>
          {view === "before"
            ? "Your all-in-one workspace to organize your work, manage your projects, and organize everything in one place."
            : "Keep your notes and next steps in one place."}
        </p>
        <span className="sample-action">Create a project</span>
      </div>
      <p className="muted">Same content. Clearer hierarchy and less clutter.</p>
    </div>
  );
}

function MotionDemo() {
  const [collection, setCollection] = useState("");
  return (
    <div className="demo">
      <Select
        label="Add to collection"
        value={collection}
        onValueChange={setCollection}
        placeholder="Choose a collection"
        options={["Weekend project", "Things to try", "Inspiration"].map(
          (value) => ({ value, label: value }),
        )}
      />
      <p className="feedback" role="status">
        {collection
          ? `Added to ${collection}`
          : "Open the menu and choose a collection."}
      </p>
      <p className="muted">
        A working Arc select with motion and keyboard controls.
      </p>
    </div>
  );
}

function Details({ item, mode }: { item: Item; mode: string }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [today, setToday] = useState("");
  const prompt = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
  }, []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(item.prompt);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
      prompt.current?.focus();
      prompt.current?.select();
    }
  };
  return (
    <div className="details">
      {mode === "preview" &&
        (item.demo === "design" ? <DesignDemo /> : <MotionDemo />)}
      <Textarea
        label="Give this to your agent"
        id="agent-prompt"
        ref={prompt}
        value={item.prompt}
        readOnly
        rows={6}
      />
      <div className="detail-actions">
        <Button variant="primary" onClick={copy}>
          {copied ? "Prompt copied" : "Copy prompt"}
        </Button>
        <a href={item.source} target="_blank" rel="noreferrer">
          {item.kind === "Skill" ? "Read skill" : "View source"}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <p className="copy-status" role="status">
        {copyError
          ? "Copy is unavailable. The prompt is selected for you to copy manually."
          : copied
            ? "Ready to paste into your agent."
            : ""}
      </p>
      {!isLocal(item) && (
        <a
          className="demo-link"
          href={item.demo}
          target="_blank"
          rel="noreferrer"
        >
          Open creator’s demo
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      )}
      <dl className="dates">
        <dt>Added</dt>
        <dd>{formatDate(item.added)}</dd>
        <dt>{item.checked ? "Links checked" : "Updated"}</dt>
        <dd>{formatDate(item.checked || item.updated!)}</dd>
        <dt>Review after</dt>
        <dd>{formatDate(item.reviewAfter)}</dd>
        <dt>Status</dt>
        <dd>{today > item.reviewAfter ? "Needs review" : item.status}</dd>
        {item.attribution && (
          <>
            <dt>Creator</dt>
            <dd>{item.attribution}</dd>
          </>
        )}
      </dl>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [kind, setKind] = useState("All");
  const [theme, setTheme] = useState("light");
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<Item | null>(null);
  const [mode, setMode] = useState("use");
  const [open, setOpen] = useState(false);
  const lastTrigger = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") || "");
    setCategory(
      categories.includes(params.get("category") || "")
        ? params.get("category")!
        : "All",
    );
    setKind(
      types.some((type) => type.value === params.get("type"))
        ? params.get("type")!
        : "All",
    );
    setTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    );
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    for (const [key, value] of [
      ["q", query],
      ["category", category === "All" ? "" : category],
      ["type", kind === "All" ? "" : kind],
    ]) {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    window.history.replaceState(null, "", url);
  }, [query, category, kind, ready]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const shown = catalog.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      (kind === "All" || item.kind === kind) &&
      `${item.name} ${item.description} ${item.category} ${item.kind} ${item.attribution || ""}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const show = (item: Item, view: string) => {
    lastTrigger.current = document.activeElement as HTMLElement;
    setSelected(item);
    setMode(view);
    setOpen(true);
  };
  return (
    <>
      <a className="skip" href="#collection">
        Skip to collection
      </a>
      <div className="page">
        <header className="header">
          <a className="brand" href="./">
            <Library size={24} strokeWidth={1.75} aria-hidden="true" />
            Collection
          </a>
          <div className="header-actions">
            <a
              href="https://github.com/wuwwa/wuwwa-skills"
              aria-label="Repository"
              target="_blank"
              rel="noreferrer"
            >
              <span className="repo-label">Repository</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <Button
              variant="ghost"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Moon size={18} aria-hidden="true" />
              ) : (
                <Sun size={18} aria-hidden="true" />
              )}
            </Button>
          </div>
        </header>
        <main id="collection">
          <div className="heading">
            <h1>Skills & tools</h1>
            <span className="count" role="status">
              {shown.length} {shown.length === 1 ? "item" : "items"}
            </span>
          </div>
          <div className="toolbar">
            <SearchField
              label="Search"
              placeholder="Find a skill or tool"
              value={query}
              onValueChange={setQuery}
            />
            <Select
              label="Category"
              value={category}
              onValueChange={setCategory}
              options={categories.map((value) => ({
                value,
                label: value === "All" ? "All categories" : value,
              }))}
            />
          </div>
          <div className="view-bar">
            <SegmentedControl
              label="Item type"
              value={kind}
              onValueChange={setKind}
              options={types}
            />
          </div>
          <div className="collection">
            {shown.map((item) => {
              const Symbol = symbols[item.category as keyof typeof symbols];
              return (
                <article className="item" key={item.id}>
                  <Symbol
                    className="item-symbol"
                    size={24}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div className="item-name">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                  </div>
                  <span className="item-category">{item.category}</span>
                  <div className="item-actions">
                    {isLocal(item) ? (
                      <Button
                        variant="ghost"
                        onClick={() => show(item, "preview")}
                        aria-label={`Preview ${item.name}`}
                      >
                        Preview
                      </Button>
                    ) : (
                      <a
                        href={item.demo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${item.name} demo`}
                      >
                        Demo
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    )}
                    <Button
                      variant="secondary"
                      onClick={() => show(item, "use")}
                      aria-label={`Use ${item.name}`}
                    >
                      Use
                    </Button>
                  </div>
                </article>
              );
            })}
            {shown.length === 0 && (
              <EmptyState
                icon={<Search size={24} />}
                title="No matches"
                description="Try another search or clear your filters."
                action={
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setQuery("");
                      setCategory("All");
                      setKind("All");
                    }}
                  >
                    Clear filters
                  </Button>
                }
              />
            )}
          </div>
        </main>
        <footer>
          <span>Pick a skill. Try it. Make something.</span>
        </footer>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        {selected && (
          <DialogContent
            className="skill-modal"
            title={selected.name}
            description={selected.description}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              lastTrigger.current?.focus();
            }}
          >
            <Details key={selected.id + mode} item={selected} mode={mode} />
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
