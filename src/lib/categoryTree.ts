import type { CategoryNode } from "./types";

export function buildCategoryTree(slugs: string[]): CategoryNode[] {
  const parentsMap = new Map<string, CategoryNode>();
  const leaves: CategoryNode[] = [];

  for (const slug of slugs) {
    const [prefix] = slug.split("-");
    if (!prefix || prefix === slug) {
      leaves.push({ key: slug, label: beautify(slug), isLeaf: true });
      continue;
    }
    if (!parentsMap.has(prefix)) {
      parentsMap.set(prefix, {
        key: prefix,
        label: beautify(prefix),
        children: [],
      });
    }
    parentsMap.get(prefix)!.children!.push({
      key: slug,
      label: beautify(slug),
      isLeaf: true,
    });
  }

  const parentNodes = Array.from(parentsMap.values()).sort((a, b) =>
    a.label.localeCompare(b.label)
  );
  parentNodes.forEach((p) =>
    p.children!.sort((a, b) => a.label.localeCompare(b.label))
  );

  const standaloneLeaves = leaves
    .filter((l) => !l.key.includes("-"))
    .sort((a, b) => a.label.localeCompare(b.label));

  const otherLeaves = leaves
    .filter((l) => l.key.includes("-"))
    .sort((a, b) => a.label.localeCompare(b.label));

  return [...parentNodes, ...standaloneLeaves, ...otherLeaves];
}

function beautify(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
