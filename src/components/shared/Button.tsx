import React from "react";
import { IconProps } from "../icons/IconProps.ts";
import { cn } from "../../lib/utils.ts";
import LoadingSpinner from "../icons/LoadingSpinner.tsx";

type Props = {
  Icon: React.FC<IconProps>;
  iconParams?: IconProps;
  title: string;
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "success";
  titleClassName?: string;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({
  Icon,
  iconParams,
  title,
  variant = "primary",
  className,
  titleClassName,
  loading,
  disabled,
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
          "btn-success": variant === "success",
        },
        className,
      )}
      disabled={loading || disabled}
      {...props}
    >
      <span>{loading ? <LoadingSpinner /> : <Icon {...iconParams} />}</span>
      <span className={titleClassName}>{title}</span>
    </button>
  );
};

export default Button;
