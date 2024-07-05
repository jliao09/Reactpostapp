import * as React from "react";
const SVGComponent = (props) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    enableBackground="new 0 0 32 32"
    xmlSpace="preserve"
    {...props}
  >
    <circle
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      cx={16}
      cy={16}
      r={12}
    />
    <path
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M20.4,13.9c-0.8-1.7-2.5-2.9-4.5-2.9 c-2.8,0-5,2.2-5,5c0,2.8,2.2,5,5,5c2,0,3.7-1.2,4.5-2.9"
    />
  </svg>
);
export default SVGComponent;
