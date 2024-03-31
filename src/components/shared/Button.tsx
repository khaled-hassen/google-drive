import React from "react";
import { IconProps } from "../icons/IconProps.ts";
import { cn } from "../../lib/utils.ts";

type Props = {
  Icon: React.FC<IconProps>;
  iconParams?: IconProps;
  text: string;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  textClassName?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({
  Icon,
  iconParams,
  text,
  variant = "primary",
  className,
  textClassName,
  ...props
}) => {
  return (
    <button
      className={cn(
        "btn",
        {
          "btn-primary": variant === "primary",
          "btn-secondary": variant === "secondary",
          "btn-danger": variant === "danger",
          "btn-tertiary": variant === "tertiary",
        },
        className,
      )}
      {...props}
    >
      <Icon {...iconParams} />
      <span className={textClassName}>{text}</span>
    </button>
  );
};

export default Button;
