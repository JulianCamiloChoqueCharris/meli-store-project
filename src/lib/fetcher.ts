export async function fetchJSON<T>(
  url: string,
  options: { revalidate?: number; nextTags?: string[] } = {}
): Promise<T> {
  const { revalidate = 60, nextTags } = options;
  const res = await fetch(url, { next: { revalidate, tags: nextTags } });
  if (!res.ok) {
    let extra = "";
    try {
      extra = ` | body: ${await res.text()}`;
    } catch {}
    throw new Error(`Request failed: ${res.status} ${res.statusText}${extra}`);
  }
  return res.json() as Promise<T>;
}
