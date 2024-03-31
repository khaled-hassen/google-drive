import React from "react";
import { Tooltip } from "react-tooltip";
import { cn } from "../../lib/utils.ts";

type Props = {
  id: string;
  name: string;
  imgUrl: string | undefined;
  className?: string;
};

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
