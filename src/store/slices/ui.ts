import type { StateCreator } from "zustand";

import type { StoreState } from ".";
import type { UISlice, UIState } from "./ui.types";

export function getInitialUIState(): UIState {
  return {
    ui: {
      hydrated: false,
      initialized: false,
      filtersOpen: false,
      sidebarOpen: false,
    },
  };
}

export const createUISlice: StateCreator<StoreState, [], [], UISlice> = (
  set,
  get,
) => ({
  ...getInitialUIState(),
  setHydrated() {
    set({ ui: { ...get().ui, hydrated: true } });
  },
  toggleFilters(val: boolean) {
    const state = get();
    if (val !== state.ui.filtersOpen) {
      set({
        ui: {
          ...state.ui,
          filtersOpen: val,
        },
      });
    }
  },
  toggleSidebar(val: boolean) {
    const state = get();
    if (val !== state.ui.sidebarOpen) {
      set({
        ui: {
          ...state.ui,
          sidebarOpen: val,
        },
      });
    }
  },
});
