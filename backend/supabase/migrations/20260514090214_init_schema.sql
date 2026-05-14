-- ============================================
-- Applyze: İlk Şema Migrasyonu
-- Versiyon: v1.0
-- Tarih: 2026-05-14
-- ============================================

-- ============================================
-- 1. TABLOLAR
-- ============================================

-- Aşamalar tablosu (önce oluşturuluyor çünkü applications buna referans verecek)
CREATE TABLE public.stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT,
  "order" INT NOT NULL,
  is_terminal BOOLEAN DEFAULT false,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Başvurular tablosu
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  position TEXT NOT NULL,
  platform TEXT,
  source_url TEXT,
  location TEXT,
  current_stage_id UUID REFERENCES public.stages(id) ON DELETE SET NULL,
  applied_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- Aşama geçmişi tablosu
CREATE TABLE public.stage_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  stage_id UUID NOT NULL REFERENCES public.stages(id) ON DELETE CASCADE,
  changed_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 2. İNDEKSLER (performans için)
-- ============================================

CREATE INDEX idx_applications_user_id 
  ON public.applications(user_id) 
  WHERE deleted_at IS NULL;

CREATE INDEX idx_applications_source_url 
  ON public.applications(user_id, source_url) 
  WHERE deleted_at IS NULL AND source_url IS NOT NULL;

CREATE INDEX idx_stages_user_id 
  ON public.stages(user_id);

CREATE INDEX idx_stage_history_app_id 
  ON public.stage_history(application_id);

-- ============================================
-- 3. updated_at OTOMATİK GÜNCELLEME TRIGGER'I
-- ============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trigger_stages_updated_at
  BEFORE UPDATE ON public.stages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 4. SATIR BAZLI ERİŞİM KONTROLÜ (RLS)
-- ============================================

-- applications tablosu için RLS aç
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own applications"
  ON public.applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own applications"
  ON public.applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications"
  ON public.applications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own applications"
  ON public.applications FOR DELETE
  USING (auth.uid() = user_id);

-- stages tablosu için RLS aç
ALTER TABLE public.stages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own stages"
  ON public.stages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stages"
  ON public.stages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stages"
  ON public.stages FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own non-default stages"
  ON public.stages FOR DELETE
  USING (auth.uid() = user_id AND is_default = false);

-- stage_history tablosu için RLS aç
ALTER TABLE public.stage_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view stage history of their applications"
  ON public.stage_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = stage_history.application_id
        AND applications.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert stage history for their applications"
  ON public.stage_history FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = stage_history.application_id
        AND applications.user_id = auth.uid()
    )
  );

-- ============================================
-- 5. VARSAYILAN STAGE OLUŞTURMA TRIGGER'I
-- ============================================

CREATE OR REPLACE FUNCTION public.create_default_stages_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.stages (user_id, name, color, "order", is_terminal, is_default) VALUES
    (NEW.id, 'Başvuruldu', '#3B82F6', 1, false, true),
    (NEW.id, 'İK Görüşmesi', '#8B5CF6', 2, false, true),
    (NEW.id, 'Teknik Mülakat', '#F59E0B', 3, false, true),
    (NEW.id, 'Yönetici Görüşmesi', '#EC4899', 4, false, true),
    (NEW.id, 'Teklif', '#059669', 5, true, true),
    (NEW.id, 'Elenildi', '#6B7280', 6, true, true);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bu trigger yeni user kaydında otomatik tetiklenir
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_default_stages_for_new_user();