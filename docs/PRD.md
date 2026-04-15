# AppTrack — Product Requirements Document (PRD)

**Versiyon:** v1.0  
**Durum:** ONAYLANDI  
**Tarih:** Nisan 2026  
**Ürün:** AppTrack  

---

## İçindekiler

1. [Değişiklik Geçmişi](#1-değişiklik-geçmişi)
2. [Ürün Genel Bakış](#2-ürün-genel-bakış)
3. [Hedefler ve Başarı Kriterleri](#3-hedefler-ve-başarı-kriterleri)
4. [Kullanıcı Personaları](#4-kullanıcı-personaları)
5. [Epikler ve Özellik Haritası](#5-epikler-ve-özellik-haritası)
6. [Fonksiyonel Gereksinimler](#6-fonksiyonel-gereksinimler)
7. [Kullanıcı Hikayeleri](#7-kullanıcı-hikayeleri)
8. [Fonksiyonel Olmayan Gereksinimler (NFR)](#8-fonksiyonel-olmayan-gereksinimler-nfr)
9. [Tasarım Gereksinimleri](#9-tasarım-gereksinimleri)
10. [Veri Gereksinimleri](#10-veri-gereksinimleri)
11. [Teknik Kısıtlamalar ve Bağımlılıklar](#11-teknik-kısıtlamalar-ve-bağımlılıklar)
12. [Yayın Kabul Kriterleri](#12-yayın-kabul-kriterleri)
13. [Kapsam Dışı Kararlar](#13-kapsam-dışı-kararlar)
14. [Sözlük](#14-sözlük)

---

## 1. Değişiklik Geçmişi

| Versiyon | Tarih | Değişiklik |
|---------|-------|-----------|
| v0.1 | Mart 2026 | İlk taslak — vizyon ve persona bölümleri |
| v0.2 | Mart 2026 | Epikler, fonksiyonel gereksinimler, user story'ler |
| v0.3 | Nisan 2026 | NFR'lar, tasarım gereksinimleri, veri modeli |
| v1.0 | Nisan 2026 | Final — tüm bölümler tamamlandı, kabul kriterleri eklendi |

---

## 2. Ürün Genel Bakış

### 2.1 Ürün Tanımı

> AppTrack, Türkiye'deki iş arayanların LinkedIn, Kariyer.net, Youthall ve Anbean gibi birden fazla platformdaki iş başvurularını tek bir mobil uygulamada takip etmelerini, süreçlerini yönetmelerini ve kariyer verilerini analiz etmelerini sağlayan iOS ve Android için geliştirilmiş mobil uygulamadır.

### 2.2 Vizyon & Misyon

| | |
|--|--|
| **Vizyon** | Türkiye'deki her iş arayanın kariyer sürecini şeffaf, ölçülebilir ve stratejik hale getirmek. |
| **Misyon** | Dağınık iş arama sürecini anlamlı veriye dönüştüren, Türk platformlarını destekleyen, gizlilik öncelikli en iyi mobil kariyer takip aracı olmak. |
| **Kuzey Yıldızı** | Kullanıcı başına aylık aktif başvuru sayısı. |

### 2.3 Çözülen Problemler

| Problem | Etkilenen Kullanıcı | Çözüm |
|--------|-------------------|-------|
| 4-5 farklı platformu ayrı takip etmek | Tüm kullanıcılar | Tek uygulama, çoklu platform |
| Başvuru geçmişinin olmaması | Tüm kullanıcılar | Kalıcı arşiv, silinmeyen veri |
| Hangi aşamada elenildiğini bilmemek | Aktif iş arayanlar | Elenme analizi ve funnel |
| Patrona sezdirme korkusu | Çalışırken iş arayanlar | Gizlilik öncelikli bildirim |
| Türk platformlarını destekleyen araç yok | Türkiye pazarı | Yerel scraper |

### 2.4 Kapsam

| | |
|--|--|
| **Kapsam İÇİ** | Başvuru ekleme (link+manuel), aşama takibi (Kanban), arşiv, dashboard, elenme analizi, bildirimler, duplicate uyarısı, özelleştirilebilir aşamalar, başvuru detayı |
| **Kapsam DIŞI** | LinkedIn oto doldur, ilan aggregation, sosyal özellikler, CV builder, web uygulaması, AI tavsiye, streak sistemi |
| **Platform** | iOS 16+ ve Android 10+ |
| **Dil** | Türkçe (v1) |
| **Monetizasyon** | v1'de tamamen ücretsiz |

---

## 3. Hedefler ve Başarı Kriterleri

### 3.1 İş Hedefleri

1. İlk 3 ayda 500+ organik indirme (App Store + Google Play)
2. İlk 3 ayda 300+ kayıtlı kullanıcı
3. Kullanıcı başına aylık ortalama 8+ başvuru kaydı
4. App Store'da 4.2+ puan, ilk 90 günde
5. DAU/MAU oranı > %40

### 3.2 OKR Çerçevesi

| Amaç | Anahtar Sonuç | Hedef | Ölçüm |
|------|-------------|-------|-------|
| Kullanıcı tabanı oluştur | Kayıtlı kullanıcı sayısı | 300 | Supabase Auth |
| Kullanıcı tabanı oluştur | 7. gün retention | ≥%50 | Amplitude cohort |
| Temel değeri kanıtla | Kullanıcı başına başvuru/ay | ≥8 | DB query |
| Temel değeri kanıtla | Oto doldur başarısı (Kariyer.net) | ≥%80 | Edge Function log |
| Kaliteyi sağla | App Store puanı | ≥4.2 | App Store Connect |
| Kaliteyi sağla | Crash rate | <%0.5 | Expo Crash |

### 3.3 Metrik Tanımları

| Metrik | Tanım | Ölçüm |
|--------|-------|-------|
| DAU/MAU | Günlük aktif / aylık aktif oran. %40 hedef. | Amplitude |
| 7. Gün Retention | Kaydolan kullanıcıların 7. günde hâlâ aktif olma oranı. | Cohort analizi |
| Oto Doldur Başarısı | Link yapıştırılınca alanların doğru dolma oranı. | Edge Function log |
| Kuzey Yıldızı | Kullanıcı başına aylık aktif başvuru sayısı. | Supabase query |

---

## 4. Kullanıcı Personaları

### 4.1 Birincil Persona — Çalışırken İş Arayan Yeni Mezun

| Özellik | Detay |
|--------|-------|
| **İsim** | Ayşe Yılmaz, 23 yaş, İstanbul |
| **Meslek** | Süreç Tasarım Uzmanı, tam zamanlı çalışıyor (8 ay) |
| **Eğitim** | Endüstri Mühendisliği mezunu |
| **Teknoloji** | iPhone kullanıcısı, mobil-first davranış |
| **İş arama** | 4 aydır aktif olarak arıyor |
| **Platformlar** | LinkedIn, Kariyer.net, Youthall, Anbean |
| **Aktif saat** | Akşam 21:00–23:00 ve öğle molası 12:30–13:00 |
| **Mevcut araç** | Notes + Excel (dağınık, yetersiz) |

| Boyut | Detay |
|-------|-------|
| Motivasyon | Daha iyi kariyer fırsatı. Liderlik programları, büyük şirket, uluslararası fırsat. |
| Hedef | Ayda 15-20 nitelikli başvuru, 2-3 mülakat. Stratejiyle iş aramak. |
| Engeller | Sınırlı zaman, patronun fark etme korkusu, hangi platformda ne başvurduğunu unutma. |
| Teknoloji yetkinliği | Yüksek — ama uzun onboarding'de vazgeçiyor. |
| Ödeme isteği | Ücretsiz başlamasını bekliyor. Premium için aylık ₺30-50 makul. |

**Ayşe'nin Sözleri:**
> "Her sabah 4-5 farklı uygulamayı açıyorum, hangisine başvurmuştum bilmiyorum."

> "HR görüşmesinde eleniyorum genelde ama neden bilmiyorum. Bir pattern var mı acaba?"

> "Telefonu masada bırakınca amirimin bildirimi görmesinden korkuyorum."

> "3 ay önce başvurduğum şirkete tekrar başvurdum. Aynı şirkete iki kez başvurmuştum."

### 4.2 İkincil Persona — Yeni Mezun, İlk İşini Arayan

| Özellik | Detay |
|--------|-------|
| **İsim** | Mehmet Kaya, 22 yaş, Ankara |
| **Meslek** | İşletme mezunu, ilk işini arıyor (6 aydır) |
| **Durum** | Tam zamanlı iş arama, çalışmıyor |
| **Teknoloji** | Android kullanıcısı |
| **Platformlar** | Youthall ağırlıklı, LinkedIn, Kariyer.net |
| **Başvuru hacmi** | Haftada 20-30 başvuru (yüksek hacim) |
| **Mevcut araç** | Google Sheets (artık yönetilemez durumda) |

> Mehmet'in temel ihtiyacı: Yüksek hacimli başvuruları organize etmek. Başvuru eklemenin çok hızlı ve sürtünmesiz olması kritik. Günde 5-6 başvuru ekleyebilmeli.

### 4.3 Persona Karşılaştırması

| Boyut | Ayşe (Birincil) | Mehmet (İkincil) |
|-------|----------------|-----------------|
| Durum | Çalışırken iş arıyor | Yalnızca iş arıyor |
| Başvuru hacmi | Haftada 5-10 (seçici) | Haftada 20-30 (hacimli) |
| Öncelikli özellik | Analiz ve gizlilik | Hızlı ekleme ve organizasyon |
| Gizlilik ihtiyacı | Çok yüksek | Düşük |
| Analiz ihtiyacı | Yüksek | Orta |
| Ödeme isteği | Orta | Düşük |
| Tasarım önceliği | Bildirim gizliliği | Hızlı giriş ve yükleme |

---

## 5. Epikler ve Özellik Haritası

> **MoSCoW Tanımları:**
> - **Must** — Olmadan ürün değer üretemiyor. MVP'nin çekirdeği.
> - **Should** — Önemli ama olmadan yayına alınabilir.
> - **Could** — İyi olur ama zaman ve kaynak varsa.
> - **Won't** — Bu sürümde kesinlikle hayır.

### EP-01: Kimlik Doğrulama & Kullanıcı Yönetimi
*Kullanıcının güvenli kayıt/giriş ve veri izolasyonu.*

| Özellik ID | Özellik Adı | Öncelik | Sprint |
|-----------|------------|---------|--------|
| F-01 | Email & şifre ile kayıt | Must | S1 |
| F-02 | Google OAuth girişi | Must | S1 |
| F-03 | Oturum yönetimi (30 gün) | Must | S1 |
| F-04 | Şifre sıfırlama | Should | S1 |
| F-05 | Hesap silme ve veri imhası | Should | S2 |
| F-06 | Profil düzenleme | Could | S3 |

### EP-02: Başvuru Yönetimi
*İş başvurularının eklenip güncellenebildiği temel CRUD işlemleri.*

| Özellik ID | Özellik Adı | Öncelik | Sprint |
|-----------|------------|---------|--------|
| F-07 | Link → oto doldur (Kariyer.net) | Must | S1 |
| F-08 | Link → oto doldur (Youthall) | Must | S1 |
| F-09 | Link → oto doldur (Anbean) | Should | S1 |
| F-10 | Manuel ilan ekleme formu | Must | S1 |
| F-11 | Başvuru düzenleme | Must | S1 |
| F-12 | Başvuru detay sayfası | Must | S2 |
| F-13 | Not ekleme (başvuru bazlı) | Should | S2 |
| F-14 | İletişim kişisi kaydetme | Could | S3 |
| F-15 | Mülakat tarihi ve hatırlatıcı | Could | S3 |
| F-16 | Belge ekleme | Won't | — |

### EP-03: Görüntüleme ve Navigasyon
*Başvuruların farklı bakış açılarıyla incelenebildiği ekranlar.*

| Özellik ID | Özellik Adı | Öncelik | Sprint |
|-----------|------------|---------|--------|
| F-17 | Kanban board | Must | S1 |
| F-18 | Sürükle-bırak aşama değiştirme | Must | S1 |
| F-19 | Başvuru arşivi (liste) | Must | S1 |
| F-20 | Arşiv arama | Must | S1 |
| F-21 | Arşiv filtreleme | Should | S2 |
| F-22 | Dashboard ana ekran | Must | S1 |
| F-23 | Platform renk kodlaması | Should | S1 |
| F-24 | Başvuru sıralama seçenekleri | Could | S2 |

### EP-04: Analitik ve İçgörü
*Kullanıcının biriken veriden anlam çıkarabilmesi.*

| Özellik ID | Özellik Adı | Öncelik | Sprint |
|-----------|------------|---------|--------|
| F-25 | Dashboard metrik kartları | Must | S2 |
| F-26 | Aşama dağılımı grafiği | Should | S2 |
| F-27 | Elenme analizi funneli | Should | S3 |
| F-28 | Pozisyon/sektör başarı karşılaştırması | Should | S3 |
| F-29 | Ortalama geri dönüş süresi | Could | S3 |
| F-30 | AI kişisel öneri metni | Won't | — |

### EP-05: Bildirimler ve Engagement
*Günlük kullanım ve önemli olaylar için bildirim sistemi.*

| Özellik ID | Özellik Adı | Öncelik | Sprint |
|-----------|------------|---------|--------|
| F-31 | Hareketsizlik push bildirimi | Should | S3 |
| F-32 | Bildirim gizlilik modu | Must | S3 |
| F-33 | Duplicate ilan uyarısı | Should | S3 |
| F-34 | Özelleştirilebilir aşamalar | Should | S2 |
| F-35 | Bildirim ayarları | Should | S3 |
| F-36 | Streak sistemi | Won't | — |

---

## 6. Fonksiyonel Gereksinimler

### 6.1 Kimlik Doğrulama (AUTH)

| ID | Gereksinim | Öncelik | Kabul Kriteri |
|----|-----------|---------|--------------|
| AUTH-01 | Email ve şifre ile kayıt | Must | Email format doğrulanır. Şifre min 8 karakter, 1 büyük harf, 1 rakam. Onay maili gider. |
| AUTH-02 | Google OAuth girişi | Must | Flow 3 sn altında. İlk girişte profil otomatik oluşturulur. |
| AUTH-03 | Oturum 30 gün açık kalmalı | Must | Refresh token ile 30 gün. Kullanıcı çıkış yapana kadar şifre sorulmaz. |
| AUTH-04 | 5 başarısız girişte 15 dk blok | Must | 6. denemede blok uygulanır. Kalan süre gösterilir. |
| AUTH-05 | Şifre sıfırlama maili | Should | Link 24 saat geçerli. Kullanıldıktan sonra geçersiz. |
| AUTH-06 | Hesap silme | Should | Onay ekranı. 30 gün soft delete → hard delete. |

### 6.2 Başvuru Ekleme (ADD)

| ID | Gereksinim | Öncelik | Kabul Kriteri |
|----|-----------|---------|--------------|
| ADD-01 | Kariyer.net linki oto doldurmalı | Must | Başarı ≥%80. Timeout 10 sn. Başarısızlıkta manuel yönlendirme. |
| ADD-02 | Youthall linki oto doldurmalı | Must | ADD-01 ile aynı kriter. |
| ADD-03 | Anbean linki oto doldurmalı | Should | Başarı ≥%70. |
| ADD-04 | LinkedIn için direkt manuel akışa geçilmeli | Must | LinkedIn URL tespit edilince scraping denenmez. 'Desteklenmiyor' mesajı. |
| ADD-05 | Şirket + pozisyon zorunlu alan | Must | Boş bırakılınca form kaydedilmez. Alan kırmızı. Hata mesajı Türkçe. |
| ADD-06 | Platform dropdown | Should | LinkedIn, Kariyer.net, Youthall, Anbean, Şirket Sitesi, Diğer. |
| ADD-07 | Başvuru tarihi varsayılan bugün | Should | Tarih picker ile geçmişe dönük ekleme desteklenir. |
| ADD-08 | Not alanı opsiyonel | Should | Max 500 karakter. Sayaç gösterilir. |

### 6.3 Kanban ve Aşama Yönetimi (KAN)

| ID | Gereksinim | Öncelik | Kabul Kriteri |
|----|-----------|---------|--------------|
| KAN-01 | Başvurular aşama sütunlarında görüntülenmeli | Must | Sütun başında başvuru sayısı. Varsayılan aşamalar hazır. |
| KAN-02 | Sürükle-bırak ile aşama güncellenebilmeli | Must | Haptic feedback. Animasyonlu geçiş. 50 kartlı board'da ≥60fps. |
| KAN-03 | Karta tap ile detay açılmalı | Must | Modal veya push navigation. |
| KAN-04 | Kartlarda şirket, pozisyon, göreli tarih | Must | '5 gün önce' formatı. Platform renk kodu. |
| KAN-05 | Long press ile hızlı aşama menüsü | Should | Bottom sheet. Mevcut aşama işaretli. |
| KAN-06 | 'Elenildi' sütunu görsel olarak ayrışmalı | Should | Gri ton. Demotive etmeden ayrıştırma. |

### 6.4 Arşiv (ARCH)

| ID | Gereksinim | Öncelik | Kabul Kriteri |
|----|-----------|---------|--------------|
| ARCH-01 | Tüm başvurular liste görünümünde | Must | Son güncellemeye göre sıralı. Lazy load. |
| ARCH-02 | Şirket veya pozisyon adıyla arama | Must | 300ms debounce. Anlık filtreleme. |
| ARCH-03 | Platform ve aşamaya göre filtreleme | Should | Çoklu seçim desteklenen chip'ler. |
| ARCH-04 | Başvurular silinemez | Must | Silme butonu olmaz. 'Arşiv kalıcıdır' açıklaması. |
| ARCH-05 | 100+ başvuruda performans düşmemeli | Must | Virtual list rendering. |

### 6.5 Başvuru Detayı (DET)

| ID | Gereksinim | Öncelik | Kabul Kriteri |
|----|-----------|---------|--------------|
| DET-01 | Tüm başvuru bilgileri tek ekranda | Must | Şirket, pozisyon, platform, tarih, aşama, URL, notlar. |
| DET-02 | Aşama geçmiş kronolojisi | Must | 'HR → Teknik Mülakat (3 Mart)' timeline. En yeni üstte. |
| DET-03 | Not eklenip görüntülenebilmeli | Should | Zaman damgalı. Birden fazla not. Max 2000 karakter. |
| DET-04 | 'İlanı Aç' butonu | Should | İlan silinmişse uyarı gösterilir. |
| DET-05 | Mülakat tarihi ve saati | Could | Tarih-saat picker. Takvime ekle seçeneği. |

### 6.6 Analitik ve Dashboard (ANL)

| ID | Gereksinim | Öncelik | Kabul Kriteri |
|----|-----------|---------|--------------|
| ANL-01 | Dashboard metrik kartları | Must | Bu ay / bu hafta / toplam sayaçlar. Gerçek zamanlı. |
| ANL-02 | Dashboard her açılışta anlamlı içerik | Must | 0 başvuruda CTA. 1+ başvuruda metrikler. |
| ANL-03 | Aşama dağılımı grafiği | Should | Bar veya donut chart. Aşama renkleriyle eşleşir. |
| ANL-04 | Elenme funneli | Should | Min 10 tamamlanmış başvuru. Altında 'yetersiz veri' mesajı. |
| ANL-05 | Pozisyon bazlı başarı karşılaştırması | Should | Min 5 başvuru/pozisyon. Bar chart. |

### 6.7 Bildirimler (NOT)

| ID | Gereksinim | Öncelik | Kabul Kriteri |
|----|-----------|---------|--------------|
| NOT-01 | 14+ gün güncelleme yok bildirimi | Should | Varsayılan 14 gün. 7/14/21/30 gün seçenekleri. Elenildi hariç. |
| NOT-02 | Bildirim önizlemesi şirket adı içermemeli | Must | Önizleme: 'AppTrack — Takip edilecek başvurular var.' |
| NOT-03 | Tap ile deep link | Should | Direkt başvuru detay ekranı. Uygulama kapalıysa açılır. |
| NOT-04 | 09:00-21:00 arası bildirim | Should | Kullanıcı time zone'u referans. |
| NOT-05 | Bildirimler ayarlardan kapatılabilmeli | Should | Toggle. Kapalıyken uygulama içi banner. |

### 6.8 Özelleştirilebilir Aşamalar (STG)

| ID | Gereksinim | Öncelik | Kabul Kriteri |
|----|-----------|---------|--------------|
| STG-01 | Varsayılan 5 aşama hazır gelmeli | Must | Başvuruldu, HR Görüşmesi, Teknik Mülakat, Teklif Aşaması, Elenildi. |
| STG-02 | Aşama adı düzenlenebilmeli | Should | Inline edit. Max 40 karakter. |
| STG-03 | Yeni aşama eklenebilmeli | Should | '+' buton. İsim + renk. Max 12 aşama. |
| STG-04 | Aşama silinince içindekiler taşınmalı | Should | 'Bu başvurular nereye taşınsın?' sorusu. Silme bloklanmaz. |
| STG-05 | En az 2 aşama zorunlu | Must | Son aşama silinemez. |

### 6.9 Duplicate Uyarısı (DUP)

| ID | Gereksinim | Öncelik | Kabul Kriteri |
|----|-----------|---------|--------------|
| DUP-01 | Aynı URL eklenince uyarı | Should | URL eşleşmesi. Modal uyarı + önceki başvuru özeti. |
| DUP-02 | Şirket+pozisyon eşleşmesi 90 gün içinde | Should | %85+ fuzzy match. 90 gün penceresi. |
| DUP-03 | Uyarıya rağmen eklenebilmeli | Must | 'Yine de Ekle' her zaman mevcut. Engelleme yapılmaz. |
| DUP-04 | Daha önce elenilen ilana özel mesaj | Should | 'Bu pozisyondan önceden elendin (Aşama X, Tarih Y)' mesajı. |

---

## 7. Kullanıcı Hikayeleri

> Format: *"Bir [kullanıcı türü] olarak, [hedef] için [eylem] yapmak istiyorum."*

### EP-01: Kimlik Doğrulama

| # | User Story | Kabul Kriteri | Öncelik |
|---|-----------|--------------|---------|
| 1 | Bir iş arayan olarak, email ve şifremle kayıt olabilmek istiyorum ki verilerimi güvende tutayım. | Email doğrulanır. Şifre kriteri karşılanır. Onay maili gider. Dashboard'a yönlendirilir. | Must |
| 2 | Bir kullanıcı olarak, Google ile tek tıkta giriş yapmak istiyorum ki şifre hatırlamayayım. | OAuth flow 3 sn altında. İlk girişte profil oluşturulur. | Must |
| 3 | Bir kullanıcı olarak, her açışımda giriş yapmak istemiyorum. | 30 günlük oturum. Kullanıcı çıkış yapana kadar token geçerli. | Must |
| 4 | Bir kullanıcı olarak, şifremi unutunca sıfırlayabilmek istiyorum. | Mail 5 dk içinde gelir. Link 24 saat geçerli. | Should |

### EP-02: Başvuru Yönetimi

| # | User Story | Kabul Kriteri | Öncelik |
|---|-----------|--------------|---------|
| 1 | Aktif iş arayan olarak, Kariyer.net linkini yapıştırıp bilgilerin otomatik dolmasını istiyorum. | Şirket, pozisyon, lokasyon 3 sn içinde dolar. Başarısızlıkta açıklayıcı mesaj. | Must |
| 2 | Bir kullanıcı olarak, LinkedIn ilanlarını da ekleyebilmek istiyorum, link çalışmasa bile. | LinkedIn URL tespit edilir. Manuel forma yönlendirilir. Net mesaj gösterilir. | Must |
| 3 | Patron dikkatine karşı temkinli kullanıcı olarak, ekleme sürecinin çok kısa sürmesini istiyorum. | En kısa akış: link yapıştır → tek onay. 10 saniyenin altında. | Must |
| 4 | Bir kullanıcı olarak, başvuruyu eklerken not bırakabilmek istiyorum. | Opsiyonel not alanı. Max 500 karakter. | Should |
| 5 | Bir kullanıcı olarak, 3 ay önce eklediğim başvuruyu düzenleyebilmek istiyorum. | Tüm başvurular düzenlenebilir. Zorunlu alanlar boş bırakılamaz. | Must |

### EP-03: Görüntüleme

| # | User Story | Kabul Kriteri | Öncelik |
|---|-----------|--------------|---------|
| 1 | Bir kullanıcı olarak, tüm başvurularımı aşamalara göre tek bakışta görmek istiyorum. | Kanban board. Sütun başında sayı. Kart formatında şirket+pozisyon. | Must |
| 2 | Bir kullanıcı olarak, başvuruyu HR'dan Teknik'e sürükleyerek taşımak istiyorum. | Drag & drop çalışır. Haptic + animasyon. 50 kartlı board'da sorunsuz. | Must |
| 3 | Bir kullanıcı olarak, '3 ay önce hangi şirkete başvurmuştum?' sorusunu 5 sn cevaplayabilmek istiyorum. | Arşiv arama: şirket adı yazınca anlık sonuç. 300ms debounce. | Must |
| 4 | Bir kullanıcı olarak, sadece HR aşamasındakileri filtreleyebilmek istiyorum. | Filtre chip. Tek veya çoklu aşama seçimi. | Should |

### EP-04: Analitik

| # | User Story | Kabul Kriteri | Öncelik |
|---|-----------|--------------|---------|
| 1 | Bir kullanıcı olarak, 'Bu ay kaç başvuru yaptım?' sorusunu uygulamayı açınca görmek istiyorum. | Dashboard metrik kartları. Bu ay/hafta/toplam sayaçlar. Gerçek zamanlı. | Must |
| 2 | Stratejik kullanıcı olarak, hangi aşamada elendiğimi görsel görmek istiyorum. | Funnel chart. Min 10 tamamlanmış başvuru. Eksikse 'yetersiz veri'. | Should |
| 3 | Bir kullanıcı olarak, dashboard her açılışta boş değil anlamlı içerik göstermeli. | 0 başvuruda CTA. 1+ başvuruda kişisel metrikler. | Must |

### EP-05: Bildirimler

| # | User Story | Kabul Kriteri | Öncelik |
|---|-----------|--------------|---------|
| 1 | Çalışırken iş arayan olarak, patron bildirimi görse bile şirketi anlamamalı. | Önizleme: 'AppTrack — Takip edilecek başvurular var.' Şirket adı yok. | Must |
| 2 | Meşgul kullanıcı olarak, 14 gün haber alamadığım başvuru için hatırlatma almak istiyorum. | 14 gün eşik. 09:00-21:00. Elenildi hariç. | Should |
| 3 | Bir kullanıcı olarak, 3 ay önce başvurduğum şirkete tekrar başvurunca uyarı almak istiyorum. | URL veya şirket+pozisyon eşleşmesi. Modal. 'Yine de ekle' mevcut. | Should |

---

## 8. Fonksiyonel Olmayan Gereksinimler (NFR)

### 8.1 Performans

| ID | Gereksinim | Hedef | Test |
|----|-----------|-------|------|
| PERF-01 | Kanban ilk yükleme | < 2 sn (4G) | Profiler |
| PERF-02 | Oto doldur toplam süresi | < 4 sn (4G) | Edge Function log |
| PERF-03 | Arşiv arama yanıt | < 300ms debounce sonrası | Manuel |
| PERF-04 | Kanban scroll (50 kart) | ≥ 60fps | Xcode/Android profiler |
| PERF-05 | Cold start | < 3 sn | App Store/Play metrik |
| PERF-06 | Dashboard metrik hesaplama | < 1 sn | Supabase analyzer |

### 8.2 Güvenlik

| ID | Gereksinim | Uygulama |
|----|-----------|---------|
| SEC-01 | Veri izolasyonu | Supabase Row Level Security (RLS) |
| SEC-02 | Tüm trafik şifreli | TLS 1.3 |
| SEC-03 | Servis anahtarı client'a verilmez | Edge Functions environment variable |
| SEC-04 | Bildirim önizlemesi kişisel bilgi içermez | Expo Notification options |
| SEC-05 | Brute force koruması | 5 başarısız girişte 15 dk blok |
| SEC-06 | Scraping whitelist | Sadece izinli domainler |

### 8.3 Erişilebilirlik

| ID | Gereksinim | Standart |
|----|-----------|---------|
| ACC-01 | Min dokunma alanı 44x44pt | iOS HIG |
| ACC-02 | Metin-arka plan kontrast ≥4.5:1 | WCAG 2.1 AA |
| ACC-03 | VoiceOver / TalkBack desteği | WCAG 2.1 |
| ACC-04 | Dinamik yazı boyutu uyumu | iOS Dynamic Type |
| ACC-05 | Renk tek başına bilgi taşımaz | WCAG 1.4.1 |

### 8.4 Güvenilirlik ve Ölçeklenebilirlik

| ID | Gereksinim | Hedef |
|----|-----------|-------|
| REL-01 | Crash oranı | < %0.5 oturum/crash |
| REL-02 | Veri kaybı toleransı | Sıfır — hiçbir başvuru kaydı kaybolmamalı |
| REL-03 | Supabase uptime | ≥ %99.5 |
| SCAL-01 | Kullanıcı başına başvuru limiti | Sınırsız |
| SCAL-02 | Scraper modülerliği | Her platform bağımsız parser |

---

## 9. Tasarım Gereksinimleri

### 9.1 Tasarım İlkeleri

**1 — Sade ve Hızlı**  
Her ekranın tek birincil aksiyonu var. Ekleme 10 sn altında. Gürültü tolere edilmez.

**2 — Gizlilik Öncelikli**  
Bildirimler, ikon ve görünüm nötr. Tek bakışta "iş arama uygulaması" anlaşılmamalı.

**3 — Native Hissettir**  
iOS'ta iOS dili, Android'de Material 3. Platform konvansiyonları kırılmaz. Haptic feedback.

**4 — Veriyi Görsel Yap**  
Sayılar kadar görsel önemli. Analiz "tek bakışta anlama" sağlamalı.

### 9.2 Renk Sistemi

| Renk Amacı | Hex | Kullanım |
|-----------|-----|---------|
| Birincil (Teal) | `#0F6E56` | Butonlar, başlıklar, aktif tab |
| LinkedIn | `#0A66C2` | Platform chip / renk kodu |
| Kariyer.net | `#FF6600` | Platform chip / renk kodu |
| Youthall | `#7C3AED` | Platform chip / renk kodu |
| Anbean | `#059669` | Platform chip / renk kodu |
| Başarı / Teklif | `#059669` | Pozitif metrikler |
| Uyarı | `#D97706` | Yanıt bekleyenler |
| Elenildi | `#6B7280` | Elenildi aşaması — nötr gri |
| Hata | `#DC2626` | Form hataları |

### 9.3 Bileşen Gereksinimleri

| Bileşen | Gereksinim |
|--------|-----------|
| Kanban Kartı | Min 80pt. Şirket (bold), pozisyon, platform dot, göreli tarih. Long press menüsü. |
| Boş Ekran | Her boş ekran ikon + açıklama + CTA içermeli. |
| Hata Toast | Kırmızı, alt kısım, 3 sn, swipe ile kapatılabilir. |
| Loading Skeleton | Kart formunda iskelet animasyonu. Spinner değil. |
| Bottom Sheet | Aşama değiştirme için. Dismiss edilebilir. |
| Platform Chip | Platform rengiyle dot + isim. Küçük. |

### 9.4 Navigasyon Mimarisi

| Seviye | Tip | İçerik |
|--------|-----|-------|
| L0 | Tab Bar (5 tab) | Dashboard, Kanban, Arşiv, Analiz, Ayarlar |
| L1 | Stack Navigator | Her tab kendi stack'i |
| L2 | Bottom Sheet / Modal | Başvuru ekleme, detay |
| L3 | Deep Link | `apptrack://application/:id` — bildirim yönlendirmesi |

---

## 10. Veri Gereksinimleri

### 10.1 Veri Modeli

| Tablo | Temel Alanlar | İlişkiler |
|-------|-------------|---------|
| `users` | id (UUID PK), email, created_at | 1:N → applications |
| `applications` | id, user_id FK, company_name, position, platform, source_url, current_stage_id FK, applied_at, updated_at | N:1 → users, N:1 → stages |
| `stages` | id, user_id FK, name, color, order, is_terminal | N:1 → users, 1:N → applications |
| `stage_history` | id, application_id FK, stage_id FK, changed_at | N:1 → applications |
| `notes` | id, application_id FK, content (max 2000), created_at | N:1 → applications |

### 10.2 Veri Saklama Politikası

| Kural | Detay |
|-------|-------|
| Kullanıcı verisi | Hesap aktif iken saklanır. Silme: 30 gün soft delete → hard delete. |
| Başvuru verisi | Kullanıcı başvuruyu silemez. Hesap silinince silinir. |
| Bildirim logu | Son 90 gün saklanır. |
| Auth tokenleri | Access token 1 saat. Refresh token 30 gün. Çıkışta geçersiz. |
| Scraping geçici verisi | Client'a iletildikten sonra log tutulmaz. |

### 10.3 Analitik Veri Toplama

**Toplanan (anonim, kullanıcı rızasıyla):**
- Ekran görüntülenme sayısı
- Özellik kullanım oranları
- Oturum süresi ve sıklığı
- Crash logları

**TOPLANMAYAN:**
- Başvurulan şirket veya pozisyon adları
- Kişisel notlar
- İş arama içeriği

---

## 11. Teknik Kısıtlamalar ve Bağımlılıklar

### 11.1 Kısıtlamalar

| Kısıtlama | Etki | Çözüm |
|----------|------|-------|
| LinkedIn scraping engeli | LinkedIn oto doldur yok | Manuel ekleme akışı, kullanıcıya net mesaj |
| Kariyer.net resmi API yok | Scraping gerekiyor | Modüler Edge Function parser |
| Apple Developer ($99/yıl) | Sprint 1 başında açılmalı | Gün 1 görevi olarak planlandı |
| App Store inceleme 1-7 gün | Deploy tarihi kesin değil | Sprint 4'te 5 günlük buffer |
| Supabase ücretsiz tier | 500+ kullanıcıda limit aşılabilir | Pro plan ($25/ay) hazırda |

### 11.2 Dış Bağımlılıklar

| Bağımlılık | Tip | Risk |
|-----------|-----|------|
| Supabase | Backend/Auth/DB | Orta — servis kesintisi olasılığı |
| Kariyer.net (scraping) | Veri kaynağı | Yüksek — yapı değişebilir |
| Youthall (scraping) | Veri kaynağı | Orta |
| Expo Notifications | Push bildirim | Düşük |
| Apple App Store | Dağıtım | Düşük |
| Google Play | Dağıtım | Düşük |

---

## 12. Yayın Kabul Kriterleri

### 12.1 Fonksiyonel Kabul

| # | Kriter | Doğrulama | Sonuç |
|---|--------|-----------|-------|
| 1 | Email ile kayıt ve giriş çalışıyor | Manuel test — döngü | ☐ |
| 2 | Google OAuth iOS ve Android'de çalışıyor | Her iki platformda test | ☐ |
| 3 | Kariyer.net linki oto dolduruyor (5 farklı ilan) | 5 aktif ilan ile test | ☐ |
| 4 | Youthall linki oto dolduruyor | 5 aktif ilan ile test | ☐ |
| 5 | Manuel ilan ekleme çalışıyor | Form doldurma ve kaydetme | ☐ |
| 6 | Kanban board 10+ başvuruda çalışıyor | 10 başvuruyla test | ☐ |
| 7 | Sürükle-bırak tüm sütun kombinasyonlarında çalışıyor | Tüm geçişlerde test | ☐ |
| 8 | Arşiv arama 10+ başvuruda anlık çalışıyor | Farklı arama terimleriyle | ☐ |
| 9 | Dashboard metrikleri doğru hesaplanıyor | Bilinen veri setiyle doğrulama | ☐ |
| 10 | Push bildirim iOS ve Android'e ulaşıyor | TestFlight + internal test | ☐ |
| 11 | Bildirim önizlemesi şirket adı içermiyor | Kilitli ekranda kontrol | ☐ |
| 12 | Duplicate uyarısı tetikleniyor | Aynı URL ile iki kez ekleme | ☐ |

### 12.2 Performans Kabul

| # | Kriter | Hedef | Sonuç |
|---|--------|-------|-------|
| 1 | Kanban 50 kartla açılış | < 2 sn | ☐ |
| 2 | Oto doldur toplam süresi | < 4 sn | ☐ |
| 3 | Uygulama cold start | < 3 sn | ☐ |
| 4 | Beta test 7 gün crash yok | 0 crash | ☐ |

### 12.3 UX Kabul

| # | Kriter | Test Yöntemi | Sonuç |
|---|--------|-------------|-------|
| 1 | Yeni kullanıcı 5 dakikada ilk başvurusunu ekleyebilir | 5 kişiyle usability test | ☐ |
| 2 | Bildirim önizlemesi 3/3 test kullanıcısı tarafından içerik anlaşılmadan geçildi | Gizlilik testi | ☐ |
| 3 | Beta kullanıcılarının %50'si 7. günde hâlâ aktif | Cohort takibi | ☐ |

---

## 13. Kapsam Dışı Kararlar

| Karar | Gerekçe |
|-------|---------|
| LinkedIn oto doldur yok | Aktif scraping engeli — hukuki ve teknik risk. v2'de resmi API araştırılacak. |
| İlan aggregation yok | Platform API'si yok. Partnership 2.5 ayda kurulamaz. v3'te değerlendirilecek. |
| Web uygulaması yok | Mobil öncelikli. v2'de React web eklenir. |
| AI ilan tavsiyesi yok | Veri birikimi yetersiz. v2'de Anthropic API planlanıyor. |
| Streak sistemi yok | Kullanıcı iş bulunca bırakmak ister. Streak cezalandırır. Kalıcı red. |
| Sosyal özellikler yok | Gizlilik öncelikli tasarımla çelişir. v3'te opsiyonel. |
| CV builder yok | Farklı ürün kategorisi. Odak dağıtır. |
| Offline tam destek yok | Supabase gerçek zamanlı bağlantı gerektirir. v2'de offline-first mimari. |

---

## 14. Sözlük

| Terim | Tanım |
|-------|-------|
| PRD | Product Requirements Document — tüm ürün gereksinimlerinin tek referans dokümanı |
| MoSCoW | Must/Should/Could/Won't — önceliklendirme metodolojisi |
| NFR | Non-Functional Requirements — performans, güvenlik, erişilebilirlik gereksinimleri |
| Epic | İlgili özellikleri gruplayan üst düzey iş birimi |
| User Story | Kullanıcı perspektifinden gereksinim: 'Bir X olarak, Y için Z yapmak istiyorum' |
| Acceptance Criteria | Bir özelliğin tamamlandığını kanıtlayan ölçülebilir koşullar |
| RLS | Row Level Security — veritabanı satır bazlı erişim kontrolü |
| Oto Doldur | Link yapıştırılınca ilan bilgilerinin otomatik çekilmesi |
| Deep Link | Uygulama içinde belirli ekrana doğrudan açılan bağlantı |
| Cold Start | Uygulamanın bellekten silinmiş halde ilk açılışı |
| Haptic Feedback | Sürükle-bırak gibi eylemlerde titreşimli dokunsal geri bildirim |
| Edge Function | Supabase'in sunucusuz (serverless) Deno fonksiyonu |
| Soft Delete | Veriyi silmek yerine 'silinmiş' olarak işaretleme — geri alınabilir |
| Funnel | Kullanıcının süreçten geçiş oranını gösteren huni görselleştirmesi |
| DAU/MAU | Daily/Monthly Active Users oranı |
| Cohort | Aynı dönemde kaydolan kullanıcı grubu |
| EAS | Expo Application Services — App Store ve Google Play deploy altyapısı |

---

*AppTrack PRD — v1.0 | Nisan 2026*
