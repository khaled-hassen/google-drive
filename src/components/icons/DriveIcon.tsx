import React from "react";
import { IconProps } from "./IconProps.ts";

const DriveIcon: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      width={size ? size + 2 : 31}
      height={size || 19}
      viewBox="0 0 31 19"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.71875 15.2C8.97568 15.2 9.22208 15.0999 9.40376 14.9218C9.58543 14.7436 9.6875 14.502 9.6875 14.25C9.6875 13.998 9.58543 13.7564 9.40376 13.5782C9.22208 13.4001 8.97568 13.3 8.71875 13.3C8.46182 13.3 8.21542 13.4001 8.03374 13.5782C7.85207 13.7564 7.75 13.998 7.75 14.25C7.75 14.502 7.85207 14.7436 8.03374 14.9218C8.21542 15.0999 8.46182 15.2 8.71875 15.2ZM5.8125 14.25C5.8125 14.502 5.71044 14.7436 5.52876 14.9218C5.34708 15.0999 5.10068 15.2 4.84375 15.2C4.58682 15.2 4.34042 15.0999 4.15874 14.9218C3.97706 14.7436 3.875 14.502 3.875 14.25C3.875 13.998 3.97706 13.7564 4.15874 13.5782C4.34042 13.4001 4.58682 13.3 4.84375 13.3C5.10068 13.3 5.34708 13.4001 5.52876 13.5782C5.71044 13.7564 5.8125 13.998 5.8125 14.25Z"
        fillRule="evenodd"
      />
      <path
        d="M31 15.2C31 16.2078 30.5917 17.1744 29.865 17.887C29.1383 18.5996 28.1527 19 27.125 19H3.875C2.84729 19 1.86166 18.5996 1.13496 17.887C0.408258 17.1744 0 16.2078 0 15.2V12.369C0 11.5748 0.203438 10.792 0.590937 10.0947L5.38044 1.4858C5.6304 1.03617 5.99929 0.660898 6.44832 0.399439C6.89734 0.137981 7.40991 -1.68498e-06 7.93213 0H23.0679C23.5901 -1.68498e-06 24.1027 0.137981 24.5517 0.399439C25.0007 0.660898 25.3696 1.03617 25.6196 1.4858L30.4091 10.0928C30.7966 10.792 31 11.5748 31 12.369V15.2ZM7.08156 2.394L3.0845 9.5817C3.34025 9.52723 3.60375 9.5 3.875 9.5H27.125C27.3962 9.5 27.6598 9.5266 27.9155 9.5798L23.9184 2.394C23.8349 2.24436 23.7119 2.11952 23.5622 2.0326C23.4126 1.94568 23.2418 1.89988 23.0679 1.9H7.93213C7.75785 1.89953 7.58668 1.94518 7.43665 2.03212C7.28661 2.11906 7.16521 2.24408 7.08156 2.394ZM1.9375 13.3V15.2C1.9375 15.7039 2.14163 16.1872 2.50498 16.5435C2.86833 16.8998 3.36114 17.1 3.875 17.1H27.125C27.6389 17.1 28.1317 16.8998 28.495 16.5435C28.8584 16.1872 29.0625 15.7039 29.0625 15.2V13.3C29.0625 12.7961 28.8584 12.3128 28.495 11.9565C28.1317 11.6002 27.6389 11.4 27.125 11.4H3.875C3.36114 11.4 2.86833 11.6002 2.50498 11.9565C2.14163 12.3128 1.9375 12.7961 1.9375 13.3Z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default DriveIcon;
