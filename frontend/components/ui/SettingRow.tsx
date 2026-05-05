// components/ui/SettingRow.tsx
import React from "react";
import { Pressable, View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

interface Props {
  label: string;
  value?: string;
  onPress?: () => void;
  isLast?: boolean;
  destructive?: boolean;
  icon?: React.ReactNode;
}

function ChevronRight() {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14">
      <Path d="M 5 3 L 9 7 L 5 11" fill="none" stroke="#B8B0A4" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function SettingRow({ label, value, onPress, isLast = false, destructive = false, icon }: Props) {
  const content = (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: isLast ? 0 : 0.5,
        borderColor: "rgba(235, 231, 223, 0.7)",
        minHeight: 50,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        {icon ? <View style={{ marginRight: 12 }}>{icon}</View> : null}
        <Text
          style={{
            fontSize: 14,
            color: destructive ? "#A96458" : "#1F1B16",
            fontFamily: "Inter_400Regular",
          }}
        >
          {label}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {value ? (
          <Text style={{ fontSize: 13, color: "#8A8278", fontFamily: "Inter_400Regular", marginRight: onPress ? 8 : 0 }}>
            {value}
          </Text>
        ) : null}
        {onPress ? <ChevronRight /> : null}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.55 : 1 })}>
        {content}
      </Pressable>
    );
  }
  return content;
}
