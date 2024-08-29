import { useMemo } from "react";

import { NONE, getGroupingKeyLabel } from "@/store/lib/grouping";
import type { ListState } from "@/store/selectors/card-list";
import type { Metadata } from "@/store/slices/metadata.types";

import css from "./card-list.module.css";

import { SlidersVertical } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select } from "../ui/select";

type Props = {
  data: ListState | undefined;
  metadata: Metadata;
  onSelectGroup: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
  showCardText: boolean;
  onChangeShowCardText(value: boolean): void;
};

export function CardListNav(props: Props) {
  const { data, metadata, onSelectGroup, onChangeShowCardText, showCardText } =
    props;

  const jumpToOptions = useMemo(
    () =>
      data?.groups.map((group, i) => {
        const count = data.groupCounts[i];

        const keys = group.key.split("|");
        const types = group.type.split("|");
        const isAsset = group.key.includes("asset");

        const groupLabel = keys
          .map((key, i) => {
            if (!isAsset && key === NONE) return null;
            const label = getGroupingKeyLabel(types[i], key, metadata);
            return label;
          })
          .filter(Boolean)
          .join(" · ");

        return {
          label: `${groupLabel} (${count})`,
          value: group.key,
        };
      }),
    [data, metadata],
  );

  if (data == null) return null;

  const filteredCount = data.totalCardCount - data.cards.length;

  return (
    <nav className={css["nav"]}>
      <output>
        <span data-testid="cardlist-count">
          {data?.cards.length ?? 0} cards
        </span>
        <small>
          <em>
            {filteredCount > 0 && ` (${filteredCount} hidden by filters)`}
          </em>
        </small>
      </output>
      <div className={css["nav-row"]}>
        {data && (
          <Select
            className={css["nav-jump"]}
            emptyLabel="Jump to..."
            onChange={onSelectGroup}
            options={jumpToOptions ?? []}
            value=""
          />
        )}
        <Popover placement="bottom-end">
          <PopoverTrigger asChild>
            <Button tooltip="List settings" data-test-id="card-list-config">
              <SlidersVertical />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <DropdownMenu>
              <Checkbox
                id="card-list-text-toggle"
                data-test-id="card-list-text-toggle"
                label="Show full card text"
                checked={showCardText}
                onCheckedChange={onChangeShowCardText}
              />
            </DropdownMenu>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
