import React from "react";
import { IconProps } from "../icons/IconProps.ts";

type Props = {
  title: string;
  Icon: React.FC<IconProps>;
};

const PageTitle: React.FC<Props> = ({ title, Icon }) => {
  return (
    <div className="flex items-center gap-4 border-b-2 border-b-lightGray pb-4 text-main">
      <Icon size={40} />
      <h1 className="text-4xl font-bold">{title}</h1>
    </div>
  );
};

export default PageTitle;
