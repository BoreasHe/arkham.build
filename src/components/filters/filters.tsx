import clsx from "clsx";

import { useStore } from "@/store";
import { selectActiveCardType } from "@/store/selectors/filters";

import css from "./filters.module.css";

import { Button } from "../ui/button";
import { Scroller } from "../ui/scroller";
import { ActionFilter } from "./action-filter";
import { AssetFilter } from "./asset-filter";
import { CostFilter } from "./cost-filter";
import { EncounterSetFilter } from "./encounter-set-filter";
import { FactionFilter } from "./faction-filter";
import { InvestigatorFilter } from "./investigator-filter";
import { LevelFilter } from "./level-filter";
import { OwnershipFilter } from "./ownership-filter";
import { PackFilter } from "./pack-filter";
import { PropertiesFilter } from "./properties-filter";
import { SkillIconsFilter } from "./skill-icons-filter";
import { SubtypeFilter } from "./subtype-filter";
import { TabooSetFilter } from "./taboo-set-filter";
import { TraitFilter } from "./trait-filter";
import { TypeFilter } from "./type-filter";

type Props = {
  slotActions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  hiddenFilters?: string[];
};

export function Filters({
  slotActions,
  children,
  className,
  hiddenFilters,
}: Props) {
  const touched = useStore((state) => state.filters.touched);

  const cardTypeSelection = useStore(selectActiveCardType);
  const resetFilters = useStore((state) => state.resetFilters);

  return (
    <search className={clsx(css["filters"], className)} title="Filters">
      <div className={css["header"]}>
        <h3 className={css["title"]}>Filters</h3>
        <div>
          <Button disabled={!touched} onClick={resetFilters} variant="bare">
            <i className="icon-filter-clear" /> Clear
          </Button>
          {slotActions}
        </div>
      </div>
      <Scroller>
        <div className={css["content"]}>
          <FactionFilter />
          {children}
          <OwnershipFilter />
          {!hiddenFilters?.includes("investigator") &&
            cardTypeSelection === "player" && <InvestigatorFilter />}
          {cardTypeSelection === "player" && <LevelFilter />}
          <CostFilter />
          <TraitFilter />
          <TypeFilter />
          <SubtypeFilter />
          <AssetFilter />
          <SkillIconsFilter />
          <PropertiesFilter />
          <ActionFilter />
          <PackFilter />
          {cardTypeSelection === "encounter" && <EncounterSetFilter />}
          {!hiddenFilters?.includes("taboo_set") &&
            cardTypeSelection === "player" && <TabooSetFilter />}
        </div>
      </Scroller>
    </search>
  );
}
