import clsx from "clsx";

import type { Card } from "@/store/services/types";
import { getCardColor } from "@/utils/card-utils";

import css from "./card-header.module.css";

import { MulticlassIcons } from "../icons/multiclass-icons";
import { CardIcon } from "./card-icon";
import { CardNames } from "./card-names";

type Props = {
  card: Card;
  className?: string;
  linked?: boolean;
};

export function CardHeader({ card, className, linked }: Props) {
  const colorCls = getCardColor(card, "background");

  return (
    <header className={clsx(css["header"], colorCls, className)}>
      <div className={css["header-row"]}>
        <CardIcon className={css["header-icon"]} card={card} inverted />
        <CardNames
          code={card.code}
          isUnique={card.is_unique}
          name={card.real_name}
          linked={linked}
          parallel={card.parallel}
          subname={card.real_subname}
        />
      </div>
      <MulticlassIcons
        className={clsx(css["header-icon"], css["faction-icons"])}
        card={card}
        inverted
      />
    </header>
  );
}
