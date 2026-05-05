# APPLYZE v3 — Temiz Kurulum (Mac)

Bu dökümanı **adım adım** takip et. Her adımı yaptıktan sonra bana yaz, sıradakine geçelim. Tek bir adımı atlamadan ilerle.

---

## Neden bu sefer farklı?

Önceki versiyonlarda Mac'in "Değiştir" özelliği alt klasörleri her zaman temizlemediği için bazı eski dosyalar arta kalıyor ve "boş tab" sorununa yol açıyordu. Bu sefer **terminal komutlarıyla** eski dosyaları tamamen siliyoruz, sıfırdan başlıyoruz.

---

## Adım 1: Expo'yu kapat

Terminalde `Ctrl + C` bas, Expo'nun kapanmasını bekle. Telefonunda da Expo Go'yu tam kapat (yukarı kaydır → uygulamayı tamamen kapat).

---

## Adım 2: Doğru klasörde olduğunu kontrol et

VS Code'da terminale geç, şunu yaz:

```bash
pwd
```

Çıktı **kesinlikle** şu olmalı:
```
/Users/basakilgu/Desktop/applyze/frontend
```

Değilse:
```bash
cd /Users/basakilgu/Desktop/applyze/frontend
```

---

## Adım 3: Eski dosyaları temizle (KOPYALA → YAPIŞTIR)

Aşağıdaki komutları **olduğu gibi kopyala**, terminale yapıştır, Enter'a bas. Her şey aynı anda silinecek:

```bash
rm -rf "app/(tabs)" "app/(auth)" "app/(onboarding)" "app/application" "app/settings"
rm -f app/_layout.tsx app/index.tsx app/+not-found.tsx app/milestone.tsx
rm -rf components/ui
rm -rf lib types
rm -f babel.config.js metro.config.js tailwind.config.js global.css nativewind-env.d.ts
```

> **Not:** Bu komutlar sadece eski Applyze kodlarını siler. node_modules, package.json, ve diğer Expo dosyaları yerinde kalır.

Hata vermediyse adım 3 tamam. Bana yaz, devam edelim.

---

## Adım 4: v3 paketini indirip aç

1. Mesajda gönderdiğim **`applyze-frontend-v3.zip`** dosyasını indir (Downloads klasörüne düşer)
2. Finder'dan **çift tıklayarak** zip'i aç → `applyze-frontend-v3` klasörü oluşur
3. Bu klasörün **içine** çift tıklayarak gir

İçinde şunları görmen lazım:
- `app/` klasörü
- `components/` klasörü
- `lib/` klasörü
- `types/` klasörü
- `package.json`
- `babel.config.js`
- `metro.config.js`
- `tailwind.config.js`
- `global.css`
- `app.json`
- `tsconfig.json`
- ve diğerleri

---

## Adım 5: Tüm içeriği frontend klasörüne taşı

1. `applyze-frontend-v3` klasörünün içindeyken: **`Cmd + A`** ile her şeyi seç
2. **`Cmd + C`** ile kopyala
3. Yeni bir Finder penceresi aç (`Cmd + N`), git: **Desktop → applyze → frontend**
4. **`Cmd + V`** ile yapıştır
5. Eğer "Bu öğelerden bazıları zaten var" diyorsa: **"Değiştir"** (Replace) butonuna bas

> Bu sefer çakışan dosyalar zaten silinmiş olduğu için Mac'in "Değiştir" davranışı sorun çıkarmayacak.

---

## Adım 6: node_modules'u güncelle

Terminale dön (hâlâ `frontend` klasöründesin) ve şunu yaz:

```bash
npm install
```

Bu işlem 1-2 dakika sürer. Sonunda yeşil yazılar veya `added/changed X packages` görmen lazım. Hata olursa bana yaz.

---

## Adım 7: Tertemiz başlat

```bash
npx expo start --clear
```

> `--clear` çok önemli. Önbelleği temizleyerek başlatır. Eski tab dosyalarından kalan iz olmamasını garanti eder.

QR kod çıkacak. **Telefonunda Expo Go'yu yeniden aç**, QR'ı oku.

---

## Adım 8: Test et

Aşağıdakilerin **hepsinin** çalıştığından emin ol:

### Yeni kullanıcı akışı (Flow 01)

1. **Splash** — siyah-yeşil zemin, "Applyze · KARİYER PUSULASI" — 1.8 sn sonra Login
2. **Login** — krem zemin, Apple + E-posta butonları
3. **Onboarding 1** — koyu zemin, "Sadece bir takipçi değil. Bir pusula." — Devam et
4. **Onboarding 2** — funnel illüstrasyon, "Hangi aşamada elendiğini gör." — Devam et
5. **Onboarding 3** — bildirim mock'u, "Bildirimlerin sessiz." — "Pusulanı çıkar"
6. **Liste** — açılışta zaten 9 örnek başvuru var (Trendyol, Garanti, Akbank vs.)

### Tab geçişleri (BURASI ÖNEMLİ)

- **Liste** sekmesi: 9 başvuru, 5 filtre chip (Tümü/Aktif/Mülakat/Favoriler/Arşiv), arama butonu, + butonu
- **Özet** sekmesi: 4 metrik kart, "Bu hafta" editorial kartı, süreç hunisi, aşama dağılımı, son hareketler, "Eşiklerini gör"
- **Profil** sekmesi: kimlik kartı, hızlı istatistikler, 4 ayar bölümü (Tercihler/Hesap/Uygulama/Çıkış)

### Günlük kullanım (Flow 02)

7. **Liste'den bir başvuruya tıkla** → Detay açılır (timeline, notlar, alttaki Aşama güncelle / Not ekle)
8. **"Aşama güncelle" → "Mülakat" → Onayla** → Eğer önceden mülakat değildiyse → **Milestone** ekranı ("İlk açılan kapı.")
9. **+ butonu → Yeni başvuru** formu (Pozisyon, Şirket, Şehir, Platform chip'leri, İlan bağlantısı, Aşama radio, Notlar)

### Diğer ekranlar

- **Profil → Bildirimler** → Master toggle + 4 kategori switch
- **Profil → Aşamaları yönet** → Liste + "+ Aşama ekle" butonu
- **Detay → Yıldız** → Favori toggle (Liste'de yıldız görünür)
- **Detay → Sağ üst ⋯ → Düzenle** → Edit form + danger zone "Başvuruyu sil"

---

## Adım 9: Bir sorun varsa

Boş ekran, kırmızı hata, beklenmedik bir şey görürsen:

1. **Ekran görüntüsü çek**
2. Mesaj olarak gönder
3. Açıkla: hangi ekranda, ne yapınca

Düzeltirim. Ama bu yapı temiz olduğu için %99 sorunsuz çalışacak.

---

## v3'te Ne Değişti?

- ✅ Native Expo Tabs (boş tab sorununun kökünden çözümü)
- ✅ Profesyonel Profil ekranı (kimlik kartı + 4 bölüm + 12 ayar)
- ✅ Zenginleştirilmiş Özet ekranı (4 metrik + huni grafik + bar chart + son hareketler)
- ✅ "Devam et" butonları → 54pt yükseklik, 16pt font, daha okunaklı
- ✅ Yeni başvuru formuna Aşama selector + Notlar alanı eklendi (wireframe ile uyum)
- ✅ Detay ekranında: timeline (geçmiş + gelecek), favori toggle, ⋯ menüsü, sticky aksiyon bar
- ✅ Milestone ekranı: animasyonlu giriş, "İlk açılan kapı." poetik başlık
- ✅ Bildirim ayarları: master toggle + 4 kategori + gizlilik
- ✅ Aşama yönetimi: liste + drag handle + "+ Ekle" butonu
- ✅ 9 örnek başvuru (gerçekçi şirket isimleri, tarihler, notlar)
- ✅ Ayarlar (Hesap, Uygulama, Versiyon)
- ✅ Çıkış / Hesap silme onay dialog'ları

İyi şanslar!
