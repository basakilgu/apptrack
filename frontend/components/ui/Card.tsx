// components/ui/Card.tsx
import React from "react";
import { Pressable, View, ViewStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  padding?: number;
}

export function Card({ children, onPress, style, padding }: Props) {
  const baseStyle: ViewStyle = {
    backgroundColor: "#FFFFFF",
    borderColor: "rgba(235, 231, 223, 0.7)",
    borderWidth: 0.5,
    borderRadius: 12,
    shadowColor: "#1F1B16",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
    padding,
    ...style,
  };

  if (!onPress) return <View style={baseStyle}>{children}</View>;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        ...baseStyle,
        opacity: pressed ? 0.96 : 1,
        transform: [{ scale: pressed ? 0.997 : 1 }],
      })}
    >
      {children}
    </Pressable>
  );
}
