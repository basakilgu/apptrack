// components/ui/SectionHeader.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";

interface Props {
  title: string;
  rightLabel?: string;
  onRightPress?: () => void;
  caps?: boolean;
}

export function SectionHeader({ title, rightLabel, onRightPress, caps = false }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          fontSize: caps ? 11 : 13,
          color: caps ? "#8A8278" : "#1F1B16",
          fontFamily: caps ? "Inter_500Medium" : "Inter_600SemiBold",
          letterSpacing: caps ? 0.8 : -0.1,
        }}
      >
        {caps ? title.toUpperCase() : title}
      </Text>
      {rightLabel && onRightPress ? (
        <Pressable onPress={onRightPress}>
          <Text style={{ fontSize: 12, color: "#3D5A47", fontFamily: "Inter_500Medium" }}>
            {rightLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
