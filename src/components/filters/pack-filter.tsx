import { useCallback } from "react";

import { useStore } from "@/store";
import {
  selectActiveCardType,
  selectPackChanges,
  selectPackOptions,
  selectPackValue,
} from "@/store/selectors/filters";
import type { Pack } from "@/store/services/queries.types";

import PackIcon from "../icons/pack-icon";
import { MultiselectFilter } from "./primitives/multiselect-filter";

function PackName({ pack }: { pack: Pack }) {
  return (
    <>
      <PackIcon code={pack.code} />
      {pack.real_name}
    </>
  );
}

export function PackFilter() {
  const cardType = useStore(selectActiveCardType);
  const options = useStore(selectPackOptions);
  const value = useStore(selectPackValue);
  const changes = useStore(selectPackChanges);

  const nameRenderer = useCallback(
    (pack: Pack) => <PackName pack={pack} />,
    [],
  );

  const itemToString = useCallback(
    (pack: Pack) => pack.real_name.toLowerCase(),
    [],
  );

  return (
    <MultiselectFilter
      cardType={cardType}
      changes={changes}
      itemToString={itemToString}
      nameRenderer={nameRenderer}
      options={options}
      path="packCode"
      placeholder="Select pack..."
      title="Pack"
      value={value}
    />
  );
}
