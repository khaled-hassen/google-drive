import React from "react";
import { IconProps } from "./IconProps.ts";

const DarkModeIcon: React.FC<IconProps> = ({}) => {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.19975 0.829833C7.31658 0.970835 7.38815 1.14319 7.40525 1.32474C7.42236 1.5063 7.38422 1.68878 7.29574 1.84872C6.60161 3.10909 6.23929 4.52212 6.24218 5.95754C6.24218 10.7325 10.1756 14.5991 15.0235 14.5991C15.657 14.5983 16.2702 14.535 16.863 14.4091C17.0443 14.3707 17.2331 14.3858 17.4058 14.4525C17.5786 14.5192 17.7278 14.6346 17.835 14.7844C17.9483 14.9402 18.0062 15.1289 17.9995 15.3209C17.9927 15.5128 17.9218 15.6971 17.7978 15.8448C16.8566 16.9888 15.6693 17.9106 14.3224 18.543C12.9756 19.1753 11.5032 19.5022 10.0124 19.5C4.48064 19.5 0 15.0895 0 9.65547C0 5.56565 2.53671 2.05773 6.14858 0.570955C6.32844 0.49531 6.52829 0.479657 6.71793 0.526361C6.90757 0.573065 7.07669 0.679589 7.19975 0.829833ZM5.82939 2.05654C4.44065 2.79389 3.27968 3.88977 2.46984 5.22774C1.66 6.56572 1.23153 8.09582 1.22996 9.65547C1.22996 14.4293 5.16462 18.2958 10.0124 18.2958C11.1733 18.2976 12.323 18.0716 13.395 17.6309C14.4671 17.1902 15.4402 16.5436 16.2582 15.7284C15.8534 15.7783 15.4419 15.8032 15.0235 15.8032C9.49167 15.8032 5.01222 11.3928 5.01222 5.95872C5.01222 4.57289 5.30261 3.25356 5.82939 2.05654Z"
        fill="#0F1215"
      />
    </svg>
  );
};

export default DarkModeIcon;