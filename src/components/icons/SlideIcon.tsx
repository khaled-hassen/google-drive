import React from "react";
import { IconProps } from "./IconProps.ts";

const SlideIcon: React.FC<IconProps> = ({}) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_6_1189)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.213 0.5H1.77C0.79 0.5 0 1.3 0 2.278V14.722C0 15.7 0.791 16.5 1.769 16.5H14.213C15.191 16.5 15.991 15.7 15.991 14.722V2.278C15.991 1.3 15.191 0.5 14.213 0.5ZM14.213 12.056H1.77V4.944H14.214L14.213 12.056Z"
          fill="#FBBC04"
        />
      </g>
      <defs>
        <clipPath id="clip0_6_1189">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SlideIcon;
