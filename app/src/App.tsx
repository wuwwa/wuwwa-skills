import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Library, Moon, Search, Star, Sun } from "lucide-react";
import { Button } from "./components/arc/button/button";
import { SearchField } from "./components/arc/search-field/search-field";
import SegmentedControl from "./components/arc/segmented-control/segmented-control";
import { Dialog, DialogContent } from "./components/arc/dialog/dialog";
import { Select } from "./components/arc/select/select";
import { EmptyState } from "./components/arc/empty-state/empty-state";
import { Textarea } from "./components/arc/textarea/textarea";
import catalog from "../../catalog.json";
import { useFavorites } from "./useFavorites";

type Item = {
  id: string;
  name: string;
  kind: string;
  category: string;
  description: string;
  useWhen: string;
  youGet: string;
  source: string;
  demo?: string | null;
  added: string;
  checked?: string;
  updated?: string;
  reviewAfter: string;
  status: string;
  attribution?: string;
  prompt: string;
  handoffChecked: string;
  handoffValidation: string;
  bundlePath: string;
  bundleSummary: string;
  notes?: string[];
  revision?: string;
  platforms?: string[];
};
const items: Item[] = catalog;
const categories = ["All", ...new Set(items.map((item) => item.category))];
const platforms = ["All", "Web", "macOS", "Windows", "Linux"];
const types = [
  { value: "All", label: "All" },
  { value: "Skill", label: "Skills" },
  { value: "Library", label: "Libraries" },
  { value: "Tool", label: "Tools" },
  { value: "Repo", label: "Repos" },
  { value: "Reference", label: "References" },
];
const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date + "T00:00:00Z"));
const isLocal = (item: Item) => ["design", "motion"].includes(item.demo || "");

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
    </div>
  );
}

function Details({ item, mode }: { item: Item; mode: string }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [today, setToday] = useState("");
  const prompt = useRef<HTMLTextAreaElement>(null);
  const moreDetails = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
  }, []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(item.prompt);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
      if (moreDetails.current) moreDetails.current.open = true;
      window.requestAnimationFrame(() => {
        prompt.current?.focus();
        prompt.current?.select();
      });
    }
  };
  return (
    <div className="details">
      {mode === "preview" &&
        (item.demo === "design" ? <DesignDemo /> : <MotionDemo />)}
      <div className="detail-actions">
        <Button
          className="copy-button"
          variant="primary"
          onClick={copy}
          aria-live="polite"
        >
          {copied ? "Copied" : "Copy instructions"}
        </Button>
        <a
          href={`${import.meta.env.BASE_URL}bundles/${item.id}.zip`}
          download
        >
          Download files
        </a>
      </div>
      <details className="source-details" ref={moreDetails}>
        <summary>Details</summary>
        <div className="detail-content">
          <Textarea
            label="Agent instructions"
            id="agent-prompt"
            ref={prompt}
            value={item.prompt}
            readOnly
            rows={6}
            error={
              copyError ? "Copy the selected instructions manually." : undefined
            }
          />
          <div className="detail-links">
            <a href={item.source} target="_blank" rel="noreferrer">
              View source
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            {item.demo && !isLocal(item) && (
              <a href={item.demo} target="_blank" rel="noreferrer">
                Creator’s demo
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
          {item.notes && (
            <ul className="repo-notes">
              {item.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          )}
          <p className="muted">{item.handoffValidation}.</p>
          <dl className="dates">
            <dt>Handoff checked</dt>
            <dd>{formatDate(item.handoffChecked)}</dd>
            <dt>Added</dt>
            <dd>{formatDate(item.added)}</dd>
            <dt>{item.checked ? "Links checked" : "Updated"}</dt>
            <dd>{formatDate(item.checked || item.updated || item.added)}</dd>
            <dt>Review after</dt>
            <dd>{formatDate(item.reviewAfter)}</dd>
            <dt>Status</dt>
            <dd>{today > item.reviewAfter ? "Needs review" : item.status}</dd>
            {item.platforms && (
              <>
                <dt>Platforms</dt>
                <dd>{item.platforms.join(", ")}</dd>
              </>
            )}
            {item.attribution && (
              <>
                <dt>Creator</dt>
                <dd>{item.attribution}</dd>
              </>
            )}
            {item.revision && (
              <>
                <dt>Revision</dt>
                <dd className="revision">{item.revision.slice(0, 12)}</dd>
              </>
            )}
          </dl>
        </div>
      </details>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [kind, setKind] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [starredOnly, setStarredOnly] = useState(false);
  const {
    favorites,
    ready: favoritesReady,
    storageError,
    toggleFavorite,
  } = useFavorites();
  const [theme, setTheme] = useState("light");
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<Item | null>(null);
  const [mode, setMode] = useState("use");
  const [open, setOpen] = useState(false);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const starredFilter = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") || "");
    setPlatform(
      platforms.includes(params.get("platform") || "")
        ? params.get("platform")!
        : "All",
    );
    setStarredOnly(params.get("starred") === "1");
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
      ["platform", platform === "All" ? "" : platform],
      ["starred", starredOnly ? "1" : ""],
    ]) {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    window.history.replaceState(null, "", url);
  }, [query, category, kind, platform, starredOnly, ready]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const shown = items.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      (kind === "All" || item.kind === kind) &&
      (platform === "All" ||
        !item.platforms ||
        item.platforms.includes("Any") ||
        item.platforms.includes(platform)) &&
      (!starredOnly || favorites.includes(item.id)) &&
      `${item.name} ${item.description} ${item.useWhen} ${item.youGet} ${item.category} ${item.kind} ${item.attribution || ""}`
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
            <h1>Skills, tools & repos</h1>
            <span className="count" role="status">
              {shown.length} {shown.length === 1 ? "item" : "items"}
            </span>
          </div>
          <div className="toolbar">
            <SearchField
              label="Search"
              placeholder="What do you want to do?"
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
            <Select
              label="Platform"
              value={platform}
              onValueChange={setPlatform}
              options={platforms.map((value) => ({
                value,
                label: value === "All" ? "All platforms" : value,
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
            <Button
              ref={starredFilter}
              variant={starredOnly ? "secondary" : "ghost"}
              aria-pressed={starredOnly}
              onClick={() => setStarredOnly(!starredOnly)}
            >
              <Star
                size={16}
                fill={starredOnly ? "currentColor" : "none"}
                aria-hidden="true"
              />
              Starred <span className="favorite-count">{favorites.length}</span>
            </Button>
          </div>
          {storageError && (
            <p className="storage-message" role="status">
              Stars can’t be saved in this browser. Your current choices remain
              available until you close this page.
            </p>
          )}
          {starredOnly && !storageError && (
            <p className="muted favorites-hint">
              Stars are saved in this browser.
            </p>
          )}
          <div className="collection">
            {shown.map((item) => {
              return (
                <article className="item" key={item.id}>
                  <Button
                    className="star-button"
                    variant="ghost"
                    aria-pressed={favorites.includes(item.id)}
                    aria-label={`${favorites.includes(item.id) ? "Unstar" : "Star"} ${item.name}`}
                    title={`${favorites.includes(item.id) ? "Unstar" : "Star"} ${item.name}`}
                    disabled={!favoritesReady}
                    onClick={() => {
                      toggleFavorite(item.id);
                      if (starredOnly && favorites.includes(item.id))
                        starredFilter.current?.focus();
                    }}
                  >
                    <Star
                      size={18}
                      strokeWidth={1.5}
                      fill={
                        favorites.includes(item.id) ? "currentColor" : "none"
                      }
                      aria-hidden="true"
                    />
                  </Button>
                  <div className="item-name">
                    <h2>{item.name}</h2>
                    <p>{item.useWhen}</p>
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
                    ) : item.demo ? (
                      <a
                        href={item.demo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${item.name} demo`}
                      >
                        Demo
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    ) : item.kind === "Repo" || item.kind === "Reference" ? (
                      <a
                        href={item.source}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${item.name} ${item.kind === "Repo" ? "repository" : "reference"}`}
                      >
                        {item.kind === "Repo" ? "Open repo" : "Reference"}
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    ) : null}
                    <Button
                      variant="secondary"
                      onClick={() => show(item, "use")}
                      aria-label={
                        item.kind === "Repo" || item.kind === "Reference"
                          ? `View ${item.name} notes`
                          : `Add ${item.name} to project`
                      }
                    >
                      {item.kind === "Repo" || item.kind === "Reference"
                        ? "View notes"
                        : "Add to project"}
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
                      setPlatform("All");
                      setStarredOnly(false);
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
          <span>Keep what’s useful.</span>
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
