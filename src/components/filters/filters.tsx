import SvgFilterClear from "@/assets/icons/filter-clear.svg?react";
import { useStore } from "@/store";
import { selectActiveCardType } from "@/store/selectors/filters";

import css from "./filters.module.css";

import { Button } from "../ui/button";
import { Scroller } from "../ui/scroll-area";
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
  hiddenFilters?: string[];
};

export function Filters({ hiddenFilters }: Props) {
  const touched = useStore((state) => state.filters.touched);

  const cardTypeSelection = useStore(selectActiveCardType);
  const resetFilters = useStore((state) => state.resetFilters);

  return (
    <search className={css["filters"]} title="Filters">
      <div className={css["filters-header"]}>
        <h3 className={css["filters-title"]}>Filters</h3>
        <Button onClick={resetFilters} variant="bare" disabled={!touched}>
          <SvgFilterClear />
        </Button>
      </div>
      <Scroller>
        <div className={css["filters-container"]}>
          <FactionFilter />
          <OwnershipFilter />
          {cardTypeSelection === "player" && <LevelFilter />}
          <CostFilter />
          <TypeFilter />
          <SubtypeFilter />
          <TraitFilter />
          <SkillIconsFilter />
          <ActionFilter />
          <AssetFilter />
          <PropertiesFilter />
          <PackFilter />
          {cardTypeSelection === "encounter" && <EncounterSetFilter />}
          {cardTypeSelection === "player" && <TabooSetFilter />}
          {!hiddenFilters?.includes("investigator") &&
            cardTypeSelection === "player" && <InvestigatorFilter />}
        </div>
      </Scroller>
    </search>
  );
}
