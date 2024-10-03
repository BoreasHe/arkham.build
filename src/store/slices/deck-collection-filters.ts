import type { StateCreator } from "zustand";
import type { StoreState } from ".";
import type {
  DeckFiltersSlice,
  DeckValidity,
} from "./deck-collection-filters.types";

function getInitialUIState() {
  return {
    deckFilters: {
      filters: {
        faction: [],
        search: "",
        tags: [],
        properties: {
          parallel: false,
        },
        validity: "all" as DeckValidity,
        expCost: undefined,
      },
      open: {
        tags: false,
        properties: false,
        validity: false,
        expCost: false,
      },
    },
  };
}

export const createDeckFiltersSlice: StateCreator<
  StoreState,
  [],
  [],
  DeckFiltersSlice
> = (set, get) => ({
  ...getInitialUIState(),
  addDecksFilter(type, value) {
    const state = get();
    const filterValues = structuredClone(state.deckFilters.filters);
    filterValues[type] = value;

    set({
      deckFilters: {
        ...state.deckFilters,
        filters: filterValues,
      },
    });
  },

  setDeckFilterOpen(filter, value) {
    const state = get();

    set({
      deckFilters: {
        ...state.deckFilters,
        open: { ...state.deckFilters.open, [filter]: value },
      },
    });
  },

  resetDeckFilter(filter) {
    const state = get();
    const initialState = getInitialUIState().deckFilters.filters[filter];

    set({
      deckFilters: {
        ...state.deckFilters,
        open: { ...state.deckFilters.open },
        filters: { ...state.deckFilters.filters, [filter]: initialState },
      },
    });
  },
});
