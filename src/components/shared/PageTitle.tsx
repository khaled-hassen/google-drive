import React from "react";
import { IconProps } from "../icons/IconProps.ts";
import { cn } from "../../lib/utils.ts";

type Props = {
  title: string;
  Icon: React.FC<IconProps>;
  onTitleClick?(): void;
};

/**
 * A PageTitle component that displays a page title with an icon.
 *
 * This component uses the `Icon` component to display an icon next to the title. It also supports an optional `onTitleClick` function that is called when the title is clicked.
 *
 * @property title - The title to display.
 * @property Icon - The icon to display next to the title.
 * @property onTitleClick - Optional. A function that is called when the title is clicked.
 *
 * @example
 * import PageTitle from "./PageTitle";
 * import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
 *
 * // In a React component
 * <PageTitle
 *   title="Home"
 *   Icon={HomeIcon}
 *   onTitleClick={() => console.log("Title clicked")}
 * />
 */
const PageTitle: React.FC<Props> = ({ title, Icon, onTitleClick }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 border-b-2 border-b-lightGray pb-4 text-main",
        { "cursor-pointer": !!onTitleClick },
      )}
      onClick={onTitleClick}
      role={onTitleClick ? "button" : undefined}
    >
      <Icon size={40} />
      <h1 className="text-4xl font-bold">{title}</h1>
    </div>
  );
};

export default PageTitle;
