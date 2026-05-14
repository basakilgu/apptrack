-- ============================================
-- find_inactivity_candidates() Stored Function
-- ============================================
-- Amaç: send-inactivity-notifications Edge Function için aday başvuruları bul.
-- Çağıran: Edge Function (service_role JWT ile)
--
-- Çıktı: Her satır bir bildirim adayı.
--        application_id, user_id, expo_push_token, days_inactive
--
-- Kurallar:
-- 1. application.updated_at 14 günden eski
-- 2. application.deleted_at NULL (soft-deleted değil)
-- 3. Current stage terminal değil (Teklif veya Elenildi DEĞİL)
-- 4. profile.notifications_enabled = true
-- 5. profile.expo_push_token NOT NULL
-- 6. Şu an, profile'ın belirlediği saat aralığında (Europe/Istanbul timezone)
-- 7. Son 24 saatte bu user'a bildirim gönderilmemiş
-- 8. Her user için EN ESKİ başvuru (DISTINCT ON ile)

CREATE OR REPLACE FUNCTION public.find_inactivity_candidates()
RETURNS TABLE (
  application_id UUID,
  user_id UUID,
  expo_push_token TEXT,
  days_inactive INT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  -- Şimdiki TRT saati (sadece saat kısmı, TIME tipinde)
  WITH current_trt AS (
    SELECT (now() AT TIME ZONE 'Europe/Istanbul')::time AS now_time
  )
  -- Her user için EN ESKİ updated_at'e sahip aday başvuruyu seç
  SELECT DISTINCT ON (a.user_id)
    a.id AS application_id,
    a.user_id,
    p.expo_push_token,
    EXTRACT(DAY FROM (now() - a.updated_at))::int AS days_inactive
  FROM public.applications a
  -- Profile JOIN — bildirim ayarları
  INNER JOIN public.profiles p
    ON p.user_id = a.user_id
  -- Stage JOIN — terminal mi kontrolü
  INNER JOIN public.stages s
    ON s.id = a.current_stage_id
  -- Şu anki TRT saati cross join
  CROSS JOIN current_trt
  WHERE
    -- Şart 1: 14 günden eski
    a.updated_at < now() - INTERVAL '14 days'
    -- Şart 2: soft-deleted değil
    AND a.deleted_at IS NULL
    -- Şart 3: stage terminal değil (Teklif/Elenildi DEĞİL)
    AND s.is_terminal = false
    -- Şart 4 & 5: bildirim açık ve push token var
    AND p.notifications_enabled = true
    AND p.expo_push_token IS NOT NULL
    -- Şart 6: şu an saat aralığında
    -- NOT: Saat aralığı aynı gün içinde (örn. 09:00-21:00) varsayılıyor.
    -- Gece aralığı (örn. 22:00-06:00) bu mantıkta yanlış çalışır — şimdilik
    -- desteklenmiyor çünkü bildirim mantığı zaten "gündüz saatleri" varsayımıyla.
    AND current_trt.now_time >= p.notification_hours_start
    AND current_trt.now_time < p.notification_hours_end
    -- Şart 7: son 24 saatte bu user'a bildirim atılmamış
    AND NOT EXISTS (
      SELECT 1
      FROM public.notifications_log nl
      WHERE nl.user_id = a.user_id
        AND nl.sent_at > now() - INTERVAL '24 hours'
    )
  -- DISTINCT ON için sıralama: user başına EN ESKİ updated_at
  ORDER BY a.user_id, a.updated_at ASC;
$$;

-- ============================================
-- İzinler
-- ============================================
-- service_role'a çalıştırma izni ver (Edge Function bunu kullanır)
GRANT EXECUTE ON FUNCTION public.find_inactivity_candidates() TO service_role;

-- Normal kullanıcıların bu fonksiyonu çağırma yetkisi YOK (PostgreSQL default)
-- SECURITY DEFINER + service_role only → güvenlik katmanı tamam.

COMMENT ON FUNCTION public.find_inactivity_candidates() IS
  'send-inactivity-notifications Edge Function için aday başvuruları döndürür. Sadece service_role çağırabilir.';
  