// app/(auth)/login.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Svg, { Path } from "react-native-svg";

import { CompassMark } from "../../components/ui/CompassMark";

function MailIcon({ color = "#1F1B16" }: { color?: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18">
      <Path d="M 2.5 4.5 L 9 9.5 L 15.5 4.5 L 15.5 13.5 L 2.5 13.5 Z" fill="none" stroke={color} strokeWidth={1.4} strokeLinejoin="round" />
      <Path d="M 2.5 4.5 L 15.5 4.5" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}

function AppleLogo() {
  return (
    <Svg width={16} height={20} viewBox="0 0 16 20">
      <Path
        d="M 13 6.8 C 13 6.8 11.2 7.6 11.2 9.5 C 11.2 11.6 13 12.4 13 12.4 C 13 12.4 11.5 16.5 9.5 16.5 C 8.5 16.5 8 16 7 16 C 6 16 5.5 16.5 4.5 16.5 C 2.5 16.5 0.5 12 0.5 9 C 0.5 6 2.5 4.5 4.5 4.5 C 5.5 4.5 6.5 5 7 5 C 7.5 5 8.5 4.5 10 4.5 C 11.5 4.5 12.5 5.5 13 6.8 Z M 9 3.5 C 9.5 3 10 2.2 9.9 1.3 C 9 1.4 8 2 7.5 2.7 C 7 3.3 6.5 4 6.6 4.9 C 7.5 5 8.5 4.2 9 3.5 Z"
        fill="#FAF8F4"
      />
    </Svg>
  );
}

export default function LoginScreen() {
  const router = useRouter();

  const handleAppleSignIn = () => {
    router.replace("/(onboarding)");
  };

  const handleEmailSignIn = () => {
    router.replace("/(onboarding)");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF8F4" }}>
      <StatusBar style="dark" />
      <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1, paddingHorizontal: 28 }}>
        <View style={{ flex: 0.4 }} />

        {/* Brand */}
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: 64, height: 64, borderRadius: 16,
              backgroundColor: "#243530",
              alignItems: "center", justifyContent: "center",
              marginBottom: 20,
              shadowColor: "#1F1B16", shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12, shadowRadius: 8,
            }}
          >
            <CompassMark size={48} variant="filled" color="#FAF8F4" />
          </View>

          <Text style={{ fontSize: 22, color: "#1F1B16", fontFamily: "Inter_600SemiBold", letterSpacing: -0.4 }}>
            Applyze
          </Text>
          <Text
            style={{
              fontSize: 11, color: "#8A8278",
              marginTop: 6, letterSpacing: 1.4,
              fontFamily: "Inter_500Medium",
            }}
          >
            KARİYER PUSULASI
          </Text>
        </View>

        <View style={{ flex: 0.5 }} />

        {/* Editorial */}
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 22, color: "#1F1B16",
              fontFamily: "Inter_300Light",
              textAlign: "center", lineHeight: 30, letterSpacing: -0.3,
            }}
          >
            Yolculuğun başlasın.
          </Text>
          <Text
            style={{
              fontSize: 14, color: "#8A8278",
              textAlign: "center", marginTop: 10,
              fontFamily: "Inter_400Regular", lineHeight: 21, maxWidth: 280,
            }}
          >
            Hesabınla giriş yap, başvurularını organize et.
          </Text>
        </View>

        <View style={{ flex: 1 }} />

        {/* Auth buttons */}
        <View style={{ marginBottom: 12 }}>
          <Pressable
            onPress={handleAppleSignIn}
            style={({ pressed }) => ({
              height: 52, backgroundColor: "#1F1B16", borderRadius: 12,
              flexDirection: "row", alignItems: "center", justifyContent: "center",
              opacity: pressed ? 0.92 : 1,
              transform: [{ scale: pressed ? 0.99 : 1 }],
            })}
          >
            <AppleLogo />
            <Text style={{ fontSize: 15, color: "#FAF8F4", fontFamily: "Inter_500Medium", marginLeft: 10, letterSpacing: 0.1 }}>
              Apple ile giriş yap
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={handleEmailSignIn}
          style={({ pressed }) => ({
            height: 52, backgroundColor: "transparent", borderRadius: 12,
            borderWidth: 1, borderColor: "#D9D3C8",
            flexDirection: "row", alignItems: "center", justifyContent: "center",
            opacity: pressed ? 0.7 : 1,
            transform: [{ scale: pressed ? 0.99 : 1 }],
          })}
        >
          <MailIcon />
          <Text style={{ fontSize: 15, color: "#1F1B16", fontFamily: "Inter_500Medium", marginLeft: 10, letterSpacing: 0.1 }}>
            E-posta ile giriş yap
          </Text>
        </Pressable>

        {/* Privacy */}
        <Text
          style={{
            fontSize: 11, color: "#B8B0A4",
            textAlign: "center", marginTop: 20, marginBottom: 8,
            fontFamily: "Inter_400Regular", lineHeight: 16,
          }}
        >
          Devam ederek <Text style={{ color: "#5C5650" }}>Kullanım Koşulları</Text> ve{"\n"}
          <Text style={{ color: "#5C5650" }}>Gizlilik Politikası</Text>'nı kabul etmiş olursun.
        </Text>
      </SafeAreaView>
    </View>
  );
}
