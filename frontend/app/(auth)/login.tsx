// app/(auth)/login.tsx
import React, { useState } from "react";
import { View, Text, Pressable, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Svg, { Path } from "react-native-svg";

import { CompassMark } from "../../components/ui/CompassMark";
import { supabase } from "../../lib/supabase";

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

function BackIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20">
      <Path d="M 13 4 L 7 10 L 13 16" fill="none" stroke="#1F1B16" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

type Mode = "select" | "email-login" | "email-signup";

export default function LoginScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("select");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleEmailLogin = async () => {
    if (!email.trim() || !password) {
      setError("E-posta ve şifre gerekli.");
      return;
    }
    setLoading(true);
    setError(null);
    setInfo(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError(error.message === "Invalid login credentials"
        ? "E-posta veya şifre hatalı."
        : error.message);
      setLoading(false);
      return;
    }
    // Başarılı: root layout otomatik yönlendirecek
    setLoading(false);
  };

  const handleEmailSignup = async () => {
    if (!email.trim() || !password) {
      setError("E-posta ve şifre gerekli.");
      return;
    }
    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalı.");
      return;
    }
    setLoading(true);
    setError(null);
    setInfo(null);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      // Otomatik giriş yapıldı (email doğrulama kapalı)
      setLoading(false);
    } else {
      // Email doğrulama bekleniyor
      setInfo("Kaydın oluşturuldu. E-postanı doğrulamak için gelen kutunu kontrol et.");
      setLoading(false);
    }
  };

  // ============ EMAIL LOGIN/SIGNUP FORM ============
  if (mode === "email-login" || mode === "email-signup") {
    const isLogin = mode === "email-login";
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, backgroundColor: "#FAF8F4" }}
      >
        <StatusBar style="dark" />
        <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1, paddingHorizontal: 28 }}>
          {/* Back button */}
          <Pressable
            onPress={() => {
              setMode("select");
              setError(null);
              setInfo(null);
            }}
            style={{ paddingVertical: 12, marginTop: 4, alignSelf: "flex-start" }}
            hitSlop={10}
          >
            <BackIcon />
          </Pressable>

          <View style={{ flex: 0.2 }} />

          <Text
            style={{
              fontSize: 26, color: "#1F1B16",
              fontFamily: "Inter_600SemiBold", letterSpacing: -0.5,
              marginBottom: 8,
            }}
          >
            {isLogin ? "Tekrar hoşgeldin." : "Hesabını oluştur."}
          </Text>
          <Text
            style={{
              fontSize: 14, color: "#8A8278",
              fontFamily: "Inter_400Regular", lineHeight: 21,
              marginBottom: 32,
            }}
          >
            {isLogin ? "Yolculuğuna kaldığın yerden devam et." : "Pusulan seni bekliyor."}
          </Text>

          {/* Email */}
          <Text style={{ fontSize: 12, color: "#5C5650", fontFamily: "Inter_500Medium", marginBottom: 6 }}>
            E-posta
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="ornek@email.com"
            placeholderTextColor="#B8B0A4"
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            style={{
              height: 52, borderRadius: 12, paddingHorizontal: 16,
              backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#EBE7DF",
              fontSize: 15, color: "#1F1B16", fontFamily: "Inter_400Regular",
              marginBottom: 16,
            }}
          />

          {/* Password */}
          <Text style={{ fontSize: 12, color: "#5C5650", fontFamily: "Inter_500Medium", marginBottom: 6 }}>
            Şifre
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder={isLogin ? "Şifren" : "En az 6 karakter"}
            placeholderTextColor="#B8B0A4"
            secureTextEntry
            autoComplete={isLogin ? "current-password" : "new-password"}
            style={{
              height: 52, borderRadius: 12, paddingHorizontal: 16,
              backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#EBE7DF",
              fontSize: 15, color: "#1F1B16", fontFamily: "Inter_400Regular",
              marginBottom: 8,
            }}
          />

          {/* Error / Info */}
          {error && (
            <Text style={{ fontSize: 13, color: "#A8908F", fontFamily: "Inter_400Regular", marginBottom: 8, marginTop: 4 }}>
              {error}
            </Text>
          )}
          {info && (
            <Text style={{ fontSize: 13, color: "#3D5A47", fontFamily: "Inter_400Regular", marginBottom: 8, marginTop: 4 }}>
              {info}
            </Text>
          )}

          <View style={{ flex: 1 }} />

          {/* Primary action */}
          <Pressable
            onPress={isLogin ? handleEmailLogin : handleEmailSignup}
            disabled={loading}
            style={({ pressed }) => ({
              height: 52, backgroundColor: "#1F1B16", borderRadius: 12,
              alignItems: "center", justifyContent: "center",
              opacity: loading ? 0.6 : pressed ? 0.92 : 1,
              transform: [{ scale: pressed ? 0.99 : 1 }],
              marginBottom: 12,
            })}
          >
            {loading ? (
              <ActivityIndicator color="#FAF8F4" />
            ) : (
              <Text style={{ fontSize: 15, color: "#FAF8F4", fontFamily: "Inter_500Medium" }}>
                {isLogin ? "Giriş yap" : "Hesap oluştur"}
              </Text>
            )}
          </Pressable>

          {/* Toggle */}
          <Pressable
            onPress={() => {
              setMode(isLogin ? "email-signup" : "email-login");
              setError(null);
              setInfo(null);
            }}
            style={{ alignItems: "center", paddingVertical: 12 }}
          >
            <Text style={{ fontSize: 13, color: "#5C5650", fontFamily: "Inter_400Regular" }}>
              {isLogin
                ? "Hesabın yok mu? Oluştur"
                : "Zaten hesabın var mı? Giriş yap"}
            </Text>
          </Pressable>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }

  // ============ SELECT MODE (anaekran) ============
  return (
    <View style={{ flex: 1, backgroundColor: "#FAF8F4" }}>
      <StatusBar style="dark" />
      <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1, paddingHorizontal: 28 }}>
        <View style={{ flex: 0.4 }} />

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
          <Text style={{ fontSize: 11, color: "#8A8278", marginTop: 6, letterSpacing: 1.4, fontFamily: "Inter_500Medium" }}>
            KARİYER PUSULASI
          </Text>
        </View>

        <View style={{ flex: 0.5 }} />

        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 22, color: "#1F1B16", fontFamily: "Inter_300Light", textAlign: "center", lineHeight: 30, letterSpacing: -0.3 }}>
            Yolculuğun başlasın.
          </Text>
          <Text style={{ fontSize: 14, color: "#8A8278", textAlign: "center", marginTop: 10, fontFamily: "Inter_400Regular", lineHeight: 21, maxWidth: 280 }}>
            Hesabınla giriş yap, başvurularını organize et.
          </Text>
        </View>

        <View style={{ flex: 1 }} />

        {/* Apple — şimdilik disabled */}
        <View style={{ marginBottom: 12 }}>
          <Pressable
            onPress={() => setError("Apple ile giriş yakında.")}
            style={({ pressed }) => ({
              height: 52, backgroundColor: "#1F1B16", borderRadius: 12,
              flexDirection: "row", alignItems: "center", justifyContent: "center",
              opacity: pressed ? 0.92 : 0.5,
            })}
          >
            <AppleLogo />
            <Text style={{ fontSize: 15, color: "#FAF8F4", fontFamily: "Inter_500Medium", marginLeft: 10, letterSpacing: 0.1 }}>
              Apple ile giriş yap
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => setMode("email-login")}
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

        {error && (
          <Text style={{ fontSize: 12, color: "#A8908F", textAlign: "center", marginTop: 12, fontFamily: "Inter_400Regular" }}>
            {error}
          </Text>
        )}

        <Text style={{ fontSize: 11, color: "#B8B0A4", textAlign: "center", marginTop: 20, marginBottom: 8, fontFamily: "Inter_400Regular", lineHeight: 16 }}>
          Devam ederek <Text style={{ color: "#5C5650" }}>Kullanım Koşulları</Text> ve{"\n"}
          <Text style={{ color: "#5C5650" }}>Gizlilik Politikası</Text>'nı kabul etmiş olursun.
        </Text>
      </SafeAreaView>
    </View>
  );
}