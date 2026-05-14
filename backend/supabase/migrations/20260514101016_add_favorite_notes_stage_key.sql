-- ============================================
-- Applyze: Eksik Kolon ve Tablolar
-- Migration 0002
-- ============================================

-- ============================================
-- 1. applications.is_favorite KOLONU
-- ============================================

ALTER TABLE public.applications
ADD COLUMN is_favorite BOOLEAN DEFAULT false;

-- ============================================
-- 2. stages.key KOLONU
-- StageKey: applied, screening, interview, manager, offer, rejected
-- Mevcut user'ların stage'lerini default key'lere bağlamak için
-- ============================================

ALTER TABLE public.stages
ADD COLUMN key TEXT;

-- Mevcut default stage'leri sıralarına göre key ile eşle
UPDATE public.stages SET key = 'applied'    WHERE "order" = 1 AND is_default = true;
UPDATE public.stages SET key = 'screening'  WHERE "order" = 2 AND is_default = true;
UPDATE public.stages SET key = 'interview'  WHERE "order" = 3 AND is_default = true;
UPDATE public.stages SET key = 'manager'    WHERE "order" = 4 AND is_default = true;
UPDATE public.stages SET key = 'offer'      WHERE "order" = 5 AND is_default = true;
UPDATE public.stages SET key = 'rejected'   WHERE "order" = 6 AND is_default = true;

-- Default trigger'ını güncelle: yeni kullanıcılarda key de doldurulsun
CREATE OR REPLACE FUNCTION public.create_default_stages_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.stages (user_id, name, color, "order", is_terminal, is_default, key) VALUES
    (NEW.id, 'Başvuruldu',         '#8FA8B8', 1, false, true, 'applied'),
    (NEW.id, 'İK Görüşmesi',       '#9FB892', 2, false, true, 'screening'),
    (NEW.id, 'Teknik Mülakat',     '#C4A875', 3, false, true, 'interview'),
    (NEW.id, 'Yönetici Görüşmesi', '#C4A875', 4, false, true, 'manager'),
    (NEW.id, 'Teklif',             '#7A9270', 5, true,  true, 'offer'),
    (NEW.id, 'Elenildi',           '#A8908F', 6, true,  true, 'rejected');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 3. NOTES TABLOSU
-- ============================================

CREATE TABLE public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(content) <= 2000),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_notes_application_id ON public.notes(application_id);

-- RLS: bir başvurunun sahibi notlarına erişebilir
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view notes of their applications"
  ON public.notes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = notes.application_id
        AND applications.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert notes for their applications"
  ON public.notes FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = notes.application_id
        AND applications.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update notes of their applications"
  ON public.notes FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = notes.application_id
        AND applications.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = notes.application_id
        AND applications.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete notes of their applications"
  ON public.notes FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.applications
      WHERE applications.id = notes.application_id
        AND applications.user_id = auth.uid()
    )
  );