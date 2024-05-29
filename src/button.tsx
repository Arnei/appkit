import React from "react";
import { Interpolation, Theme } from "@emotion/react";
import { focusStyle, match, useAppkitConfig } from ".";

/**
 * A mostly unstyled button used to build buttons. Always use this instead of
 * `<button>`.
 */
export const ProtoButton = React.forwardRef<HTMLButtonElement, JSX.IntrinsicElements["button"]>(
  ({ children, ...rest }, ref) => <button
    type="button"
    ref={ref}
    css={{
      border: "none",
      padding: 0,
      background: "none",
      color: "inherit",
      ":not([disabled])": {
        cursor: "pointer",
      },
    }}
    {...rest}
  >{children}</button>,
);

/** The kind of buttons a "Button" can be. Used for styling */
export type Kind = "normal" | "danger" | "call-to-action";

type ButtonProps = JSX.IntrinsicElements["button"] & {
    kind?: Kind;
    extraCss?: Interpolation<Theme>;
};

/** A styled button */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ kind = "normal", extraCss, children, ...rest }, ref) => (
    <button ref={ref} type="button" css={css(kind, extraCss)} {...rest}>{children}</button>
  ),
);

/**
 * Returns css for different types of buttons.
 * Comes in the kinds "normal", "danger" and "happy".
 */
const css = (kind: Kind, extraCss: Interpolation<Theme> = {}): Interpolation<Theme> => {
  const config = useAppkitConfig();

  const notDisabledStyle = match(kind, {
    "normal": () => ({
      border: `1px solid ${config.colors.neutral40}`,
      color: config.colors.neutral90,
      "&:hover, &:focus-visible": {
        border: `1px solid ${config.colors.neutral60}`,
        backgroundColor: config.colors.neutral15,
      },
    }),

    "danger": () => ({
      border: `1px solid ${config.colors.danger4}`,
      color: config.colors.danger4,
      "&:hover, &:focus-visible": {
        border: `1px solid ${config.colors.danger5}`,
        backgroundColor: config.colors.danger4,
        color: config.colors.danger0BwInverted,  // danger0BwInverted
      },
    }),

    "call-to-action": () => ({
      border: `1px solid ${config.colors.happy5}`,
      color: config.colors.happy4BwInverted, // happy0BwInverted
      backgroundColor: config.colors.happy4,
      "&:hover, &:focus-visible": {
        border: `1px solid ${config.colors.happy6}`,
        backgroundColor: config.colors.happy5,
        color: config.colors.happy5BwInverted,  // happy1BwInverted
      },
    }),
  });

  return {
    borderRadius: 8,
    display: "inline-flex",
    alignItems: "center",
    padding: "7px 14px",
    gap: 12,
    whiteSpace: "nowrap",
    backgroundColor: config.colors.neutral10,
    transition: "background-color 0.15s, border-color 0.15s",
    textDecoration: "none",
    "& > svg": {
      fontSize: 20,
    },
    "&:disabled": {
      border: `1px solid ${config.colors.neutral25}`,
      color: config.colors.neutral40,
    },
    "&:not([disabled])": {
      cursor: "pointer",
      ...notDisabledStyle,
      ...focusStyle(config, { offset: -1 }),
    },
    ...extraCss as Record<string, unknown>,
  };
};

export const buttonStyle = css;
