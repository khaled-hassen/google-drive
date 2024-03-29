import React from "react";
import { IconProps } from "../icons/IconProps.ts";
import { cn } from "../../lib/utils.ts";

type Props = {
  Icon: React.FC<IconProps>;
  iconParams?: IconProps;
  text: string;
  variant?: "primary" | "secondary" | "tertiary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({
  Icon,
  iconParams,
  text,
  variant = "primary",
  className,
  ...props
}) => {
  return (
    <button
      className={cn("btn", className, {
        "btn-primary": variant === "primary",
        "btn-secondary": variant === "secondary",
        "btn-tertiary": variant === "tertiary",
      })}
      {...props}
    >
      <Icon {...iconParams} />
      <span className="">{text}</span>
    </button>
  );
};

export default Button;
