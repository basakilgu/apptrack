// components/ui/NoteAddSheet.tsx
import React, { useState, useEffect } from "react";
import { View } from "react-native";

import { BottomSheet } from "./BottomSheet";
import { Input } from "./Input";
import { Button } from "./Button";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (content: string) => void;
}

export function NoteAddSheet({ visible, onClose, onSave }: Props) {
  const [content, setContent] = useState("");

  useEffect(() => { if (visible) setContent(""); }, [visible]);

  const handleSave = () => {
    if (content.trim().length === 0) return;
    onSave(content.trim());
    onClose();
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Not ekle"
      subtitle="Bu başvuruyla ilgili düşüncelerini yaz"
    >
      <View style={{ marginTop: 4 }}>
        <Input
          value={content}
          onChangeText={setContent}
          placeholder="Mülakat hakkında notların, takip edeceklerin..."
          multiline
          height={140}
          autoFocus
          maxLength={2000}
          helper={`${content.length}/2000`}
        />
      </View>

      <View style={{ marginTop: 4, flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Button label="İptal" onPress={onClose} variant="secondary" size="lg" fullWidth />
        </View>
        <View style={{ flex: 1 }}>
          <Button label="Kaydet" onPress={handleSave} variant="primary" size="lg" disabled={content.trim().length === 0} fullWidth />
        </View>
      </View>
    </BottomSheet>
  );
}
