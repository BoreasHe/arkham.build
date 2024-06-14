import { useCallback } from "react";

import SvgOwned from "@/assets/icons/card_all.svg?react";
import SvgUnowned from "@/assets/icons/card_unowned.svg?react";
import SvgAll from "@/assets/icons/cards.svg?react";
import { useStore } from "@/store";
import {
  selectActiveCardType,
  selectFilterOpen,
  selectOwnershipValue,
} from "@/store/selectors/filters";
import { capitalize } from "@/utils/capitalize";

import {
  RadioButtonGroup,
  RadioButtonGroupItem,
} from "../ui/radio-button-group";
import { FilterContainer } from "./primitives/filter-container";

export function OwnershipFilter() {
  const cardType = useStore(selectActiveCardType);
  const open = useStore(selectFilterOpen(cardType, "ownership"));
  const value = useStore(selectOwnershipValue);

  const setFilter = useStore((state) => state.setFilter);
  const setFilterOpen = useStore((state) => state.setFilterOpen);

  const onOpenChange = useCallback(
    (val: boolean) => {
      setFilterOpen(cardType, "ownership", val);
    },
    [setFilterOpen, cardType],
  );

  const onValueChange = useCallback(
    (value: string) => {
      setFilter(cardType, "ownership", "value", value);
    },
    [setFilter, cardType],
  );

  return (
    <FilterContainer
      title="Ownership"
      alwaysShowFilterString
      filterString={capitalize(value)}
      open={open}
      onOpenChange={onOpenChange}
    >
      <RadioButtonGroup icons value={value ?? ""} onValueChange={onValueChange}>
        <RadioButtonGroupItem title="All" value="all">
          <SvgAll />
        </RadioButtonGroupItem>
        <RadioButtonGroupItem title="Owned" value="owned">
          <SvgOwned />
        </RadioButtonGroupItem>
        <RadioButtonGroupItem title="Unowned" value="unowned">
          <SvgUnowned />
        </RadioButtonGroupItem>
      </RadioButtonGroup>
    </FilterContainer>
  );
}
