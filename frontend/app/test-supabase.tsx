import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { supabase } from "../lib/supabase";
import type { Session } from "@supabase/supabase-js";

type Application = {
  id: string;
  company_name: string;
  position: string;
  platform: string | null;
  applied_at: string;
};

export default function TestSupabase() {
  // Auth state
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("test@applyze.com");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Data state
  const [applications, setApplications] = useState<Application[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);

  // Session takibi
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  // Session varsa başvuruları çek
  useEffect(() => {
    if (!session) {
      setApplications([]);
      return;
    }

    setDataLoading(true);
    setDataError(null);

    supabase
      .from("applications")
      .select("id, company_name, position, platform, applied_at")
      .is("deleted_at", null)
      .order("applied_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setDataError(error.message);
          setApplications([]);
        } else {
          setApplications(data ?? []);
        }
        setDataLoading(false);
      });
  }, [session]);

  // Login fonksiyonu
  const handleLogin = async () => {
    setAuthLoading(true);
    setAuthError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAuthError(error.message);
    }
    setAuthLoading(false);
  };

  // Logout fonksiyonu
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // ============ RENDER ============

  // Login ekranı
  if (!session) {
    return (
      <View style={{ flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#FAF8F4" }}>
        <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 24, textAlign: "center" }}>
          Supabase Test Girişi
        </Text>

        <Text style={{ marginBottom: 4, color: "#666" }}>E-posta</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            backgroundColor: "white",
          }}
        />

        <Text style={{ marginBottom: 4, color: "#666" }}>Şifre</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 8,
            padding: 12,
            marginBottom: 24,
            backgroundColor: "white",
          }}
        />

        {authError && (
          <Text style={{ color: "#DC2626", marginBottom: 16, textAlign: "center" }}>
            {authError}
          </Text>
        )}

        <Pressable
          onPress={handleLogin}
          disabled={authLoading}
          style={{
            backgroundColor: "#3D5A47",
            padding: 16,
            borderRadius: 8,
            alignItems: "center",
            opacity: authLoading ? 0.6 : 1,
          }}
        >
          {authLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: "white", fontWeight: "600" }}>Giriş Yap</Text>
          )}
        </Pressable>
      </View>
    );
  }

  // Başvuru listesi
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FAF8F4" }} contentContainerStyle={{ padding: 24 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>Başvurular</Text>
        <Pressable onPress={handleLogout}>
          <Text style={{ color: "#3D5A47", fontSize: 14 }}>Çıkış</Text>
        </Pressable>
      </View>

      <Text style={{ color: "#666", marginBottom: 16 }}>
        Giriş: {session.user.email}
      </Text>

      {dataLoading && <ActivityIndicator size="large" color="#3D5A47" style={{ marginTop: 32 }} />}

      {dataError && (
        <View style={{ padding: 16, backgroundColor: "#FEE2E2", borderRadius: 8, marginBottom: 16 }}>
          <Text style={{ color: "#991B1B", fontWeight: "600", marginBottom: 4 }}>Hata:</Text>
          <Text style={{ color: "#991B1B" }}>{dataError}</Text>
        </View>
      )}

      {!dataLoading && !dataError && applications.length === 0 && (
        <Text style={{ color: "#666", textAlign: "center", marginTop: 32 }}>
          Henüz başvuru yok.
        </Text>
      )}

      {applications.map((app) => (
        <View
          key={app.id}
          style={{
            padding: 16,
            backgroundColor: "white",
            borderRadius: 8,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: "#eee",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}>
            {app.company_name}
          </Text>
          <Text style={{ color: "#666", marginBottom: 8 }}>{app.position}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "#3D5A47", fontSize: 12 }}>
              {app.platform ?? "Belirsiz"}
            </Text>
            <Text style={{ color: "#999", fontSize: 12 }}>
              {new Date(app.applied_at).toLocaleDateString("tr-TR")}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}