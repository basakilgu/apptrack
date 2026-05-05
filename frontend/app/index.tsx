// app/index.tsx — Splash
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { CompassMark } from "../components/ui/CompassMark";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 1800);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={{ flex: 1, backgroundColor: "#1A2622", alignItems: "center", justifyContent: "center" }}>
      <StatusBar style="light" />

      {/* App icon */}
      <View
        style={{
          width: 88, height: 88, borderRadius: 22,
          backgroundColor: "#243530",
          alignItems: "center", justifyContent: "center",
          marginBottom: 28,
          shadowColor: "#000", shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3, shadowRadius: 16,
        }}
      >
        <CompassMark size={64} variant="filled" color="#FAF8F4" />
      </View>

      {/* Brand */}
      <Text style={{ fontSize: 26, color: "#FAF8F4", fontFamily: "Inter_300Light", letterSpacing: -0.5 }}>
        Applyze
      </Text>

      <Text
        style={{
          fontSize: 10, color: "#8A8278",
          marginTop: 8, letterSpacing: 1.6,
          fontFamily: "Inter_500Medium",
        }}
      >
        KARİYER PUSULASI
      </Text>
    </View>
  );
}
