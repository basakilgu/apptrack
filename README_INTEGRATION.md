# README'ye Eklenecek Bölüm

> Bu doküman Applyze projenin **README.md** dosyasına ekleyebileceğin bir tasarım ve frontend bölümü içerir. Direkt kopyala-yapıştır, ekran görüntüleri için belirtilen dosyaları `/docs/screenshots/` klasörüne koyup yolları güncelle.

---

## Önerilen klasör yapısı (README için görseller)

```
applyze/
├── docs/
│   ├── design/
│   │   ├── user-flow.svg              ← applyze_user_flow_v2.svg
│   │   ├── wireframes.svg             ← applyze_wireframes_annotated.svg
│   │   ├── hifi-mockups.svg           ← applyze_hifi_mockups.svg
│   │   ├── design-system.md           ← DESIGN_SYSTEM_V3.md
│   │   └── logo/
│   │       ├── app-icon.svg
│   │       ├── outline.svg
│   │       └── mark.svg
│   └── screenshots/
│       ├── app-store-icon.png         ← (export et: app icon SVG'sinden 1024px PNG)
│       ├── onboarding.png             ← (Expo Go'dan ekran görüntüsü)
│       ├── application-list.png
│       ├── application-detail.png
│       └── milestone.png
└── README.md
```

---

# README.md'ye yapıştırılacak içerik (aşağıdaki bölüm)

```markdown
## ✦ Tasarım

Applyze "ayna" felsefesiyle tasarlandı: kullanıcının başvuru verisini gösterir, kararı dayatmaz. Bu felsefe iki "yüz" ile somutlaştırıldı:

- **Yüz A — Çalışma yüzeyleri.** Liste, detay, form, ayarlar. Linear ve Things 3'ten ilham alındı: krem zemin, sans-serif, dingin, veri yoğun.
- **Yüz B — Anlamlı an.** Onboarding, milestone, empty state. Linear "Flows", Tiimo, Alan'dan ilham alındı: koyu zemin, dotted texture, vignette glow, büyük italic editorial başlıklar.

### Görsel kimlik

Sembol: **pusula iğnesi.** Maskot değil — sessiz bir araç. Kullanıcı bir başvuruyu reddedildiğinde "üzgün maskot" görmez; sadece pusula döner. Üç varyantı var:

| App Icon (3D) | Outline (hero) | Mark (nav/badge) |
|---|---|---|
| ![](docs/design/logo/app-icon.svg) | ![](docs/design/logo/outline.svg) | ![](docs/design/logo/mark.svg) |

Tipografi tek aile: **Inter Variable** (Light Italic, Regular, Medium, SemiBold).
Renk paleti: krem nötrler + adaçayı yeşili aksanı + her durum için *bilinçli olarak donuk* tonlar (özellikle red için soluk gül — psikolojik bakım).

Tam design system: [`docs/design/design-system.md`](docs/design/design-system.md)

---

## ✦ User Flow

İki ana akış: yeni kullanıcı yolculuğu (tek seferlik) ve günlük kullanım döngüsü (tekrar eden).

![User Flow Diagrams](docs/design/user-flow.svg)

- **Flow 1 — Yeni kullanıcı:** Splash → Giriş → Onboarding (3 ekran) → Empty State → Add Form → Dashboard
- **Flow 2 — Günlük döngü:** Liste → Detay → Action Sheet → Milestone → Liste (loop)

---

## ✦ Wireframe & Component Anatomi

Her kritik ekran component-component dökümante edildi. Her hotspot'un design system'deki karşılığı (token, ölçü, davranış) yanda etiketli.

![Annotated Wireframes](docs/design/wireframes.svg)

**Belirtilen 4 ekran:**
1. **Application List** (Yüz A) — başvuru listesi, filtre chip'leri, durum rozetleri, alt navigasyon
2. **Application Detail** (Yüz A) — başlık, durum + tarih, süreç timeline, notlar, aksiyon butonları
3. **Onboarding Hero** (Yüz B) — atmosferik koyu zemin, italic editorial başlık, pusula sembolü
4. **Milestone** (Yüz B) — vignette glow, sessiz takdir tonu, "bir an" caption

---

## ✦ High-Fidelity Mockups

6 ana ekranın render edilmiş halleri. Gerçek Türkçe içerik (Trendyol, Garanti BBVA, Getir, Hepsiburada, Yapı Kredi pozisyonları, Süreç Tasarım Uzmanı, İş Analisti vb.) ile.

![Hi-Fi Mockups](docs/design/hifi-mockups.svg)

---

## ✦ Frontend

### Stack

- **Expo Router** (file-based navigation)
- **NativeWind** (Tailwind for React Native)
- **TypeScript** (strict mode)
- **react-native-svg** (pusula sembolü için)
- **Inter Variable Font** (`@expo-google-fonts/inter`)

### Klasör yapısı

```
app/
  (tabs)/
    applications.tsx        ← liste ekranı + empty state
  application/
    [id].tsx                ← detay ekranı
    new.tsx                 ← yeni başvuru formu
  onboarding.tsx            ← Yüz B atmosferik tanıtım
  milestone.tsx             ← Yüz B "bir an" ekranı
components/
  ui/
    Button.tsx              Card.tsx           Badge.tsx
    Input.tsx               Tag.tsx            EmptyState.tsx
    BottomNav.tsx           ScreenContainer.tsx
    CompassMark.tsx
lib/
  mockData.ts               ← geliştirme verisi (Supabase'e bağlanınca silinir)
types/
  database.ts               ← Application, Stage, Note tipleri
tailwind.config.js          ← design system v3 token'ları
```

### Ekran görüntüleri

| Onboarding | Application List | Application Detail | Milestone |
|---|---|---|---|
| ![](docs/screenshots/onboarding.png) | ![](docs/screenshots/application-list.png) | ![](docs/screenshots/application-detail.png) | ![](docs/screenshots/milestone.png) |

### Çalıştırma

```bash
npm install
npx expo start
```

Mock veriyle çalışır. Backend bağlama PRD F-XX'de, sonraki sprint.
```

---

# Notlar

- README'deki `docs/design/*.svg` dosyaları doğrudan SVG. GitHub bunları markdown içinde render eder.
- Ekran görüntülerini Expo Go'dan alacaksın: telefonunda uygulama açıkken volume + power tuşları → telefondan Mac'e AirDrop → `docs/screenshots/` içine yerleştir.
- App store ikonu için: `applyze_app_icon.svg` dosyasını Figma veya browser'da aç, 1024×1024 PNG olarak export et.
- Tüm SVG'ler ölçeklenebilir — README'de farklı boyutlarda da güzel görünür.
