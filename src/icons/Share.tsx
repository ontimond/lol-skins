import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.785 14.108h-8.47v-8.47h4.48l1.881-1.883H1.373a.944.944 0 0 0-.941.941V15.05c0 .518.423.942.94.942h10.354a.944.944 0 0 0 .941-.942V7.755l-1.882 1.883v4.47ZM14.549.932H9.844a.944.944 0 0 0-.942.94c0 .519.424.942.942.942h2.437L7.302 7.793a.94.94 0 0 0-.282.668.944.944 0 0 0 1.61.668l4.978-4.978v2.437c0 .518.424.941.941.941a.944.944 0 0 0 .942-.94V1.881a.946.946 0 0 0-.942-.95Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgComponent;
