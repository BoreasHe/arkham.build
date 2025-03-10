import { cx } from "@/utils/cx";
import { forwardRef } from "react";
import css from "./button.module.css";
import { DefaultTooltip } from "./tooltip";

export type Props<T extends "a" | "button" | "summary" | "label"> =
  React.ComponentProps<T> & {
    as?: T;
    children: React.ReactNode;
    className?: string;
    iconOnly?: boolean;
    variant?: "primary" | "secondary" | "bare";
    size?: "xs" | "sm" | "lg" | "full" | "none";
    tooltip?: React.ReactNode;
    round?: boolean;
  };

export const Button = forwardRef(function Button<
  T extends "a" | "button" | "summary" | "label",
>(props: Props<T>, ref: React.ForwardedRef<T>) {
  const {
    as,
    children,
    iconOnly,
    variant = "secondary",
    size,
    tooltip,
    round,
    ...rest
  } = props;
  // biome-ignore lint/suspicious/noExplicitAny: safe.
  const Element: any = as ?? "button";

  const button = (
    <Element
      {...rest}
      className={cx(
        css["button"],
        variant && css[variant],
        size && css[size],
        iconOnly && css["icon-only"],
        round && css["round"],
        rest.className,
      )}
      ref={ref}
    >
      {children}
    </Element>
  );

  return <DefaultTooltip tooltip={tooltip}>{button}</DefaultTooltip>;
});
