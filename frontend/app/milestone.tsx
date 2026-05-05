// app/milestone.tsx — Milestone (Anlamlı an)
import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, Animated, Easing } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { CompassMark } from "../components/ui/CompassMark";
import { Header } from "../components/ui/Header";

export default function MilestoneScreen() {
  const router = useRouter();
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, [fade, scale]);

  return (
    <View style={{ flex: 1, backgroundColor: "#1A2622" }}>
      <StatusBar style="light" />
      <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
        <Header
          title=""
          showBack={false}
          showClose
          variant="dark"
        />

        <View style={{ flex: 1, paddingHorizontal: 32, alignItems: "center" }}>
          <View style={{ flex: 0.4 }} />

          {/* Tagline */}
          <Animated.Text
            style={{
              fontSize: 11, color: "#B8C9BD",
              letterSpacing: 3.2,
              fontFamily: "Inter_500Medium",
              marginBottom: 36,
              opacity: fade,
            }}
          >
            BİR AN
          </Animated.Text>

          {/* Compass */}
          <Animated.View style={{ opacity: fade, transform: [{ scale }] }}>
            <CompassMark size={110} variant="glow-dark" color="#FAF8F4" haloColor="#3D5A47" />
          </Animated.View>

          {/* Headline — italic poetic */}
          <Animated.View style={{ marginTop: 56, opacity: fade }}>
            <Text
              style={{
                fontSize: 12, color: "#B8C9BD",
                letterSpacing: 2.4, textAlign: "center",
                fontFamily: "Inter_500Medium",
                marginBottom: 18,
              }}
            >
              YENİ MÜLAKAT
            </Text>

            <Text
              style={{
                fontSize: 36, color: "#FAF8F4",
                fontFamily: "Inter_300Light",
                textAlign: "center",
                lineHeight: 46, letterSpacing: -0.5,
              }}
            >
              İlk açılan kapı.
            </Text>
          </Animated.View>

          {/* Subtitle */}
          <Animated.View style={{ marginTop: 24, opacity: fade }}>
            <Text
              style={{
                fontSize: 14, color: "#B8B0A4",
                textAlign: "center",
                fontFamily: "Inter_400Regular",
                lineHeight: 21, maxWidth: 290,
              }}
            >
              Süreç ilerliyor. Yolun bir aşamasını daha geçtin —{"\n"}
              pusulan yön bulmaya başladı.
            </Text>
          </Animated.View>

          <View style={{ flex: 1 }} />

          {/* CTA */}
          <Animated.View style={{ width: "100%", paddingBottom: 16, opacity: fade }}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                height: 52, backgroundColor: "#FAF8F4", borderRadius: 12,
                alignItems: "center", justifyContent: "center",
                opacity: pressed ? 0.92 : 1,
                transform: [{ scale: pressed ? 0.99 : 1 }],
              })}
            >
              <Text
                style={{
                  fontSize: 15, color: "#1F1B16",
                  fontFamily: "Inter_500Medium", letterSpacing: 0.1,
                }}
              >
                Yolculuğuma bak
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}
