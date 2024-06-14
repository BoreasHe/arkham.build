import clsx from "clsx";

import PackIcon from "@/components/icons/pack-icon";
import { Checkbox } from "@/components/ui/checkbox";
import type { Cycle, Pack } from "@/store/services/queries.types";

import css from "./collection.module.css";

type Props = {
  cycle: Cycle;
  hasQuantity: boolean;
  pack: Pack;
  value: number;
  onChange: (code: string, val: number) => void;
};

export function CollectionPack({
  cycle,
  hasQuantity,
  pack,
  onChange,
  value,
}: Props) {
  return (
    <li
      className={clsx(css["collection-pack"], pack.reprint && css["reprint"])}
      key={pack.code}
    >
      {hasQuantity ? (
        <div className={css["collection-pack-label"]}>
          <input
            className={css["collection-quantity-input"]}
            id={`collection-${cycle.code}-${pack.code}`}
            max={2}
            min={0}
            name={pack.code}
            onChange={(evt) => {
              const val = Number.parseInt(evt.target.value, 10);
              if (!Number.isNaN(val)) onChange(pack.code, val);
            }}
            type="number"
            value={value}
          />
          <PackIcon code={pack.code} />
          <label htmlFor={`collection-${cycle.code}-${pack.code}`}>
            {pack.real_name}
          </label>
        </div>
      ) : (
        <Checkbox
          checked={!!value}
          data-pack={pack.code}
          id={`collection-${cycle.code}-${pack.code}`}
          label={
            <div className={css["collection-pack-label"]}>
              <PackIcon code={pack.code} />
              {pack.real_name}
            </div>
          }
          name={pack.code}
          onCheckedChange={(checked) => onChange(pack.code, checked ? 1 : 0)}
        />
      )}
    </li>
  );
}
