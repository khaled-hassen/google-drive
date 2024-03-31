import React from "react";
import { IconProps } from "./IconProps.ts";

const ExcelIcon: React.FC<IconProps> = ({}) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_6_1123)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.222 0.5H1.778C0.8 0.5 0.008 1.3 0.008 2.278L0 4.944V14.722C0 15.7 0.8 16.5 1.778 16.5H14.222C15.2 16.5 16 15.7 16 14.722V2.278C16 1.3 15.2 0.5 14.222 0.5ZM14.222 7.611H7.112V14.722H5.332V7.612H1.778V5.832H5.333V2.278H7.111V5.833H14.222V7.611Z"
          fill="#34A853"
        />
      </g>
      <defs>
        <clipPath id="clip0_6_1123">
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

export default ExcelIcon;
