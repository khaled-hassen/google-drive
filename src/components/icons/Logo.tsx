import React from "react";
import { IconProps } from "./IconProps.ts";

const Logo: React.FC<IconProps> = ({ color = "blue" }) => {
  return (
    <svg
      width="57"
      height="49"
      viewBox="0 0 57 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.929 2.83127L26.8527 19.8868L9.9237 49L0 31.9473L16.929 2.83127ZM23.1306 31.9473H57L47.0763 49H13.2098L23.1306 31.9473ZM35.5081 29.1189L18.5763 0H38.4237L55.3527 29.1189H35.5081Z"
        fill={color === "blue" ? "#2262C6" : "#FEFEFE"}
      />
    </svg>
  );
};

export default Logo;