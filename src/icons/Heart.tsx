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
      d="M16 5.095c0-2.255-1.88-4.083-4.2-4.083-1.682 0-3.13.964-3.8 2.352a4.206 4.206 0 0 0-3.8-2.352C1.88 1.012 0 2.84 0 5.095c0 .066.007.13.01.195H.004c.001.046.01.095.014.142.003.047.008.095.013.142.07.8.321 1.663.824 2.572C2.073 10.355 4.232 12.018 8 15c3.767-2.982 5.926-4.647 7.144-6.854.501-.905.752-1.766.823-2.562.007-.055.012-.11.016-.164.003-.043.012-.088.013-.13h-.006c.003-.066.01-.13.01-.195Z"
      fill={props.fill || "#fff"}
    />
  </Svg>
);

export default SvgComponent;
