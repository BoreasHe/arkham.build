import { File, FileCheck, FileWarning } from "lucide-react";
import { useCallback } from "react";

import { useStore } from "@/store";
import { selectActiveListFilter } from "@/store/selectors/lists";
import { isOwnershipFilterObject } from "@/store/slices/lists.type-guards";
import { assert } from "@/utils/assert";

import {
  RadioButtonGroup,
  RadioButtonGroupItem,
} from "../ui/radio-button-group";
import { FilterContainer } from "./primitives/filter-container";

export function OwnershipFilter({ id }: { id: number }) {
  const filter = useStore((state) => selectActiveListFilter(state, id));
  assert(isOwnershipFilterObject(filter), "filter must be an ownership filter");

  const setFilterValue = useStore((state) => state.setFilterValue);
  const setFilterOpen = useStore((state) => state.setFilterOpen);

  const onOpenChange = useCallback(
    (open: boolean) => {
      setFilterOpen(id, open);
    },
    [id, setFilterOpen],
  );

  const onValueChange = useCallback(
    (value: string) => {
      setFilterValue(id, value);
    },
    [id, setFilterValue],
  );

  const changes =
    filter.value === "all"
      ? "All"
      : filter.value === "owned"
        ? "Owned"
        : "Unavailable";

  return (
    <FilterContainer
      alwaysShowFilterString
      filterString={changes}
      onOpenChange={onOpenChange}
      open={filter.open}
      title="Ownership"
    >
      <RadioButtonGroup
        icons
        onValueChange={onValueChange}
        value={filter.value ?? ""}
      >
        <RadioButtonGroupItem title="All" value="all">
          <File />
        </RadioButtonGroupItem>
        <RadioButtonGroupItem title="Owned" value="owned">
          <FileCheck />
        </RadioButtonGroupItem>
        <RadioButtonGroupItem title="Unavailable" value="unowned">
          <FileWarning />
        </RadioButtonGroupItem>
      </RadioButtonGroup>
    </FilterContainer>
  );
}
