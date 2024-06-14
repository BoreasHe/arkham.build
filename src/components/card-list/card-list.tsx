import { GroupedVirtuoso, GroupedVirtuosoHandle } from "react-virtuoso";
import { useStore } from "@/store";
import { ListCard } from "./list-card";

import css from "./card-list.module.css";
import { Grouphead } from "./Grouphead";
import { selectFilteredCards } from "@/store/selectors/card-list";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { range } from "@/utils/range";
import { Select } from "../ui/select";

export function CardList() {
  const [rendered, setRendered] = useState(false);
  const virtuosoRef = useRef<GroupedVirtuosoHandle>(null);
  const data = useStore(selectFilteredCards);
  const setListScrollRestore = useStore((state) => state.setListScrollRestore);
  const scrollRestore = useStore((state) => state.ui.listScrollRestore);

  const onSelectGroup = useCallback(
    (evt: ChangeEvent<HTMLSelectElement>) => {
      if (!data || !virtuosoRef) return;

      const groupIndex = data.groups.findIndex(
        (g) => g.code === evt.target.value,
      );
      if (groupIndex >= 0) {
        const groupOffset = range(0, groupIndex).reduce(
          (acc, i) => acc + data.groupCounts[i],
          0,
        );
        virtuosoRef.current?.scrollToIndex(groupOffset);
      }
    },
    [data],
  );

  const onScrollStop = useCallback(
    (scrolling: boolean) => {
      if (!scrolling) {
        virtuosoRef.current?.getState((snapshot) => {
          if (snapshot.scrollTop !== 0) {
            setListScrollRestore(snapshot);
          }
        });
      }
    },
    [setListScrollRestore],
  );

  useEffect(() => {
    setRendered(true);
  }, []);

  useEffect(() => {
    virtuosoRef.current?.scrollTo({ top: 0 });
  }, [data?.groupCounts]);

  // TODO: restore scroll position to current group?
  // TODO: use semantic markup. maybe integrate with radix-scrollarea?
  return (
    <div className={css["list-container"]}>
      <nav className={css["list-nav"]}>
        <output>{data?.cards.length ?? 0} cards</output>
        {data && (
          <Select
            onChange={onSelectGroup}
            value=""
            tabIndex={-1}
            options={data.groups.map((group) => ({
              value: group.code,
              label: group.name,
            }))}
          />
        )}
      </nav>
      {data && (
        <GroupedVirtuoso
          className={css["list-scroller"]}
          key={data.key}
          groupCounts={data.groupCounts}
          groupContent={(index) => <Grouphead grouping={data.groups[index]} />}
          itemContent={(index) => (
            <ListCard key={data.cards[index].code} card={data.cards[index]} />
          )}
          ref={virtuosoRef}
          isScrolling={onScrollStop}
          restoreStateFrom={!rendered ? scrollRestore : undefined}
        />
      )}
    </div>
  );
}
