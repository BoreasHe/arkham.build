import { useCallback } from "react";

import { useStore } from "@/store";
import {
  selectActionOptions,
  selectActiveListFilter,
  selectMultiselectChanges,
} from "@/store/selectors/lists";
import type { Coded } from "@/store/services/queries.types";
import { isActionFilterObject } from "@/store/slices/lists.type-guards";
import { assert } from "@/utils/assert";
import { capitalize } from "@/utils/formatting";

import { MultiselectFilter } from "./primitives/multiselect-filter";

export function ActionFilter({ id }: { id: number }) {
  const filter = useStore((state) => selectActiveListFilter(state, id));
  assert(
    isActionFilterObject(filter),
    `ActionFilter instantiated with '${filter?.type}'`,
  );

  const changes = selectMultiselectChanges(filter.value);
  const options = useStore(selectActionOptions);

  const nameRenderer = useCallback((item: Coded) => capitalize(item.code), []);

  return (
    <MultiselectFilter
      changes={changes}
      id={id}
      nameRenderer={nameRenderer}
      open={filter.open}
      options={options}
      placeholder="Select actions..."
      title="Actions"
      value={filter.value}
    />
  );
}
