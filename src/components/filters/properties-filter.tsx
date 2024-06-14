import { useStore } from "@/store";
import { Checkbox } from "../ui/checkbox";
import { CheckboxGroup } from "../ui/checkboxgroup";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { useCallback } from "react";
import {
  selectActiveCardType,
  selectActiveProperties,
} from "@/store/selectors/filters";
import { PropertiesFilter as PropertiesFilterT } from "@/store/slices/filters/types";

const properties = [
  { key: "bonded", label: "Bonded" },
  { key: "fast", label: "Fast" },
  { key: "customizable", label: "Customizable" },
  { key: "permanent", label: "Permanent" },
  { key: "exile", label: "Exile" },
  { key: "seal", label: "Seal" },
  { key: "victory", label: "Victory" },
  {
    key: "unique",
    label: <>Unique (&#10040;)</>,
  },
];

export function PropertiesFilter() {
  const cardType = useStore(selectActiveCardType);
  const activeProperties = useStore(selectActiveProperties);
  const setFilter = useStore((state) => state.setActiveFilter);

  const onPropertyChange = useCallback(
    (key: keyof PropertiesFilterT, val: boolean) => {
      setFilter(cardType, "properties", key, val);
    },
    [setFilter, cardType],
  );

  return (
    <Collapsible title="Properties" defaultOpen>
      <CollapsibleContent>
        <CheckboxGroup>
          {properties.map(({ key, label }) => (
            <Checkbox
              data-key={key}
              key={key}
              label={label}
              id={`property-${key}`}
              onCheckedChange={(val) =>
                onPropertyChange(key as keyof PropertiesFilterT, !!val)
              }
              checked={activeProperties[key as keyof PropertiesFilterT]}
            />
          ))}
        </CheckboxGroup>
      </CollapsibleContent>
    </Collapsible>
  );
}
