// CORS header'ları — Edge Function'ların frontend'den çağrılabilmesi için gerekli.
// Geliştirme aşamasında "*" yeterli; production'da kendi domain'imizle değiştirilir.

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Preflight (OPTIONS) isteklerine standart cevap — tarayıcı POST'tan önce bunu sorar.
export function handleCorsPreflight(req: Request): Response | null {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  return null;
}