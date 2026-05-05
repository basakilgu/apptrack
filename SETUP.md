# Applyze Frontend — Kurulum

> Applyze'ın Expo (React Native) frontend'i için NativeWind, design system ve UI component kurulum talimatları. Komutları sırayla terminale yapıştır, hata aldığında dur.

---

## Paketin içinde ne var

```
frontend-starter/
├── SETUP.md                    ← bu dosya
├── tailwind.config.js          ← design system v3 token'ları
├── types/
│   └── database.ts             ← Application, Stage, Note tipleri
├── lib/
│   └── mockData.ts             ← 6 mock başvuru, helper'lar
├── components/ui/
│   ├── Button.tsx              ← primary / secondary / ghost / light-on-dark
│   ├── Card.tsx                ← onPress destekli içerik kartı
│   ├── Badge.tsx               ← durum rozeti (status renklerine göre)
│   ├── CompassMark.tsx         ← pusula sembolü (3 varyant)
│   ├── ScreenContainer.tsx     ← her ekranın saran konteyneri (Yüz A/B)
│   ├── Input.tsx               ← form alanları (focus state'li)
│   ├── EmptyState.tsx          ← boş durum (pusula + editorial başlık + CTA)
│   ├── Tag.tsx                 ← filtre chip'i (count'lu, active state'li)
│   └── BottomNav.tsx           ← 3 sekmeli alt nav (Özet / Liste / Profil)
└── app/
    ├── (tabs)/
    │   └── applications.tsx    ← liste ekranı + empty state
    ├── application/
    │   └── [id].tsx            ← detay ekranı (timeline + notlar)
    ├── onboarding.tsx          ← Yüz B atmosferik tanıtım
    └── milestone.tsx           ← Yüz B "bir an" ekranı
```

---

## Adım 1 — Bağımlılıkları yükle

Frontend kök dizinindeyken:

```bash
npx expo install nativewind react-native-reanimated react-native-safe-area-context react-native-svg
npm install -D tailwindcss@3.3.2
```

Sonra:

```bash
npx tailwindcss init
```

Bu komut bir `tailwind.config.js` dosyası oluşturur. **İçeriğini paketteki `tailwind.config.js` ile değiştir.**

---

## Adım 2 — Babel'i NativeWind için yapılandır

`babel.config.js` dosyasını şu şekilde güncelle:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"],
  };
};
```

---

## Adım 3 — Global CSS ekle

Proje kökünde `global.css` dosyası oluştur:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`app/_layout.tsx` dosyasının en üstünde import et:

```tsx
import "../global.css";
```

---

## Adım 4 — Inter fontunu yükle

```bash
npx expo install expo-font @expo-google-fonts/inter
```

`app/_layout.tsx` içinde font'ları yükle:

```tsx
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_300Light,
} from "@expo-google-fonts/inter";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_300Light,
  });

  if (!fontsLoaded) return null;

  return /* layout JSX */;
}
```

---

## Adım 5 — Klasör yapısını oluştur ve dosyaları kopyala

Proje kökünde:

```bash
mkdir -p components/ui types lib app/application
```

Paketteki dosyaları aynı yapıyla projeye kopyala:

```
types/database.ts                            →  types/database.ts
lib/mockData.ts                              →  lib/mockData.ts
components/ui/*.tsx                          →  components/ui/*.tsx
app/(tabs)/applications.tsx                  →  app/(tabs)/applications.tsx
app/application/[id].tsx                     →  app/application/[id].tsx
app/onboarding.tsx                           →  app/onboarding.tsx
app/milestone.tsx                            →  app/milestone.tsx
```

> `@/` alias'ı kullanıyorsan `tsconfig.json` içinde `paths` mapping'i olduğundan emin ol:
> ```json
> { "compilerOptions": { "paths": { "@/*": ["./*"] } } }
> ```

---

## Adım 6 — Logo SVG'lerini ekle

`assets/logo/` klasörünü oluştur ve outputs klasöründeki üç SVG'yi içine kopyala:

- `applyze_app_icon.svg` — uygulama ikonu (squircle 3D)
- `applyze_logo_outline.svg` — hero sahnelerde kullanılır
- `applyze_logo_mark.svg` — nav/badge'de kullanılır

(SVG'leri kullanan `CompassMark` component'i `react-native-svg` ile bunları runtime'da render eder. Asset olarak da bulundurman README'de göstermek için faydalı.)

---

## Adım 7 — Çalıştır

```bash
npx expo start
```

QR kodu telefonundaki Expo Go ile okut. Beklenen sonuç:

- **`/`** → Application List ekranı render olmalı, 6 mock başvuru, filtre chip'leri, alt nav görünür
- **Bir karta dokun** → Detail ekranı timeline ile açılmalı
- **`/onboarding`** → Koyu yeşil zemin, italic editorial başlık, pusula sembolü
- **`/milestone`** → Vignette glow'lu koyu zemin, "BİR AN" caption, pusula

---

## Sorun çıkarsa

| Belirti | Çözüm |
|---|---|
| `Cannot find module nativewind` | `npm install` tekrar çalıştır |
| Renkler yanlış | `tailwind.config.js` `content` alanında `app/**` ve `components/**` patternlerini kontrol et |
| Font yüklenmiyor | `useFonts` döngüsünde `if (!fontsLoaded) return null;` satırını ekle |
| `Property 'className' does not exist` | NativeWind types'ı: `nativewind-env.d.ts` ile genişlet |
| Bir component bulunamıyor | Klasör yapısı `components/ui/` olmalı (sadece `components/` değil) |

---

## Sonraki ekranlar

Bu paket **6 ekranı çalışır halde getirir** (Liste, Detay, Empty State, Onboarding, Milestone, ve Form için route hazır). Eklenmesi gerekenler:

- **`app/application/new.tsx`** — Yeni başvuru formu (Input component'lerini kullanır)
- **`app/onboarding-2.tsx`** ve **`app/onboarding-3.tsx`** — Onboarding'in 2-3. ekranları
- **`app/(tabs)/dashboard.tsx`** — Özet ekranı
- **`app/(tabs)/profile.tsx`** — Profil ekranı

Her birini Cursor'a yazdırırken referans olarak `applyze_hifi_mockups.svg` ve `applyze_wireframes_annotated.svg`'yi göster, design system v3'ü `tailwind.config.js`'den oku.

---

## Backend bağlama (sonraki sprint)

`lib/mockData.ts`'i `lib/applyze.ts` (Supabase client) ile değiştirildiğinde, ekranlardaki tek değişiklik şu olur:

```diff
- import { mockApplications } from "../../lib/mockData";
+ import { useApplications } from "../../lib/hooks";
- const apps = mockApplications;
+ const { data: apps, isLoading } = useApplications();
```

Yani UI katmanı backend'e duyarsız — temiz ayrım.
