// components/ui/Tag.tsx
import React from "react";
import { Pressable, Text } from "react-native";

interface Props {
  label: string;
  count?: number;
  active?: boolean;
  onPress?: () => void;
}

export function Tag({ label, count, active = false, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        height: 32,
        borderRadius: 16,
        backgroundColor: active ? "#3D5A47" : "#F4F1EB",
        marginRight: 8,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <Text
        style={{
          fontSize: 13,
          color: active ? "#FAF8F4" : "#5C5650",
          fontFamily: active ? "Inter_500Medium" : "Inter_400Regular",
          letterSpacing: 0.1,
        }}
      >
        {label}
      </Text>
      {count !== undefined && (
        <Text
          style={{
            fontSize: 12, marginLeft: 6,
            color: active ? "#FAF8F4" : "#8A8278",
            opacity: active ? 0.85 : 1,
            fontFamily: "Menlo",
          }}
        >
          {count}
        </Text>
      )}
    </Pressable>
  );
}
