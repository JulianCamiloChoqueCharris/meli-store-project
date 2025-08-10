import { create } from "zustand";

type SidebarState = {
  isOpenMobile: boolean;
  expandedKeys: Record<string, boolean>;
  toggleMobile: (open?: boolean) => void;
  setExpanded: (categoryId: string, expanded: boolean) => void;
  replaceExpanded: (next: Record<string, boolean>) => void;
};

const STORAGE_KEY = "meli-sidebar-expanded";

function loadExpanded(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function saveExpanded(state: Record<string, boolean>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  isOpenMobile: false,
  expandedKeys: {},
  toggleMobile: (open) =>
    set((s) => ({
      isOpenMobile: typeof open === "boolean" ? open : !s.isOpenMobile,
    })),
  setExpanded: (categoryId, expanded) => {
    const next = { ...get().expandedKeys, [categoryId]: expanded };
    saveExpanded(next);
    set({ expandedKeys: next });
  },
  replaceExpanded: (next) => {
    saveExpanded(next);
    set({ expandedKeys: next });
  },
}));

export function hydrateExpandedOnClient() {
  if (typeof window === "undefined") return {};
  const loaded = loadExpanded();
  useSidebarStore.getState().replaceExpanded(loaded);
  return loaded;
}
