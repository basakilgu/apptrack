// components/ui/SwitchRow.tsx
import React from "react";
import { View, Text, Switch } from "react-native";

interface Props {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  isLast?: boolean;
  disabled?: boolean;
}

export function SwitchRow({ label, description, value, onValueChange, isLast = false, disabled = false }: Props) {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: isLast ? 0 : 0.5,
        borderColor: "rgba(235, 231, 223, 0.7)",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <View style={{ flex: 1, paddingRight: 12 }}>
        <Text style={{ fontSize: 14, color: "#1F1B16", fontFamily: "Inter_400Regular" }}>
          {label}
        </Text>
        {description ? (
          <Text style={{ fontSize: 11, color: "#8A8278", marginTop: 4, fontFamily: "Inter_400Regular", lineHeight: 16 }}>
            {description}
          </Text>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: "#D9D3C8", true: "#3D5A47" }}
        thumbColor="#FAF8F4"
      />
    </View>
  );
}
