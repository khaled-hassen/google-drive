import React from "react";
import { Tooltip } from "react-tooltip";
import { cn } from "../../lib/utils.ts";

type Props = {
  id: string;
  name: string;
  imgUrl: string | undefined;
  className?: string;
};

/**
 * An Avatar component that displays a user's avatar.
 *
 * This component uses the `Tooltip` component from `react-tooltip` to display a tooltip with the user's name when the avatar is hovered over. It also uses the `cn` function from the `utils` library to conditionally apply CSS classes.
 *
 * @property id - A unique identifier for the avatar.
 * @property name - The name of the user.
 * @property imgUrl - The URL of the user's avatar image.
 * @property className - Optional additional CSS classes to apply to the avatar.
 *
 * @example
 * import Avatar from "./Avatar";
 *
 * // In a React component
 * <Avatar
 *   id="user-1"
 *   name="John Doe"
 *   imgUrl="https://example.com/john-doe.jpg"
 * />
 */
const Avatar: React.FC<Props> = ({ id, name, imgUrl, className }) => {
  return (
    <>
      <img
        id={id}
        src={imgUrl}
        alt=""
        className={cn("size-10 rounded-full object-cover", className)}
      />
      <Tooltip
        anchorSelect={`#${id}`}
        content={name}
        className="!z-[999] !rounded-full"
      />
    </>
  );
};

export default Avatar;
