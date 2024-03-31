import React from "react";
import { IconProps } from "./IconProps.ts";

const PdfIcon: React.FC<IconProps> = ({}) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_6_1187)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.778 0.5H14.222C15.2 0.5 16 1.3 16 2.278V14.722C16 15.7 15.2 16.5 14.222 16.5H1.778C0.8 16.5 0 15.7 0 14.722V2.278C0 1.3 0.8 0.5 1.778 0.5ZM4.444 8.056H3.556V7.166H4.444V8.056ZM5.778 8.056C5.778 8.793 5.182 9.389 4.444 9.389H3.556V11.167H2.222V5.833H4.444C5.182 5.833 5.778 6.429 5.778 7.167V8.056ZM12.444 7.166H14.667V5.834H11.11V11.168H12.443V9.389H13.777V8.056H12.443V7.166H12.444ZM10.222 9.833C10.222 10.571 9.627 11.167 8.889 11.167H6.667V5.833H8.889C9.627 5.833 10.222 6.429 10.222 7.167V9.833ZM8.889 9.833H8V7.167H8.889V9.833Z"
          fill="#EA4335"
        />
      </g>
      <defs>
        <clipPath id="clip0_6_1187">
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

export default PdfIcon;
