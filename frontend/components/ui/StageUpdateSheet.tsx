// components/ui/StageUpdateSheet.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";

import { BottomSheet } from "./BottomSheet";
import { Button } from "./Button";
import { mockStages, stageDisplayNames } from "../../lib/mockData";
import type { StageKey } from "../../types/database";

interface Props {
  visible: boolean;
  onClose: () => void;
  currentStage: StageKey;
  onSelect: (stage: StageKey) => void;
}

function CheckIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14">
      <Path d="M 3 7.5 L 5.5 10 L 11 4" fill="none" stroke="#FAF8F4" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function StageUpdateSheet({ visible, onClose, currentStage, onSelect }: Props) {
  const [selected, setSelected] = React.useState<StageKey>(currentStage);

  React.useEffect(() => { if (visible) setSelected(currentStage); }, [visible, currentStage]);

  const handleConfirm = () => {
    if (selected !== currentStage) onSelect(selected);
    onClose();
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Aşamayı güncelle"
      subtitle="Bu başvuru hangi aşamada?"
    >
      <View style={{ marginTop: 4 }}>
        {mockStages.map((stage) => {
          const isSelected = selected === stage.key;
          const displayName = stageDisplayNames[stage.key];
          return (
            <Pressable
              key={stage.id}
              onPress={() => setSelected(stage.key)}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 14,
                paddingVertical: 14,
                marginBottom: 6,
                borderRadius: 10,
                backgroundColor: isSelected ? "#FFFFFF" : "transparent",
                borderWidth: 1,
                borderColor: isSelected ? "#3D5A47" : "rgba(217, 211, 200, 0.5)",
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <View
                style={{
                  width: 10, height: 10, borderRadius: 5,
                  backgroundColor: stage.color ?? "#8A8278",
                  marginRight: 12,
                }}
              />

              <Text
                style={{
                  flex: 1, fontSize: 14, color: "#1F1B16",
                  fontFamily: isSelected ? "Inter_500Medium" : "Inter_400Regular",
                }}
              >
                {displayName}
              </Text>

              {isSelected && (
                <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: "#3D5A47", alignItems: "center", justifyContent: "center" }}>
                  <CheckIcon />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      <View style={{ marginTop: 14, flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Button label="İptal" onPress={onClose} variant="secondary" size="lg" fullWidth />
        </View>
        <View style={{ flex: 1 }}>
          <Button label="Onayla" onPress={handleConfirm} variant="primary" size="lg" fullWidth />
        </View>
      </View>
    </BottomSheet>
  );
}
