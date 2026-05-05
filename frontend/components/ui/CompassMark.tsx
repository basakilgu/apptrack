// components/ui/CompassMark.tsx
import React from "react";
import Svg, { Path, Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { View } from "react-native";

type Variant = "filled" | "outline" | "glow-light" | "glow-dark";

interface Props {
  size?: number;
  variant?: Variant;
  color?: string;
  haloColor?: string;
}

export function CompassMark({ size = 64, variant = "filled", color = "#FAF8F4", haloColor = "#3D5A47" }: Props) {
  const needleHeight = size * 0.43;
  const needleWidth = size * 0.045;

  if (variant === "outline") {
    return (
      <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Circle cx={size / 2} cy={size / 2} r={size * 0.42} fill={haloColor} opacity={0.06} />
          <Circle cx={size / 2} cy={size / 2} r={size * 0.34} fill="none" stroke={haloColor} strokeWidth={0.8} opacity={0.4} />
          <Path d={`M ${size / 2} ${size / 2 - needleHeight} L ${size / 2 + needleWidth} ${size / 2} L ${size / 2} ${size / 2 + needleHeight} L ${size / 2 - needleWidth} ${size / 2} Z`} fill={haloColor} />
        </Svg>
      </View>
    );
  }

  if (variant === "glow-light" || variant === "glow-dark") {
    const isLight = variant === "glow-light";
    const haloOpacity = isLight ? 0.12 : 0.10;
    const ringOpacity = isLight ? 0.20 : 0.18;

    return (
      <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Defs>
            <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={haloColor} stopOpacity={haloOpacity * 1.5} />
              <Stop offset="100%" stopColor={haloColor} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={size / 2} cy={size / 2} r={size * 0.5} fill="url(#glow)" />
          <Circle cx={size / 2} cy={size / 2} r={size * 0.42} fill={haloColor} opacity={haloOpacity} />
          <Circle cx={size / 2} cy={size / 2} r={size * 0.34} fill="none" stroke={color} strokeWidth={0.8} opacity={ringOpacity} />
          {isLight && (
            <Circle cx={size / 2} cy={size / 2} r={size * 0.20} fill="none" stroke={color} strokeWidth={0.6} opacity={0.12} />
          )}
          <Path d={`M ${size / 2} ${size / 2 - needleHeight} L ${size / 2 + needleWidth} ${size / 2} L ${size / 2} ${size / 2 + needleHeight} L ${size / 2 - needleWidth} ${size / 2} Z`} fill={color} />
          <Circle cx={size / 2} cy={size / 2} r={size * 0.025} fill={isLight ? "#243530" : "#1A2622"} />
        </Svg>
      </View>
    );
  }

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Path d={`M ${size / 2} ${size / 2 - needleHeight} L ${size / 2 + needleWidth} ${size / 2} L ${size / 2} ${size / 2 + needleHeight} L ${size / 2 - needleWidth} ${size / 2} Z`} fill={color} />
      </Svg>
    </View>
  );
}
