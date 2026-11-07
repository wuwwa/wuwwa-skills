import { readFile, writeFile, mkdir, readdir, lstat } from "node:fs/promises";
import { resolve, relative, sep, posix } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { zipSync, unzipSync, strToU8 } from "fflate";

const root = fileURLToPath(new URL("../", import.meta.url));
const catalog = JSON.parse(
  await readFile(resolve(root, "catalog.json"), "utf8"),
);
const output = resolve(root, "app/public/bundles");
await mkdir(output, { recursive: true });

function insideRoot(path) {
  const absolute = resolve(root, path);
  const local = relative(root, absolute);
  if (local.startsWith(".." + sep) || local === ".." || !local)
    throw Error(`Unsafe source: ${path}`);
  return absolute;
}
function safeTarget(path) {
  if (
    !path ||
    path.includes("\\") ||
    path.includes(":") ||
    path.startsWith("/") ||
    path.split("/").some((part) => part === ".." || !part)
  )
    throw Error(`Unsafe bundle path: ${path}`);
  return path;
}
async function collect(source, target, files) {
  const absolute = insideRoot(source);
  const stat = await lstat(absolute);
  if (stat.isSymbolicLink()) throw Error(`Symlink is not packaged: ${source}`);
  if (stat.isDirectory()) {
    for (const name of (await readdir(absolute)).sort())
      await collect(posix.join(source, name), posix.join(target, name), files);
  } else if (stat.isFile()) {
    safeTarget(target);
    if (files[target]) throw Error(`Duplicate bundle path: ${target}`);
    files[target] = new Uint8Array(await readFile(absolute));
  } else throw Error(`Unsupported source: ${source}`);
}

const index = [];
for (const item of catalog) {
  const manifestPath = `bundles/${item.id}/bundle.json`;
  const manifest = JSON.parse(await readFile(insideRoot(manifestPath), "utf8"));
  if (manifest.id !== item.id || !manifest.files?.length)
    throw Error(`Invalid manifest: ${manifestPath}`);
  const files = {};
  for (const mapping of manifest.files)
    await collect(mapping.source, safeTarget(mapping.destination), files);
  const contents = Object.keys(files)
    .sort()
    .map((path) => ({
      path,
      sha256: createHash("sha256").update(files[path]).digest("hex"),
    }));
  files["bundle-manifest.json"] = strToU8(
    JSON.stringify(
      {
        schemaVersion: 1,
        id: item.id,
        checked: item.handoffChecked,
        reviewAfter: item.reviewAfter,
        sources: manifest.sources,
        contents,
      },
      null,
      2,
    ) + "\n",
  );
  const dated = Object.fromEntries(
    Object.entries(files).map(([path, data]) => [
      path,
      [data, { mtime: new Date(item.handoffChecked + "T00:00:00Z") }],
    ]),
  );
  const zipped = zipSync(dated, { level: 6 });
  // Verify the produced archive independently of the filesystem mappings.
  const unpacked = unzipSync(zipped);
  for (const record of contents) {
    if (
      createHash("sha256").update(unpacked[record.path]).digest("hex") !==
      record.sha256
    )
      throw Error(`Archive mismatch: ${item.id}/${record.path}`);
  }
  await writeFile(resolve(output, item.id + ".zip"), zipped);
  index.push({ id: item.id, files: contents.length, bytes: zipped.length });
}
await writeFile(
  resolve(output, "index.json"),
  JSON.stringify(index, null, 2) + "\n",
);
console.log(`Built and verified ${index.length} bundles.`);
