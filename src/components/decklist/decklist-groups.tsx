import clsx from "clsx";

import { useStore } from "@/store";
import type { Grouping } from "@/store/lib/deck-grouping";
import { sortBySlots } from "@/store/lib/sorting";
import { selectForbiddenCards } from "@/store/selectors/decks";
import type { Card } from "@/store/services/queries.types";
import type { PlayerType } from "@/utils/constants";
import { PLAYER_TYPE_ORDER } from "@/utils/constants";
import { capitalize } from "@/utils/formatting";

import css from "./decklist-groups.module.css";

import { ListCard } from "../card-list/list-card";
import SlotIcon from "../icons/slot-icon";

type Props = {
  group: Grouping;
  ignoredCounts?: Record<string, number>;
  quantities?: Record<string, number>;
  layout: "one_column" | "two_column";
  mapping: string;
  ownershipCounts: Record<string, number>;
};

export function DecklistGroups({
  group,
  ignoredCounts,
  layout,
  mapping,
  ownershipCounts,
  quantities,
}: Props) {
  const assetGroup = group["asset"] ? (
    <li className={clsx(css["group"], css["asset"])}>
      <h4 className={css["group-title"]}>Asset</h4>
      <ol className={css["group-children"]}>
        {Object.entries(group["asset"] as Record<string, Card[]>)
          .toSorted(([a], [b]) => sortBySlots(a, b))
          .map(([key, val]) => {
            return (
              <li className={css["group-child"]} key={key}>
                <h5 className={css["group-entry_nested-title"]}>
                  <SlotIcon code={key} />
                  {capitalize(key)}
                </h5>
                <DecklistGroup
                  cards={val}
                  ignoredCounts={ignoredCounts}
                  mapping={mapping}
                  ownershipCounts={ownershipCounts}
                  quantities={quantities}
                />
              </li>
            );
          })}
      </ol>
    </li>
  ) : null;

  const rest = Object.keys(group)
    .filter((g) => g !== "asset")
    .toSorted(
      (a, b) =>
        PLAYER_TYPE_ORDER.indexOf(a as PlayerType) -
        PLAYER_TYPE_ORDER.indexOf(b as PlayerType),
    )
    .map((key) => {
      const k = key as keyof Grouping;
      const entry = group[k] as Card[];
      if (!entry) return null;
      return (
        <li className={clsx(css["group"])} key={k}>
          <h4 className={css["group-title"]}>{capitalize(k)}</h4>
          <DecklistGroup
            cards={entry}
            ignoredCounts={ignoredCounts}
            mapping={mapping}
            ownershipCounts={ownershipCounts}
            quantities={quantities}
          />
        </li>
      );
    });

  return layout === "one_column" ? (
    <ol className={css["group_one-col"]}>
      {assetGroup}
      {rest}
    </ol>
  ) : (
    <div className={css["group_two-cols"]}>
      {assetGroup}
      <ol>{rest}</ol>
    </div>
  );
}

type DecklistGroupProps = {
  cards: Card[];
  ignoredCounts?: Record<string, number>;
  mapping: string;
  ownershipCounts: Record<string, number>;
  quantities?: Record<string, number>;
};

export function DecklistGroup({
  cards,
  ignoredCounts,
  mapping,
  ownershipCounts,
  quantities,
}: DecklistGroupProps) {
  const forbiddenCards = useStore(selectForbiddenCards);

  return (
    <ol>
      {cards
        .toSorted((a, b) => a.real_name.localeCompare(b.real_name))
        .map((card) => (
          <ListCard
            as="li"
            canIndicateRemoval
            canShowOwnership
            card={card}
            disableEdits={mapping === "bonded"}
            forbidden={
              forbiddenCards.find(
                (x) => x.code === card.code && x.target === mapping,
              ) != null
            }
            ignored={ignoredCounts?.[card.code]}
            key={card.code}
            omitBorders
            owned={ownershipCounts[card.code]}
            quantities={quantities}
            size="sm"
          />
        ))}
    </ol>
  );
}
