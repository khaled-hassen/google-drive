import React from "react";
import { IconProps } from "../icons/IconProps.ts";
import { cn } from "../../lib/utils.ts";

type Props = {
  Icon: React.FC<IconProps>;
  iconParams?: IconProps;
  text: string;
  variant?: "primary" | "secondary" | "danger";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({
  Icon,
  iconParams,
  text,
  variant = "primary",
  className,
  ...props
}) => {
  function getButtonColor() {
    if (variant === "primary") return "blue";
    if (variant === "secondary") return "white";
  }

  return (
    <button
      className={cn(
        "btn",
        {
          "btn-primary": variant === "primary",
          "btn-secondary": variant === "secondary",
          "btn-danger": variant === "danger",
        },
        className,
      )}
      {...props}
    >
      <Icon color={getButtonColor()} {...iconParams} />
      <span className="">{text}</span>
    </button>
  );
};

export default Button;
