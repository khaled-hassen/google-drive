import React from "react";
import { IconProps } from "../icons/IconProps.ts";
import { cn } from "../../lib/utils.ts";

type Props = {
  title: string;
  Icon: React.FC<IconProps>;
  onTitleClick?(): void;
};

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
