import { create } from "zustand";
import { persist } from "zustand/middleware";

type UICategoriesState = {
  expanded: Record<string, boolean>;
  toggle: (key: string) => void;
  set: (key: string, value: boolean) => void;
  reset: () => void;
};

export const useUICategories = create<UICategoriesState>()(
  persist(
    (set) => ({
      expanded: {},
      toggle: (key) =>
        set((s) => ({ expanded: { ...s.expanded, [key]: !s.expanded[key] } })),
      set: (key, value) =>
        set((s) => ({ expanded: { ...s.expanded, [key]: value } })),
      reset: () => set({ expanded: {} }),
    }),
    { name: "ui-categories-v1" }
  )
);
