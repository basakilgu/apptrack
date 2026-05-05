// app/settings/notifications.tsx
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { Header } from "../../components/ui/Header";
import { Card } from "../../components/ui/Card";
import { SwitchRow } from "../../components/ui/SwitchRow";
import { SectionHeader } from "../../components/ui/SectionHeader";

export default function NotificationsSettingsScreen() {
  const [enabled, setEnabled] = useState(true);
  const [silentNames, setSilentNames] = useState(true);
  const [waitingReminder, setWaitingReminder] = useState(true);
  const [interviewReminder, setInterviewReminder] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [milestoneAlerts, setMilestoneAlerts] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF8F4" }}>
      <StatusBar style="dark" />
      <SafeAreaView edges={["top"]}>
        <Header title="Bildirimler" />
      </SafeAreaView>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Master toggle */}
        <Card padding={0} style={{ marginTop: 4 }}>
          <SwitchRow
            label="Bildirimleri etkinleştir"
            description="Tüm Applyze bildirimleri için ana anahtar"
            value={enabled}
            onValueChange={setEnabled}
            isLast
          />
        </Card>

        {/* Bildirim türleri */}
        <View style={{ marginTop: 24 }}>
          <SectionHeader title="HATIRLATICILAR" caps />
          <Card padding={0}>
            <SwitchRow
              label="Yanıt bekleyen başvurular"
              description="3+ gündür hareketsiz başvurular için"
              value={waitingReminder}
              onValueChange={setWaitingReminder}
              disabled={!enabled}
            />
            <SwitchRow
              label="Yaklaşan mülakatlar"
              description="Mülakat tarihinden 1 gün önce hatırlatma"
              value={interviewReminder}
              onValueChange={setInterviewReminder}
              disabled={!enabled}
            />
            <SwitchRow
              label="Anlamlı anlar"
              description="Yeni mülakat, teklif gibi eşik anlarında bildirim"
              value={milestoneAlerts}
              onValueChange={setMilestoneAlerts}
              isLast
              disabled={!enabled}
            />
          </Card>
        </View>

        {/* Özet */}
        <View style={{ marginTop: 24 }}>
          <SectionHeader title="ÖZET" caps />
          <Card padding={0}>
            <SwitchRow
              label="Haftalık özet"
              description="Pazar günleri haftanın özeti"
              value={weeklyDigest}
              onValueChange={setWeeklyDigest}
              isLast
              disabled={!enabled}
            />
          </Card>
        </View>

        {/* Gizlilik */}
        <View style={{ marginTop: 24 }}>
          <SectionHeader title="GİZLİLİK" caps />
          <Card padding={0}>
            <SwitchRow
              label="Şirket adlarını gizle"
              description="Kilit ekranında şirket isimleri görünmesin"
              value={silentNames}
              onValueChange={setSilentNames}
              isLast
              disabled={!enabled}
            />
          </Card>
          <Text
            style={{
              fontSize: 11, color: "#8A8278",
              marginTop: 10, lineHeight: 16,
              fontFamily: "Inter_300Light",
              paddingHorizontal: 4,
            }}
          >
            Çalışırken iş arayanlar için sessiz bir yoldaş. Şirket adı yerine "Bir başvuru güncellendi" gibi nötr metinler görünür.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
