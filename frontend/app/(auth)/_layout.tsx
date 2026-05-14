// app/(auth)/_layout.tsx
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function AuthLayout() {
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        router.replace("/(tabs)");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return <Stack screenOptions={{ headerShown: false, animation: "fade" }} />;
}