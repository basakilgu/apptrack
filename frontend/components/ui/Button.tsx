// components/ui/Button.tsx
import React from "react";
import { Pressable, Text, View, ActivityIndicator } from "react-native";

type Variant = "primary" | "secondary" | "ghost" | "light-on-dark" | "danger";
type Size = "sm" | "md" | "lg";

interface Props {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  label, onPress, variant = "primary", size = "md", loading = false,
  disabled = false, icon, fullWidth = false,
}: Props) {
  const isDisabled = disabled || loading;

  const heights = { sm: 36, md: 44, lg: 50 };
  const paddings = { sm: 14, md: 18, lg: 22 };
  const fontSizes = { sm: 13, md: 14, lg: 15 };

  const height = heights[size];
  const px = paddings[size];
  const fontSize = fontSizes[size];

  let bg = "#3D5A47";
  let textColor = "#FAF8F4";
  let borderColor = "transparent";
  let borderWidth = 0;

  if (variant === "secondary") {
    bg = "transparent"; textColor = "#1F1B16"; borderColor = "#D9D3C8"; borderWidth = 1;
  } else if (variant === "ghost") {
    bg = "transparent"; textColor = "#5C5650";
  } else if (variant === "light-on-dark") {
    bg = "#FAF8F4"; textColor = "#1F1B16";
  } else if (variant === "danger") {
    bg = "transparent"; textColor = "#A96458"; borderColor = "#E8D8D8"; borderWidth = 1;
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => ({
        height, paddingHorizontal: px,
        backgroundColor: bg, borderColor, borderWidth,
        borderRadius: 10,
        alignItems: "center", justifyContent: "center",
        flexDirection: "row",
        alignSelf: fullWidth ? "stretch" : "flex-start",
        opacity: isDisabled ? 0.45 : 1,
        transform: [{ scale: pressed && !isDisabled ? 0.98 : 1 }],
      })}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <>
          {icon ? <View style={{ marginRight: 8 }}>{icon}</View> : null}
          <Text style={{ fontSize, color: textColor, fontFamily: "Inter_500Medium", letterSpacing: 0.1 }}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}
