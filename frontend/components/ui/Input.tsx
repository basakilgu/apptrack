// components/ui/Input.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";

interface Props extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
  multiline?: boolean;
  height?: number;
}

export function Input({
  label, error, helper, required = false, multiline = false, height, ...rest
}: Props) {
  const [focused, setFocused] = useState(false);
  let borderColor = "#D9D3C8";
  if (focused) borderColor = "#3D5A47";
  if (error) borderColor = "#A96458";

  return (
    <View style={{ width: "100%", marginBottom: 16 }}>
      {label ? (
        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <Text style={{ fontSize: 12, color: "#5C5650", fontFamily: "Inter_500Medium", letterSpacing: 0.2 }}>
            {label}
          </Text>
          {required && <Text style={{ fontSize: 12, color: "#A96458", marginLeft: 4 }}>*</Text>}
        </View>
      ) : null}

      <TextInput
        {...rest}
        multiline={multiline}
        onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
        placeholderTextColor="#B8B0A4"
        style={{
          minHeight: height ?? (multiline ? 110 : 48),
          borderRadius: 10,
          borderWidth: 1,
          borderColor,
          backgroundColor: "#FFFFFF",
          paddingHorizontal: 14,
          paddingVertical: multiline ? 12 : 12,
          fontSize: 14,
          color: "#1F1B16",
          fontFamily: "Inter_400Regular",
          textAlignVertical: multiline ? "top" : "center",
        }}
      />

      {(error || helper) && (
        <Text
          style={{
            fontSize: 11, marginTop: 6,
            color: error ? "#A96458" : "#8A8278",
            fontFamily: "Inter_400Regular",
            lineHeight: 16,
          }}
        >
          {error || helper}
        </Text>
      )}
    </View>
  );
}
