import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import type { SettingProps } from "./types";

export function HideWeaknessSetting(props: SettingProps) {
  const { settings, updateSettings } = props;

  const onCheckHideWeaknesses = (val: boolean | string) => {
    updateSettings((settings) => ({
      ...settings,
      hideWeaknessesByDefault: !!val,
    }));
  };

  return (
    <Field
      bordered
      helpText={
        <>
          When this is checked, weaknesses are hidden in player card lists by
          default and need to be enabled in the <strong>Subtype</strong> filter
          to be visible.
        </>
      }
    >
      <Checkbox
        checked={settings.hideWeaknessesByDefault}
        label="Hide weaknesses in player card lists"
        id="hide-weaknesses-by-default"
        name="hide-weaknesses-by-default"
        onCheckedChange={onCheckHideWeaknesses}
      />
    </Field>
  );
}
