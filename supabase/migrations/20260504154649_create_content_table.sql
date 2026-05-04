CREATE TABLE IF NOT EXISTS public.content (
  section TEXT PRIMARY KEY,
  data    JSONB NOT NULL
);

ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read"
  ON public.content FOR SELECT USING (true);

CREATE POLICY "auth write"
  ON public.content FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
