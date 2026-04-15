# AppTrack — MVP Kapsam Dokümanı

**Versiyon:** v1.0  
**Tarih:** Nisan 2026  
**Süre:** 10 Hafta  
**Platform:** iOS & Android  

---

## İçindekiler

1. [Yönetici Özeti](#1-yönetici-özeti)
2. [Ürün Vizyonu ve Strateji](#2-ürün-vizyonu-ve-strateji)
3. [Pazar Analizi](#3-pazar-analizi)
4. [Kullanıcı Araştırması ve Persona](#4-kullanıcı-araştırması-ve-persona)
5. [MVP Kapsamı](#5-mvp-kapsamı)
6. [Bilgi Mimarisi](#6-bilgi-mimarisi)
7. [Teknik Mimari](#7-teknik-mimari)
8. [Sprint Planı](#8-sprint-planı-10-hafta)
9. [Başarı Metrikleri](#9-başarı-metrikleri-ve-kpılar)
10. [Risk Yönetimi](#10-risk-yönetimi)
11. [Günlük Kullanım Stratejisi](#11-günlük-kullanım-stratejisi)
12. [Monetizasyon Stratejisi](#12-monetizasyon-stratejisi)
13. [Go-to-Market Stratejisi](#13-go-to-market-stratejisi)
14. [Kapsam Dışı Karar Kayıtları](#14-kapsam-dışı-karar-kayıtları)
15. [Sözlük](#15-sözlük)

---

## 1. Yönetici Özeti

> AppTrack, Türkiye'deki iş arayanlar — özellikle tam zamanlı çalışırken kariyer değişikliği hedefleyen yeni mezunlar — için geliştirilmiş bir başvuru takip ve kariyer analiz uygulamasıdır.

Kullanıcılar bugün Kariyer.net, LinkedIn, Youthall ve Anbean gibi 4-5 farklı platformu ayrı ayrı açıp başvurularını Excel veya zihinsel notlarla takip ediyor. Bu süreç verimsiz, dağınık ve içgörüsüz. AppTrack bu karmaşayı tek bir akıllı arşive dönüştürür.

### Temel Farklılaştırıcılar

1. **Yerel platform desteği** — Kariyer.net, Youthall, Anbean için oto doldur. Batılı hiçbir rakipte yok.
2. **Elenme analizi** — "Hangi aşamada eleniyorum?" sorusunu görselleştiren içgörü ekranı. Piyasada benzeri yok.
3. **Gizlilik öncelikli tasarım** — Bildirim önizlemesi şirket adı içermez. Çalışırken iş arayan kitleye özel.

### Temel Metrikler

| Metrik | Hedef | Ölçüm |
|--------|-------|-------|
| DAU/MAU | > %40 | Supabase Analytics |
| 7. Gün Retention | > %50 | Cohort analizi |
| Oto doldur başarısı | > %80 (Kariyer.net) | Edge Function log |
| App Store Puanı | > 4.2 / 5.0 | App Store Connect |
| Başvuru / kullanıcı / ay | > 8 | DB query |

---

## 2. Ürün Vizyonu ve Strateji

### 2.1 Problem Tanımı

Türkiye'de her yıl yüz binlerce genç profesyonel iş veya kariyer değişikliği yapıyor. Bu grubun büyük çoğunluğu — özellikle 22-27 yaş arası yeni mezunlar — mevcut işlerini sürdürürken daha iyi fırsatlar arıyor.

| Pain Point | Kullanıcı Etkisi | Şiddet |
|-----------|-----------------|--------|
| 4-5 farklı platform | Her gün çoklu app açma zorunluluğu | Çok Yüksek |
| Başvuru hafızası yok | Mükerrer başvurular | Yüksek |
| Aşama görünürlüğü yok | Nerede olduğunu bilmemek | Yüksek |
| Elenme örüntüsü görünmüyor | Strateji geliştirememe | Yüksek |
| Gizlilik kaygısı | Patronun fark etme korkusu | Orta |
| Motivasyon kaybı | Belirsizlik ve görünmez ilerleme | Orta |

### 2.2 Çözüm — 3 Katmanlı Değer

**Katman 1 — Hafıza**  
Tüm başvuruları tek yerde, kalıcı olarak saklar. Platform fark etmeksizin her başvuru kayıt altına alınır.

**Katman 2 — Görünürlük**  
Başvuruların hangi aşamada olduğunu Kanban board üzerinde gösterir. Tek bakışta "neredeyim?" sorusu yanıtlanır.

**Katman 3 — İçgörü**  
Biriken veriyi analiz ederek kullanıcıya örüntüler gösterir: hangi pozisyon tipinde daha başarılı, hangi aşamada takılıyor, hangi sektöre hiç yönelmemiş.

### 2.3 Vizyon ve Misyon

| | |
|--|--|
| **Vizyon** | Türkiye'deki her iş arayanın kariyer sürecini şeffaf, ölçülebilir ve stratejik hale getirmek. |
| **Misyon** | Kullanıcının dağınık iş arama sürecini anlamlı veriye dönüştüren en iyi mobil araç olmak. |
| **Kuzey Yıldızı** | Kullanıcı başına aylık aktif başvuru sayısı. |

---

## 3. Pazar Analizi

### 3.1 Türkiye İş Arama Pazarı

| Gösterge | Veri |
|---------|------|
| Yıllık yeni iş arayanlar (tahmini) | ~2.5 milyon |
| 22-30 yaş aktif arayışta | ~800.000 |
| Kariyer.net aylık kullanıcı | ~4 milyon |
| LinkedIn Türkiye kullanıcısı | ~14 milyon |
| Ortalama iş arama süresi | 4-6 ay |

### 3.2 Rekabet Analizi

| Ürün | Güçlü Yanlar | Zayıf Yanlar | AppTrack Farkı |
|------|-------------|-------------|----------------|
| Teal | Güçlü CV builder | Türk platform desteği yok | Yerel platform + sade UX |
| Huntr | Kanban, Gmail entegrasyon | Ücretli, İngilizce | Türkçe, ücretsiz MVP |
| Simplify | Oto form doldurma | Sadece Chrome, mobil yok | Native mobil |
| Eztrackr | AI araçlar, iyi UX | Türk platformları yok | Kariyer.net/Youthall desteği |

### 3.3 Rekabet Boşluğu

> Türkiye'de yerel platformları destekleyen, mobil öncelikli, gizlilik odaklı, elenme analizi yapan hiçbir uygulama yok. Bu boşluk AppTrack'in net pazar fırsatı.

---

## 4. Kullanıcı Araştırması ve Persona

### 4.1 Birincil Persona

| | |
|--|--|
| **İsim** | Ayşe Yılmaz, 23 yaş, İstanbul |
| **Meslek** | Süreç Tasarım Uzmanı, tam zamanlı (8 aydır) |
| **Eğitim** | Endüstri Mühendisliği mezunu |
| **Platformlar** | LinkedIn, Kariyer.net, Youthall, Anbean |
| **Aktif Saat** | Akşam 21:00-23:00 ve öğle molası 12:30-13:00 |
| **Mevcut Araç** | Notes + Excel (dağınık, yetersiz) |

**Ayşe'nin Sözleri:**
> "Her sabah 4-5 farklı uygulamayı açıyorum, hangisine başvurmuştum bilmiyorum."

> "HR görüşmesinde eleniyorum genelde ama neden bilmiyorum. Bir pattern var mı acaba?"

> "Telefonu masada bırakınca amirimin bildirimi görmesinden korkuyorum."

### 4.2 Jobs To Be Done

| Job Statement | Önem | Mevcut Çözüm | Tatmin |
|-------------|------|-------------|--------|
| Tüm başvurularımı tek yerde görmek | Kritik | Excel / hafıza | Çok Düşük |
| Hangi aşamada olduğumu bilmek | Kritik | Manuel not | Düşük |
| Aynı ilana iki kez başvurmaktan kaçınmak | Yüksek | Hafıza | Düşük |
| Hangi pozisyonda başarılı olduğumu anlamak | Yüksek | Yok | Yok |
| Patronuma sezdirmeden iş aramak | Orta | Dikkatli davranış | Orta |

### 4.3 Kullanıcı Yolculuğu — AS-IS (Bugün)

| Aşama | Ayşe Ne Yapıyor? | Acı Noktası |
|-------|----------------|-------------|
| 1. Keşif | 4-5 platformu ayrı ayrı açıyor | Dağınık deneyim |
| 2. Başvuru | Her platformda ayrı form dolduruyor | Zaman kaybı |
| 3. Kayıt | Notes'a elle yazıyor | Standart değil, kaybolabilir |
| 4. Bekleme | Hiçbir şey yapmıyor | Hangi firmadan dönüş beklediğini unutuyor |
| 5. Değerlendirme | Neden elendiğini bilmiyor | Örüntü göremez |

### 4.4 Kullanıcı Yolculuğu — TO-BE (AppTrack ile)

| Aşama | Ayşe Ne Yapıyor? | AppTrack Değeri |
|-------|----------------|----------------|
| 1. Keşif | İstediği platformda ilan görüyor | Platforma bağımlı değil |
| 2. Kayıt | Linki kopyalayıp yapıştırıyor | 10 saniyede kayıt |
| 3. Takip | Kanban'da sürükle-bırak | Görsel, sezgisel |
| 4. Bekleme | Dashboard'da "dönüş bekleyenler" listesi | Hiçbir şey kaçmıyor |
| 5. Analiz | Elenme ekranını inceliyor | Strateji geliştirebiliyor |

---

## 5. MVP Kapsamı

### 5.1 Özellik Listesi

| # | Özellik | Açıklama | Öncelik | Sprint |
|---|---------|---------|---------|--------|
| F-01 | Kayıt & Giriş | Email veya Google OAuth. Veriler kişisel ve gizli. | Kritik | S1 |
| F-02 | Link → Oto Doldur | Kariyer.net, Youthall, Anbean linkleri için şirket, pozisyon, lokasyon otomatik çekilir. | Kritik | S1 |
| F-03 | Manuel Ekleme | Link desteklenmediğinde kullanıcı kendisi doldurur. | Kritik | S1 |
| F-04 | Kanban Board | Başvurular aşamalara göre sütunlarda. Sürükle-bırak ile güncelleme. | Kritik | S1 |
| F-05 | Başvuru Arşivi | Tüm geçmiş başvurular. Aranabilir, filtrelenebilir. Veri silinmez. | Kritik | S1 |
| F-06 | Başvuru Detay | Notlar, aşama geçmişi, iletişim kişisi, ilan URL. | Yüksek | S2 |
| F-07 | Özelleştirilebilir Aşamalar | Default aşamalar gelir, kullanıcı ekleyip değiştirebilir. | Yüksek | S2 |
| F-08 | İstatistik Dashboard | Toplam başvuru, aşama dağılımı, geri dönüş süresi, sektör analizi. | Yüksek | S2 |
| F-09 | Elenme Analizi | Kullanıcının elenme örüntüsünü gösteren funnel. Asıl farklılaştırıcı. | Yüksek | S3 |
| F-10 | Hareketsizlik Bildirimi | X gün haber alınmamış başvurular için hatırlatma. Gizlilik öncelikli. | Orta | S3 |
| F-11 | Duplicate Uyarısı | Daha önce başvurulan ilana tekrar eklenince uyarı. | Orta | S3 |

### 5.2 Kapsam Dışı (v1)

- Otomatik ilan aggregation (Kariyer.net vb. API sunmuyor)
- Kişiselleştirilmiş AI ilan tavsiyesi
- Sosyal özellikler
- CV / mülakat asistanı
- Web uygulaması
- Streak sistemi

---

## 6. Bilgi Mimarisi

### 6.1 Tab Bar Yapısı

| Tab | Simge | Ana Amaç | Default |
|-----|-------|---------|---------|
| Dashboard | Ev | Günlük özet, metrik kartları | ✅ Evet |
| Kanban | Kolon | Başvuruları aşamalara göre görsel takip | Hayır |
| Arşiv | Liste | Tüm başvurular, arama ve filtreleme | Hayır |
| Analiz | Grafik | Elenme analizi, sektör haritası | Hayır |
| Ayarlar | Çark | Profil, aşama yönetimi, bildirimler | Hayır |

### 6.2 Ekran Listesi

| Ekran | Sprint | Öncelik |
|-------|--------|---------|
| Splash / Onboarding (3 ekran) | S1 | Kritik |
| Kayıt & Giriş | S1 | Kritik |
| Dashboard | S1 | Kritik |
| İlan Ekleme — Link | S1 | Kritik |
| İlan Ekleme — Manuel | S1 | Kritik |
| Kanban Board | S1 | Kritik |
| Arşiv Listesi | S1 | Kritik |
| Başvuru Detay | S2 | Yüksek |
| İstatistik Dashboard | S2 | Yüksek |
| Analiz — Elenme Funnel | S3 | Yüksek |
| Ayarlar | S2 | Yüksek |
| Aşama Yönetimi | S2 | Yüksek |
| Bildirim Ayarları | S3 | Orta |

---

## 7. Teknik Mimari

### 7.1 Teknoloji Stack

| Katman | Teknoloji | Gerekçe |
|--------|-----------|---------|
| Mobil Framework | Expo (React Native) | iOS + Android tek kod tabanı, hızlı iterasyon |
| Backend & Auth | Supabase | PostgreSQL, RLS, gerçek zamanlı, ücretsiz tier |
| Oto Doldur | Supabase Edge Functions (Deno) | Sunucu taraflı scraping |
| State Yönetimi | Zustand | Sade, boilerplate az |
| Navigasyon | Expo Router | File-based, deep link desteği |
| Bildirimler | Expo Notifications + Supabase cron | Zamanlanmış bildirim |
| Analitik | Amplitude (ücretsiz tier) | Kullanıcı davranışı, funnel |
| Deploy | Expo EAS Build | App Store + Google Play |
| Versiyon Kontrolü | GitHub | Branch: main + develop + feature |

### 7.2 Veritabanı Şeması

```sql
-- Temel tablolar

users
  id          UUID PK
  email       TEXT UNIQUE
  created_at  TIMESTAMP

applications
  id                UUID PK
  user_id           UUID FK → users.id
  company_name      TEXT NOT NULL
  position          TEXT NOT NULL
  platform          TEXT
  source_url        TEXT
  current_stage_id  UUID FK → stages.id
  applied_at        TIMESTAMP
  created_at        TIMESTAMP
  updated_at        TIMESTAMP

stages
  id          UUID PK
  user_id     UUID FK → users.id
  name        TEXT NOT NULL
  color       TEXT
  order       INT
  is_terminal BOOLEAN

stage_history
  id              UUID PK
  application_id  UUID FK → applications.id
  stage_id        UUID FK → stages.id
  changed_at      TIMESTAMP

notes
  id              UUID PK
  application_id  UUID FK → applications.id
  content         TEXT (max 2000)
  created_at      TIMESTAMP
```

### 7.3 Güvenlik

```sql
-- Row Level Security — her kullanıcı sadece kendi verisine erişir
CREATE POLICY 'Users can only access own applications'
  ON applications FOR ALL
  USING (auth.uid() = user_id);
-- Tüm tablolara aynı politika uygulanır
```

| Katman | Önlem |
|--------|-------|
| Auth | JWT (1 saat) + refresh token (30 gün) |
| Veri izolasyonu | RLS her tabloda |
| API güvenliği | Service key yalnızca Edge Functions'ta |
| Bildirim gizliliği | Önizleme metni generic, şirket adı yok |
| Scraping | URL whitelist — sadece izinli domainler |

### 7.4 Oto Doldur Akışı

| Adım | İşlem | Süre (Hedef) |
|------|--------|-------------|
| 1 | Kullanıcı linki yapıştırır | 0ms |
| 2 | Domain kontrolü (whitelist) | <50ms |
| 3 | Platform tespiti | <50ms |
| 4 | Sayfa fetch (sunucu taraflı) | <2000ms |
| 5 | HTML parse, alan çıkarma | <200ms |
| 6 | JSON olarak client'a döndür | <100ms |
| 7 | Form doldurma animasyonu | <200ms |

> **LinkedIn notu:** LinkedIn aktif scraping engelliyor. MVP'de direkt manuel akışa yönlendirilir.

---

## 8. Sprint Planı (10 Hafta)

### Genel Bakış

| Sprint | Haftalar | Odak | Teslimat |
|--------|---------|------|---------|
| Sprint 1 | 1-3 | MVP Çekirdeği | Auth, ilan ekleme, Kanban, arşiv |
| Sprint 2 | 4-6 | MVP Tamamlama | Detay sayfası, aşama yönetimi, dashboard |
| Sprint 3 | 7-8 | Engagement | Analiz, bildirimler, duplicate uyarısı |
| Sprint 4 | 9-10 | Canlıya Alım | Beta test, bug fix, App Store gönderimi |

### Sprint 1 — MVP Çekirdeği (Hafta 1-3)

| Gün | Görev | Tamamlanma Kriteri |
|-----|-------|-------------------|
| 1-2 | Proje kurulumu: Expo init, Supabase, GitHub | 'Hello World' çalışıyor |
| 3-5 | Auth: kayıt, giriş, Google OAuth | Kullanıcı kayıt olup giriş yapabiliyor |
| 6-8 | Onboarding (3 slayt, skip edilebilir) | Dashboard'a geçiş var |
| 9-12 | Manuel ilan ekleme formu | Başvuru DB'ye kaydediliyor |
| 13-16 | Oto doldur: Edge Function + Kariyer.net parser | Kariyer.net linki çalışıyor |
| 17-18 | Youthall parser | Youthall linki çalışıyor |
| 19-21 | Kanban board (sütunlar, kartlar, sürükle-bırak) | Başvurular görünüyor |

### Sprint 2 — MVP Tamamlama (Hafta 4-6)

| Gün | Görev | Tamamlanma Kriteri |
|-----|-------|-------------------|
| 22-25 | Başvuru arşivi (liste, arama, filtreleme) | 100 başvuruda arama çalışıyor |
| 26-28 | Başvuru detay sayfası | Notlar, aşama geçmişi görünüyor |
| 29-31 | Özelleştirilebilir aşamalar | Kullanıcı aşama ekleyip silebiliyor |
| 32-35 | İstatistik dashboard — metrik kartları | Sayaçlar görünüyor |
| 36-38 | İstatistik — aşama dağılımı grafiği | Chart render ediliyor |
| 39-42 | UX polish: empty states, loading states | Boş ekranlarda CTA var |

### Sprint 3 — Engagement (Hafta 7-8)

| Gün | Görev | Tamamlanma Kriteri |
|-----|-------|-------------------|
| 43-45 | Elenme analizi funneli | Funnel görsel render ediliyor |
| 46-47 | Sektör/pozisyon başarı analizi | Callback oranı hesaplanıyor |
| 48-49 | Push notification altyapısı | Test bildirimi cihaza ulaşıyor |
| 50-51 | Hareketsizlik bildirimi (Supabase cron) | 14 gün geçmişse bildirim gidiyor |
| 52-53 | Duplicate ilan uyarısı | Aynı URL eklenince modal çıkıyor |
| 54-56 | UX polish: animasyonlar, haptic feedback | Uygulama 'native' hissediyor |

### Sprint 4 — Canlıya Alım (Hafta 9-10)

| Gün | Görev | Tamamlanma Kriteri |
|-----|-------|-------------------|
| 57-59 | Closed beta: 10-15 kullanıcı | Geri bildirim toplanıyor |
| 60-62 | Kritik bug fix | P0 ve P1 buglar kapatıldı |
| 63-64 | App Store varlıkları (ekran görüntüsü, açıklama, ikon) | App Store Connect'e yüklendi |
| 65-66 | Google Play varlıkları | Play Console'a yüklendi |
| 67 | iOS TestFlight gönderimi | TestFlight'ta kullanılabilir |
| 68 | Google Play internal test | Internal test aktif |
| 69-70 | App Store inceleme bekleme + minor fix | Onay alındı |

> ⚠️ **Önemli:** Apple Developer hesabı ($99/yıl) Sprint 1'in ilk gününde açılmalıdır.

---

## 9. Başarı Metrikleri ve KPI'lar

### Kuzey Yıldızı Metriği

> **Kullanıcı başına aylık aktif başvuru sayısı**  
> Hedef: İlk 3 ayda kullanıcı başına ortalama 8+ başvuru/ay

### Acquisition Metrikleri

| Metrik | Tanım | Hedef (3. Ay) |
|--------|-------|--------------|
| App Store İndirme | Organik indirme | > 500 |
| Kayıt Oranı | İndirenlerden kayıt olanlar | > %70 |
| Onboarding Tamamlama | İlk başvuruyu ekleyenler | > %60 |

### Engagement Metrikleri

| Metrik | Tanım | Hedef |
|--------|-------|-------|
| DAU/MAU | Günlük / aylık aktif oran | > %40 |
| 7. Gün Retention | 7. günde hâlâ aktif | > %50 |
| 30. Gün Retention | 30. günde hâlâ aktif | > %30 |
| Başvuru / Kullanıcı | Aylık ortalama | 8+ |
| Bildirim Açılma | Push CTR | > %30 |

### Kalite Metrikleri

| Metrik | Hedef |
|--------|-------|
| Oto Doldur Başarısı (Kariyer.net) | > %80 |
| App Store Puanı | > 4.2 / 5.0 |
| Crash Rate | < %0.5 |
| P99 Yükleme Süresi (Kanban) | < 2 sn |

---

## 10. Risk Yönetimi

### Risk Matrisi

| Risk | Olasılık | Etki | Azaltma Stratejisi |
|------|---------|------|-------------------|
| Kariyer.net link yapısı değişir | Orta | Yüksek | Modüler parser, hızlı güncelleme. Fallback: manuel ekleme |
| App Store red (gizlilik/izin) | Düşük | Çok Yüksek | Gizlilik politikası eksiksiz. TestFlight ile erken test |
| Düşük ilk retention | Orta | Yüksek | Onboarding'de ilk başvuru zorunlu adım |
| Supabase ücretsiz limit aşımı | Düşük | Orta | Pro plan ($25/ay) hazırda |
| Tek geliştirici bandwith | Orta | Yüksek | MVP kapsamı dar tutuldu, kapsam dışı listesi net |
| LinkedIn API kısıtlaması | Çok Yüksek | Orta | MVP'de oto doldur yok. Risk kabul edildi |

### Kapsam Kayması Önlemi

> **Kural:** Yeni özellik isteği geldiğinde ilk soru şu olmalı: "Bu olmadan kullanıcı değer alamaz mı?"  
> Eğer cevap "alabilir" ise → backlog. MVP'ye eklenmez.

---

## 11. Günlük Kullanım Stratejisi

### A + D Kombinasyonu

**Mekanizma A — Dashboard Özeti (Pasif Kanca)**

Her açılışta anlamlı özet gösterilir:
- "Bu hafta 3 başvuru, 1'i HR'a geçti"
- "Son 30 günde en çok başvurduğun alan: Süreç Tasarımı"
- İçerik günlük güncellenir

**Mekanizma D — Aksiyon Bildirimi (Aktif Kanca)**

Somut, kişisel bildirimler:
- "Vodafone başvurusundan 7 gündür haber yok — takip etmek ister misin?"
- Günde max 1 kez, 09:00-21:00 arası
- Kilitli ekranda şirket adı görünmez

> ⚠️ **Gizlilik notu:** Kilit ekranında sadece "AppTrack — Hatırlatıcın var" gösterilir. İçerik görünmez.

### Neden Streak Yok?

Streak sistemi bilinçli olarak reddedildi. Kullanıcı iş bulduğunda uygulamayı bırakmak ister. Streak kırılma korkusu bu "mutlu bitiş"i cezalandırır. Hedef kullanıcı motivasyonu zaten yüksek — yapay bağımlılık değil, gerçek değer isteniyor.

---

## 12. Monetizasyon Stratejisi

### v1: Ücretsiz

v1.0 tamamen ücretsiz. Önce kullanıcı kazanmak, sonra monetize etmek.

### v2 Seçenekleri (Değerlendirme Aşaması)

| Model | Açıklama | Avantaj | Dezavantaj |
|-------|---------|---------|------------|
| Freemium | Temel özellikler ücretsiz, analiz premium | Geniş kullanıcı tabanı | Ücretsiz tier yeterli gelirse dönüşüm düşük |
| Abonelik | Aylık ₺29-49 | Tahmin edilebilir gelir | Genç kitle ödeme direnci |
| One-time | ₺99 ömür boyu | Basit, kullanıcı dostu | Tekrarlayan gelir yok |
| B2B | Üniversite kariyer merkezleri | Yüksek birim gelir | Satış döngüsü uzun |

---

## 13. Go-to-Market Stratejisi

### Kanallar

| Kanal | Taktik | Maliyet | Öncelik |
|-------|--------|---------|---------|
| LinkedIn organik | "Ben bu uygulamayı yaptım" içerik serisi | ₺0 | Çok Yüksek |
| Youthall community | Genç profesyonel toplulukları | ₺0 | Yüksek |
| Twitter/X | İş arama thread'leri | ₺0 | Yüksek |
| App Store Optimizasyonu | Anahtar kelime: iş başvuru takip | ₺0 | Yüksek |
| Üniversite kariyer kulüpleri | DM/email tanıtım | ₺0 | Orta |

### Launch Mesajı

> **Ana mesaj:** "Başvurularını Excel'e yazmayı bırak."

Destekleyici mesajlar:
- "Kariyer.net, Youthall, Anbean — hepsini tek yerden takip et"
- "Hangi aşamada elendiğini artık biliyorsun"
- "Geçmiş başvurun, geleceğin stratejisi"

---

## 14. Kapsam Dışı Karar Kayıtları

| Karar | Gerekçe | Yeniden Değerlendirme |
|-------|---------|----------------------|
| LinkedIn oto doldur yok | Aktif scraping engeli, hukuki ve teknik risk | v2: resmi API araştırma |
| İlan aggregation yok | Platform API'si yok, partnership 2.5 ayda kurulamaz | v3: partnership stratejisi |
| Web uygulaması yok | Mobil öncelikli, kaynak yetersiz | v2: React web |
| AI ilan tavsiyesi yok | Veri birikimi yetersiz | v2: Anthropic API |
| Streak sistemi yok | Kullanıcı psikolojisiyle çelişiyor | Kalıcı red |
| Sosyal özellikler yok | Gizlilik öncelikli ürünle çelişiyor | v3: opsiyonel |
| CV builder yok | Farklı ürün kategorisi | Bağımsız ürün fırsatı |
| Offline tam destek yok | Supabase gerçek zamanlı bağlantı gerektirir | v2: offline-first mimari |

---

## 15. Sözlük

| Terim | Tanım |
|-------|-------|
| MVP | Minimum Viable Product — kullanıcıya temel değeri sunan en küçük çalışan ürün |
| Kanban | Görevlerin aşamalara göre sütunlarda görüntülendiği görsel yönetim yöntemi |
| DAU/MAU | Daily/Monthly Active Users — günlük-aylık aktif kullanıcı oranı |
| Retention | Kullanıcının uygulamayı belirli gün sonra hâlâ kullanması |
| Edge Function | Supabase'in sunucusuz (serverless) Deno fonksiyonu |
| RLS | Row Level Security — veritabanı satır bazlı erişim kontrolü |
| Oto Doldur | Link yapıştırılınca ilanın bilgilerinin otomatik çekilmesi |
| Scraping | Web sayfasından veri çekme işlemi |
| EAS | Expo Application Services — App Store/Play deploy altyapısı |
| Funnel | Kullanıcının süreçten geçiş oranını gösteren huni görselleştirmesi |
| DAU/MAU | Daily/Monthly Active Users oranı |
| Cohort | Aynı dönemde kaydolan kullanıcı grubu |
| Deep Link | Uygulama içinde belirli ekrana doğrudan açılan bağlantı |
| Cold Start | Uygulamanın bellekten temizlenmiş halde ilk açılışı |

---

*AppTrack MVP Kapsam Dokümanı — v1.0 | Nisan 2026*
