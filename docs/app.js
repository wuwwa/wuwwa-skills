const $ = (selector, root = document) => root.querySelector(selector);
const grid = $("#grid");
const dialog = $("#detail");
const categories = [
  "All",
  "Design",
  "Components",
  "Motion",
  "3D",
  "Effects",
  "Branding",
];
const params = new URLSearchParams(location.search);
let category = categories.includes(params.get("category"))
  ? params.get("category")
  : "All";
let items = [];
let toastTimer;
$("#search").value = params.get("q") || "";
$("#kind").value = ["Skill", "Library", "Tool"].includes(params.get("type"))
  ? params.get("type")
  : "All";

const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const date = (value) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value + "T00:00:00"));
const external = 'target="_blank" rel="noopener noreferrer"';
const art = {
  arc: '<div class="arc-art"><span>Arc</span><i></i></div>',
  design:
    '<div class="mini-layout"><div class="mini-line mini-heading"></div><div class="mini-line"></div><div class="mini-row"><i></i><i></i><i></i></div></div>',
  motion: '<div class="motion-art"><i></i><i></i><i></i><span>↗</span></div>',
  fiber:
    '<svg class="cube-art" viewBox="0 0 120 120"><path class="face" d="M60 8 107 34 60 62 13 34Z"/><path d="M60 8 107 34v53l-47 27-47-27V34ZM13 34l47 28 47-28M60 62v52M37 21l47 28v52M84 21 37 49v52M13 61l47 27 47-27"/></svg>',
  glass: '<div class="glass-art"></div>',
  shader: '<div class="shader-art"></div>',
  logo: '<div class="logo-art">Aa</div>',
};

async function load() {
  $("#load-error").hidden = true;
  try {
    const response = await fetch("./catalog.json");
    if (!response.ok) throw new Error(`Catalog: ${response.status}`);
    const data = await response.json();
    if (
      !Array.isArray(data) ||
      data.some(
        (item) =>
          !item.id ||
          !item.name ||
          !item.prompt ||
          !categories.includes(item.category) ||
          !art[item.preview] ||
          !/^https:\/\//.test(item.source) ||
          !(
            ["design", "motion"].includes(item.demo) ||
            /^https:\/\//.test(item.demo)
          ),
      )
    )
      throw new Error("Invalid catalog");
    items = data;
    renderCategories();
    render();
  } catch (error) {
    console.error(error);
    $("#result-count").textContent = "Collection unavailable";
    $("#load-error").hidden = false;
  }
}

function renderCategories() {
  $("#categories").innerHTML = categories
    .map(
      (name) =>
        `<button class="category" data-category="${name}" aria-pressed="${name === category}"><span>${name === "All" ? "Everything" : name}</span><span>${items.filter((item) => name === "All" || item.category === name).length}</span></button>`,
    )
    .join("");
}

function render() {
  const query = $("#search").value.trim().toLowerCase();
  const kind = $("#kind").value;
  const shown = items.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      (kind === "All" || item.kind === kind) &&
      `${item.name} ${item.description} ${item.category} ${item.kind} ${item.attribution || ""}`
        .toLowerCase()
        .includes(query),
  );
  grid.innerHTML = shown
    .map((item) => {
      const local = ["design", "motion"].includes(item.demo);
      const preview = `<span aria-hidden="true">${art[item.preview]}</span><span class="preview-caption">${local ? "Try demo" : "Open demo ↗"}</span>`;
      const opening = local
        ? `<button class="preview card-preview p-${item.preview}" data-demo="${item.id}" aria-label="Try ${item.name} demo">`
        : `<a class="preview card-preview p-${item.preview}" href="${esc(item.demo)}" ${external} aria-label="Open ${item.name} demo in a new tab">`;
      return `<article class="card">${opening}${preview}${local ? "</button>" : "</a>"}<div class="card-info"><div class="meta"><span>${item.category}</span><span class="meta-dot" aria-hidden="true"></span><span>${item.kind}</span></div><h2>${esc(item.name)}</h2><p class="description">${esc(item.description)}</p><div class="card-actions"><button class="use-button" data-use="${item.id}" aria-label="Use ${item.name}">Use</button><a class="source-link" href="${esc(item.source)}" ${external}>Source <span aria-hidden="true">↗</span></a></div></div></article>`;
    })
    .join("");
  $("#result-count").textContent =
    `${shown.length} ${shown.length === 1 ? "item" : "items"}`;
  $("#empty").hidden = shown.length !== 0;
  const url = new URL(location.href);
  for (const [key, value] of [
    ["q", $("#search").value],
    ["category", category === "All" ? "" : category],
    ["type", kind === "All" ? "" : kind],
  ])
    value ? url.searchParams.set(key, value) : url.searchParams.delete(key);
  history.replaceState(null, "", url);
}

function openDialog(item, mode) {
  $("#dialog-title").textContent =
    mode === "use" ? `Use ${item.name}` : item.name;
  $("#dialog-kind").textContent =
    mode === "use" ? item.kind : "Interactive example";
  if (mode === "use") {
    const due = new Date(item.reviewAfter + "T23:59:59") < new Date();
    $("#dialog-content").innerHTML =
      `<p>${esc(item.description)}</p><label class="prompt-label" for="prompt">Give this to your agent</label><textarea id="prompt" class="prompt" readonly spellcheck="false">${esc(item.prompt)}</textarea><div class="dialog-actions"><button class="button" id="copy">Copy prompt</button><a href="${esc(item.source)}" ${external}>${item.kind === "Skill" ? "Read skill" : "Open repository"} ↗</a></div><dl class="dates"><dt>Added</dt><dd>${date(item.added)}</dd><dt>${item.checked ? "Links checked" : "Updated"}</dt><dd>${date(item.checked || item.updated)}</dd><dt>Review after</dt><dd>${date(item.reviewAfter)}</dd><dt>Status</dt><dd>${due ? "Needs review" : esc(item.status)}</dd>${item.attribution ? `<dt>Creator</dt><dd>${esc(item.attribution)}</dd>` : ""}</dl>`;
    $("#copy").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(item.prompt);
        $("#copy").textContent = "Copied";
        toast("Prompt copied");
      } catch {
        $("#prompt").focus();
        $("#prompt").select();
        toast("Select and copy the prompt");
      }
    });
  } else if (item.demo === "design") {
    $("#dialog-content").innerHTML =
      `<p>Same task. Less visual noise.</p><div class="demo-toolbar" aria-label="Compare design"><button data-style="before" aria-pressed="false">Before</button><button data-style="after" aria-pressed="true">After</button></div><div class="demo-surface"><div class="sample" id="sample"><span class="sample-tag">01 / YOUR WORKSPACE / GET STARTED</span><h3>Ready for your next idea?</h3><p id="sample-copy">Keep your notes and next steps in one place.</p><span class="sample-cta" id="sample-cta">Create a project</span></div></div><div class="demo-footer"><p>Typography, spacing, and a clear action.</p><button class="use-button" id="demo-use">Use skill</button></div>`;
    for (const button of dialog.querySelectorAll("[data-style]"))
      button.addEventListener("click", () => {
        const before = button.dataset.style === "before";
        $("#sample").classList.toggle("cluttered", before);
        $("#sample-copy").textContent = before
          ? "Your all-in-one workspace to organize your work, manage your projects, and organize everything in one place."
          : "Keep your notes and next steps in one place.";
        $("#sample-cta").textContent = before
          ? "GET STARTED WITH YOUR NEW PROJECT →"
          : "Create a project";
        dialog
          .querySelectorAll("[data-style]")
          .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      });
    $("#demo-use").addEventListener("click", () => openDialog(item, "use"));
  } else {
    $("#dialog-content").innerHTML =
      `<p>Open the menu. Pick a collection. Try it again.</p><div class="demo-surface"><div class="demo-motion-wrap"><button class="button menu-trigger" id="menu-trigger" aria-expanded="false" aria-controls="motion-menu"><span>Add to collection</span><span aria-hidden="true">＋</span></button><div class="motion-menu" id="motion-menu" inert><button>Weekend project</button><button>Things to try</button><button>Inspiration</button></div><p class="demo-feedback" id="demo-feedback" role="status"></p></div></div><div class="demo-footer"><p>200 ms entrance. 30 ms stagger.<br>Reduced motion supported.</p><button class="use-button" id="demo-use">Use skill</button></div>`;
    const trigger = $("#menu-trigger");
    const menu = $("#motion-menu");
    const toggle = (open) => {
      menu.classList.toggle("open", open);
      menu.inert = !open;
      trigger.setAttribute("aria-expanded", String(open));
    };
    trigger.addEventListener("click", () =>
      toggle(!menu.classList.contains("open")),
    );
    for (const button of menu.querySelectorAll("button"))
      button.addEventListener("click", () => {
        $("#demo-feedback").textContent = `Added to ${button.textContent}`;
        toggle(false);
        trigger.focus();
      });
    $("#demo-use").addEventListener("click", () => openDialog(item, "use"));
  }
  if (!dialog.open) dialog.showModal();
  else $("#close").focus();
}

function toast(message) {
  clearTimeout(toastTimer);
  $("#toast").textContent = message;
  $("#toast").classList.add("visible");
  toastTimer = setTimeout(() => $("#toast").classList.remove("visible"), 2600);
}
$("#categories").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  category = button.dataset.category;
  // Preserve keyboard focus while updating the selected category.
  for (const b of $("#categories").querySelectorAll("button"))
    b.setAttribute("aria-pressed", String(b === button));
  render();
});
grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-use],[data-demo]");
  if (!button) return;
  const item = items.find(
    (item) => item.id === (button.dataset.use || button.dataset.demo),
  );
  if (item) openDialog(item, button.dataset.use ? "use" : "demo");
});
$("#search").addEventListener("input", render);
$("#kind").addEventListener("change", render);
$("#reset").addEventListener("click", () => {
  category = "All";
  $("#search").value = "";
  $("#kind").value = "All";
  renderCategories();
  render();
  $("#search").focus();
});
$("#retry").addEventListener("click", load);
$("#close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      dialog.close();
  }
});
dialog.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && $("#motion-menu.open")) {
    event.preventDefault();
    $("#motion-menu").classList.remove("open");
    $("#motion-menu").inert = true;
    $("#menu-trigger").setAttribute("aria-expanded", "false");
    $("#menu-trigger").focus();
  }
});
load();
