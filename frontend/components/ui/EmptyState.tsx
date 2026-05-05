// components/ui/EmptyState.tsx
import React from "react";
import { View, Text } from "react-native";
import { CompassMark } from "./CompassMark";
import { Button } from "./Button";

interface Props {
  headline: string;
  subline?: string;
  ctaLabel?: string;
  onCtaPress?: () => void;
}

export function EmptyState({ headline, subline, ctaLabel, onCtaPress }: Props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, minHeight: 320 }}>
      <CompassMark size={72} variant="outline" haloColor="#3D5A47" />

      <Text
        style={{
          fontSize: 19, color: "#1F1B16",
          marginTop: 24, textAlign: "center",
          fontFamily: "Inter_300Light",
          lineHeight: 26, letterSpacing: -0.2,
        }}
      >
        {headline}
      </Text>

      {subline ? (
        <Text
          style={{
            fontSize: 13, color: "#8A8278",
            marginTop: 10, textAlign: "center",
            maxWidth: 280, fontFamily: "Inter_400Regular",
            lineHeight: 19,
          }}
        >
          {subline}
        </Text>
      ) : null}

      {ctaLabel && onCtaPress ? (
        <View style={{ marginTop: 28 }}>
          <Button label={ctaLabel} onPress={onCtaPress} variant="primary" size="lg" />
        </View>
      ) : null}
    </View>
  );
}
