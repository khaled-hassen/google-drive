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

/**
 * A Button component that displays a button with an icon and a title.
 *
 * This component uses the `Icon` component to display an icon and the `cn` function from the `utils` library to conditionally apply CSS classes. It also uses the `LoadingSpinner` component to display a loading spinner when the button is loading.
 *
 * @property Icon - The icon component to be displayed.
 * @property iconParams - The parameters for the icon component.
 * @property title - The title of the button.
 * @property variant - The variant of the button. It can be "primary", "secondary", "tertiary", "danger", or "success".
 * @property titleClassName - Optional additional CSS classes to apply to the title.
 * @property loading - A boolean indicating whether the button is loading.
 *
 * @example
 * import Button from "./Button";
 * import PlusIcon from "../icons/PlusIcon";
 *
 * // In a React component
 * <Button
 *   Icon={PlusIcon}
 *   title="Add"
 *   variant="primary"
 *   loading={false}
 * />
 */
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
