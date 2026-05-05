// components/ui/BottomSheet.tsx
import React from "react";
import { Modal, View, Pressable, Text, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function BottomSheet({ visible, onClose, title, subtitle, children }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        style={{ flex: 1, backgroundColor: "rgba(31, 27, 22, 0.45)" }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
      >
        <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#FAF8F4", borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
          {/* Drag handle */}
          <View style={{ alignItems: "center", paddingTop: 10 }}>
            <View style={{ width: 36, height: 4, backgroundColor: "#D9D3C8", borderRadius: 2 }} />
          </View>

          {title ? (
            <View style={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: subtitle ? 4 : 8 }}>
              <Text style={{ fontSize: 16, color: "#1F1B16", fontFamily: "Inter_600SemiBold", textAlign: "center", letterSpacing: -0.1 }}>
                {title}
              </Text>
              {subtitle ? (
                <Text style={{ fontSize: 12, color: "#8A8278", marginTop: 4, textAlign: "center", fontFamily: "Inter_400Regular" }}>
                  {subtitle}
                </Text>
              ) : null}
            </View>
          ) : null}

          <View style={{ paddingHorizontal: 20, paddingBottom: 16, paddingTop: title ? 8 : 16 }}>
            {children}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
