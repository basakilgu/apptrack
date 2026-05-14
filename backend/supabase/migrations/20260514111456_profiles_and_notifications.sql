-- ============================================
-- Applyze: Profiles ve Bildirim Logu
-- Versiyon: v3 (Sprint 3 hazırlık)
-- Tarih: 2026-05-14
-- ============================================

-- ============================================
-- 1. TABLOLAR
-- ============================================

-- Kullanıcı profilleri (bildirim ayarları)
-- user_id'yi PK olarak kullanıyoruz çünkü her user için tek satır olmalı
CREATE TABLE public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  expo_push_token TEXT,
  notifications_enabled BOOLEAN DEFAULT false,
  notification_hours_start TIME DEFAULT '09:00',
  notification_hours_end TIME DEFAULT '21:00',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Bildirim gönderim logu
-- "günde max 1 bildirim" kontrolü için gerekli
CREATE TABLE public.notifications_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now(),
  opened BOOLEAN DEFAULT false,
  opened_at TIMESTAMPTZ
);

-- ============================================
-- 2. İNDEKSLER
-- ============================================

-- "Bu user'a bugün bildirim attık mı?" sorgusu için
CREATE INDEX idx_notifications_log_user_sent 
  ON public.notifications_log(user_id, sent_at DESC);

-- ============================================
-- 3. updated_at TRIGGER (profiles için)
-- ============================================

-- Mevcut update_updated_at_column() fonksiyonunu yeniden kullanıyoruz
CREATE TRIGGER trigger_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 4. RLS — profiles
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 5. RLS — notifications_log
-- ============================================

ALTER TABLE public.notifications_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notification log"
  ON public.notifications_log FOR SELECT
  USING (auth.uid() = user_id);

-- Kullanıcı kendi log kaydını update edebilir (örn. opened=true işaretlemek için)
CREATE POLICY "Users can update their own notification log"
  ON public.notifications_log FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- NOT: INSERT policy yok. Sadece service_role (cron + edge function) insert eder.
-- Service role RLS'i bypass ettiği için ek policy gerekmez.

-- ============================================
-- 6. YENİ KULLANICI İÇİN OTOMATİK PROFILE
-- ============================================

CREATE OR REPLACE FUNCTION public.create_profile_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Mevcut on_auth_user_created trigger'ı stages için. Bu yeni trigger profile için.
-- Aynı event'te iki trigger paralel çalışabilir, sorun yok.
CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_profile_for_new_user();

-- ============================================
-- 7. BACKFILL (var olan kullanıcılar için)
-- ============================================

-- Test user'ın profili zaten yoktu (trigger şimdi eklendi).
-- Onun ve varsa diğer mevcut user'ların profilini elle ekliyoruz.
INSERT INTO public.profiles (user_id)
SELECT id FROM auth.users
ON CONFLICT (user_id) DO NOTHING;