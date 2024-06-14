/* eslint-disable react/display-name */
import clsx from "clsx";
import { memo } from "react";

import type { Card } from "@/store/services/types";
import { getCardColor } from "@/utils/card-utils";

import css from "./card-thumbnail.module.css";

type Props = {
  card: Card;
  className?: string;
};

// memoize this component with a custom equality check.
// not doing results in a lot of aborted requests in firefox, which in turn seem to lead to cache misses.
export const CardThumbnail = memo(
  ({ card, className }: Props) => {
    const colorCls = getCardColor(card);

    if (!card.imageurl) return null;

    return (
      <div
        className={clsx(
          css["thumbnail"],
          css[card.type_code],
          card.subtype_code && css[card.subtype_code],
          colorCls,
          className,
        )}
      >
        <img
          src={`${import.meta.env.VITE_CARD_IMAGE_URL}/thumbnails/${card.code}.webp`}
        />
      </div>
    );
  },
  (prev, next) => prev.card.code === next.card.code,
);
