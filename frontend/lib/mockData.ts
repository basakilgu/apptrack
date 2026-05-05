// lib/mockData.ts
// In-memory store — backend baglandiginda Supabase'e gececek

import type {
  Application, Stage, StageKey, Platform, Note, StageHistoryEntry, UserProfile,
} from "../types/database";

// === Asamalar ===
export const mockStages: Stage[] = [
  { id: "s1", name: "Basvuruldu",     key: "applied",   order: 1, is_terminal: false, is_default: true, color: "#8FA8B8" },
  { id: "s2", name: "IK Gorusmesi",   key: "screening", order: 2, is_terminal: false, is_default: true, color: "#9FB892" },
  { id: "s3", name: "Teknik Mulakat", key: "interview", order: 3, is_terminal: false, is_default: true, color: "#C4A875" },
  { id: "s4", name: "Yonetici",       key: "manager",   order: 4, is_terminal: false, is_default: true, color: "#C4A875" },
  { id: "s5", name: "Teklif",         key: "offer",     order: 5, is_terminal: true,  is_default: true, color: "#7A9270" },
  { id: "s6", name: "Elenildi",       key: "rejected",  order: 6, is_terminal: true,  is_default: true, color: "#A8908F" },
];

// Display-friendly Turkish names with diacritics — used in UI only
export const stageDisplayNames: Record<StageKey, string> = {
  applied:   "Başvuruldu",
  screening: "İK Görüşmesi",
  interview: "Teknik Mülakat",
  manager:   "Yönetici Görüşmesi",
  offer:     "Teklif",
  rejected:  "Elenildi",
};

// === Baslangic verisi ===
const initialApplications: Application[] = [
  {
    id: "a1", user_id: "u1",
    company_name: "Trendyol", position: "Süreç Tasarım Uzmanı",
    location: "İstanbul", platform: "linkedin",
    source_url: "https://linkedin.com/jobs/12345",
    current_stage: "interview",
    stage_history: [
      { id: "h1", application_id: "a1", stage_key: "applied",   stage_name: "Başvuruldu",     changed_at: "2026-04-12T09:00:00Z" },
      { id: "h2", application_id: "a1", stage_key: "screening", stage_name: "İK Görüşmesi",   changed_at: "2026-04-14T14:30:00Z" },
      { id: "h3", application_id: "a1", stage_key: "interview", stage_name: "Teknik Mülakat", changed_at: "2026-04-18T10:00:00Z" },
    ],
    notes: [
      { id: "n1", application_id: "a1", content: "İK görüşmesi pozitif geçti. Teknik mülakat 18 Nisan'a randevu verildi.", created_at: "2026-04-14T15:00:00Z" },
      { id: "n2", application_id: "a1", content: "Süreç başladı, başvurum alındı.", created_at: "2026-04-12T10:00:00Z" },
    ],
    applied_at: "2026-04-12T09:00:00Z", updated_at: "2026-04-18T10:00:00Z",
    is_favorite: true,
  },
  {
    id: "a2", user_id: "u1",
    company_name: "Garanti BBVA", position: "İş Analisti",
    location: "İstanbul", platform: "kariyer",
    current_stage: "applied",
    stage_history: [
      { id: "h4", application_id: "a2", stage_key: "applied", stage_name: "Başvuruldu", changed_at: "2026-04-10T11:00:00Z" },
    ],
    notes: [],
    applied_at: "2026-04-10T11:00:00Z", updated_at: "2026-04-10T11:00:00Z",
  },
  {
    id: "a3", user_id: "u1",
    company_name: "Getir", position: "Operasyon Uzmanı",
    location: "İstanbul", platform: "linkedin",
    current_stage: "rejected",
    stage_history: [
      { id: "h5", application_id: "a3", stage_key: "applied",   stage_name: "Başvuruldu",   changed_at: "2026-04-08T08:00:00Z" },
      { id: "h6", application_id: "a3", stage_key: "screening", stage_name: "İK Görüşmesi", changed_at: "2026-04-15T11:00:00Z" },
      { id: "h7", application_id: "a3", stage_key: "rejected",  stage_name: "Elenildi",     changed_at: "2026-04-20T16:00:00Z" },
    ],
    notes: [
      { id: "n3", application_id: "a3", content: "İK görüşmesinden sonra olumsuz dönüş. Dil seviyesi gerekçe gösterildi.", created_at: "2026-04-20T17:00:00Z" },
    ],
    applied_at: "2026-04-08T08:00:00Z", updated_at: "2026-04-20T16:00:00Z",
  },
  {
    id: "a4", user_id: "u1",
    company_name: "Hepsiburada", position: "Ürün Yöneticisi",
    location: "İstanbul", platform: "youthall",
    current_stage: "screening",
    stage_history: [
      { id: "h8", application_id: "a4", stage_key: "applied",   stage_name: "Başvuruldu",   changed_at: "2026-04-05T13:00:00Z" },
      { id: "h9", application_id: "a4", stage_key: "screening", stage_name: "İK Görüşmesi", changed_at: "2026-04-22T10:00:00Z" },
    ],
    notes: [
      { id: "n4", application_id: "a4", content: "Recruiter dün arandı, ön görüşme bu hafta perşembe.", created_at: "2026-04-22T11:00:00Z" },
    ],
    applied_at: "2026-04-05T13:00:00Z", updated_at: "2026-04-22T10:00:00Z",
  },
  {
    id: "a5", user_id: "u1",
    company_name: "Yapı Kredi", position: "Dijital Bankacılık Uzmanı",
    location: "İstanbul", platform: "kariyer",
    current_stage: "applied",
    stage_history: [
      { id: "h10", application_id: "a5", stage_key: "applied", stage_name: "Başvuruldu", changed_at: "2026-04-25T09:30:00Z" },
    ],
    notes: [],
    applied_at: "2026-04-25T09:30:00Z", updated_at: "2026-04-25T09:30:00Z",
  },
  {
    id: "a6", user_id: "u1",
    company_name: "Migros", position: "Kategori Asistanı",
    location: "İstanbul", platform: "anbean",
    current_stage: "manager",
    stage_history: [
      { id: "h11", application_id: "a6", stage_key: "applied",   stage_name: "Başvuruldu",     changed_at: "2026-03-28T14:00:00Z" },
      { id: "h12", application_id: "a6", stage_key: "screening", stage_name: "İK Görüşmesi",   changed_at: "2026-04-04T11:00:00Z" },
      { id: "h13", application_id: "a6", stage_key: "interview", stage_name: "Teknik Mülakat", changed_at: "2026-04-19T15:00:00Z" },
      { id: "h14", application_id: "a6", stage_key: "manager",   stage_name: "Yönetici",       changed_at: "2026-04-26T10:00:00Z" },
    ],
    notes: [
      { id: "n5", application_id: "a6", content: "Yönetici görüşmesi 28 Nisan saat 14:00. Case study notlarımı tekrar gözden geçir.", created_at: "2026-04-26T11:00:00Z" },
      { id: "n6", application_id: "a6", content: "Case study verildi, 1 hafta süre.", created_at: "2026-04-19T16:00:00Z" },
    ],
    applied_at: "2026-03-28T14:00:00Z", updated_at: "2026-04-26T10:00:00Z",
    is_favorite: true,
  },
  {
    id: "a7", user_id: "u1",
    company_name: "Akbank", position: "Müşteri Deneyimi Tasarımcısı",
    location: "İstanbul", platform: "linkedin",
    current_stage: "offer",
    stage_history: [
      { id: "h15", application_id: "a7", stage_key: "applied",   stage_name: "Başvuruldu",     changed_at: "2026-03-15T10:00:00Z" },
      { id: "h16", application_id: "a7", stage_key: "screening", stage_name: "İK Görüşmesi",   changed_at: "2026-03-22T13:00:00Z" },
      { id: "h17", application_id: "a7", stage_key: "interview", stage_name: "Teknik Mülakat", changed_at: "2026-04-02T15:00:00Z" },
      { id: "h18", application_id: "a7", stage_key: "manager",   stage_name: "Yönetici",       changed_at: "2026-04-15T11:00:00Z" },
      { id: "h19", application_id: "a7", stage_key: "offer",     stage_name: "Teklif",         changed_at: "2026-04-24T09:00:00Z" },
    ],
    notes: [
      { id: "n7", application_id: "a7", content: "Teklif geldi! Maaş paketi, yan haklar ve başlama tarihi için detayları bekliyorum.", created_at: "2026-04-24T10:00:00Z" },
    ],
    applied_at: "2026-03-15T10:00:00Z", updated_at: "2026-04-24T09:00:00Z",
    is_favorite: true,
  },
  {
    id: "a8", user_id: "u1",
    company_name: "İş Bankası", position: "Süreç Geliştirme Uzmanı",
    location: "İstanbul", platform: "kariyer",
    current_stage: "interview",
    stage_history: [
      { id: "h20", application_id: "a8", stage_key: "applied",   stage_name: "Başvuruldu",     changed_at: "2026-04-01T09:00:00Z" },
      { id: "h21", application_id: "a8", stage_key: "screening", stage_name: "İK Görüşmesi",   changed_at: "2026-04-09T14:00:00Z" },
      { id: "h22", application_id: "a8", stage_key: "interview", stage_name: "Teknik Mülakat", changed_at: "2026-04-23T10:00:00Z" },
    ],
    notes: [],
    applied_at: "2026-04-01T09:00:00Z", updated_at: "2026-04-23T10:00:00Z",
  },
  {
    id: "a9", user_id: "u1",
    company_name: "Sahibinden", position: "İş Analisti",
    location: "İstanbul", platform: "youthall",
    current_stage: "rejected",
    stage_history: [
      { id: "h23", application_id: "a9", stage_key: "applied",  stage_name: "Başvuruldu", changed_at: "2026-03-20T11:00:00Z" },
      { id: "h24", application_id: "a9", stage_key: "rejected", stage_name: "Elenildi",   changed_at: "2026-04-02T16:00:00Z" },
    ],
    notes: [
      { id: "n8", application_id: "a9", content: "CV elemesinden geçemedi.", created_at: "2026-04-02T17:00:00Z" },
    ],
    applied_at: "2026-03-20T11:00:00Z", updated_at: "2026-04-02T16:00:00Z",
  },
];

// === User profile mock ===
export const mockUser: UserProfile = {
  id: "u1",
  full_name: "Başak İlgü",
  email: "basak@example.com",
  notifications_enabled: true,
  silent_mode: true,
};

// === Mutable mock state ===
let _applications: Application[] = [...initialApplications];
const _listeners = new Set<() => void>();

function notify() { _listeners.forEach((fn) => fn()); }

export const mockStore = {
  getAll(): Application[] {
    return _applications.filter((a) => !a.deleted_at);
  },

  getById(id: string): Application | undefined {
    return _applications.find((a) => a.id === id && !a.deleted_at);
  },

  add(input: {
    company_name: string;
    position: string;
    location?: string;
    platform: Platform;
    source_url?: string;
    initial_stage?: StageKey;
    initial_note?: string;
  }): Application {
    const now = new Date().toISOString();
    const id = `a${Date.now()}`;
    const stage = mockStages.find((s) => s.key === (input.initial_stage ?? "applied"))!;
    const stageHistory: StageHistoryEntry[] = [{
      id: `h${Date.now()}`,
      application_id: id,
      stage_key: stage.key,
      stage_name: stageDisplayNames[stage.key],
      changed_at: now,
    }];
    const notes: Note[] = input.initial_note
      ? [{ id: `n${Date.now()}`, application_id: id, content: input.initial_note, created_at: now }]
      : [];

    const application: Application = {
      id, user_id: "u1",
      company_name: input.company_name,
      position: input.position,
      location: input.location,
      platform: input.platform,
      source_url: input.source_url,
      current_stage: stage.key,
      stage_history: stageHistory,
      notes,
      applied_at: now, updated_at: now,
    };
    _applications = [application, ..._applications];
    notify();
    return application;
  },

  update(id: string, updates: Partial<Application>): void {
    _applications = _applications.map((a) =>
      a.id === id ? { ...a, ...updates, updated_at: new Date().toISOString() } : a
    );
    notify();
  },

  updateStage(id: string, newStage: StageKey): void {
    const stage = mockStages.find((s) => s.key === newStage);
    if (!stage) return;
    const now = new Date().toISOString();
    _applications = _applications.map((a) => {
      if (a.id !== id) return a;
      const newHistoryEntry: StageHistoryEntry = {
        id: `h${Date.now()}`,
        application_id: id,
        stage_key: newStage,
        stage_name: stageDisplayNames[newStage],
        changed_at: now,
      };
      return { ...a, current_stage: newStage, stage_history: [...a.stage_history, newHistoryEntry], updated_at: now };
    });
    notify();
  },

  addNote(id: string, content: string): void {
    const now = new Date().toISOString();
    _applications = _applications.map((a) => {
      if (a.id !== id) return a;
      const newNote: Note = { id: `n${Date.now()}`, application_id: id, content, created_at: now };
      return { ...a, notes: [newNote, ...a.notes], updated_at: now };
    });
    notify();
  },

  toggleFavorite(id: string): void {
    _applications = _applications.map((a) =>
      a.id === id ? { ...a, is_favorite: !a.is_favorite } : a
    );
    notify();
  },

  softDelete(id: string): void {
    _applications = _applications.map((a) =>
      a.id === id ? { ...a, deleted_at: new Date().toISOString() } : a
    );
    notify();
  },

  subscribe(listener: () => void): () => void {
    _listeners.add(listener);
    return () => _listeners.delete(listener);
  },
};

// === React hooks ===
import { useState, useEffect } from "react";

export function useApplications() {
  const [, force] = useState(0);
  useEffect(() => mockStore.subscribe(() => force((n) => n + 1)), []);
  return mockStore.getAll();
}

export function useApplication(id: string | undefined) {
  const [, force] = useState(0);
  useEffect(() => mockStore.subscribe(() => force((n) => n + 1)), []);
  return id ? mockStore.getById(id) : undefined;
}

// === Helpers ===
export function getCounts() {
  const all = mockStore.getAll();
  return {
    all: all.length,
    active: all.filter((a) => a.current_stage !== "rejected" && a.current_stage !== "offer").length,
    interview: all.filter((a) => a.current_stage === "interview" || a.current_stage === "manager").length,
    archive: all.filter((a) => a.current_stage === "rejected" || a.current_stage === "offer").length,
    waiting: all.filter((a) => {
      if (a.current_stage !== "applied") return false;
      const days = Math.floor((Date.now() - new Date(a.applied_at).getTime()) / (1000 * 60 * 60 * 24));
      return days >= 3;
    }).length,
    offer: all.filter((a) => a.current_stage === "offer").length,
  };
}

export function formatDateTr(iso: string): string {
  const date = new Date(iso);
  const months = ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"];
  return `${date.getDate()} ${months[date.getMonth()]}`;
}

export function formatDateLongTr(iso: string): string {
  const date = new Date(iso);
  const months = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function getRelativeTimeTr(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "bugün";
  if (days === 1) return "dün";
  if (days < 7) return `${days} gün önce`;
  if (days < 30) return `${Math.floor(days / 7)} hafta önce`;
  return formatDateTr(iso);
}

export function getStageName(key: StageKey): string {
  return stageDisplayNames[key];
}

export function getStageOrder(key: StageKey): number {
  return mockStages.find((s) => s.key === key)?.order ?? 0;
}

export const platformLabels: Record<Platform, string> = {
  linkedin: "LinkedIn",
  kariyer:  "Kariyer.net",
  youthall: "Youthall",
  anbean:   "Anbean",
  other:    "Diğer",
};

export const platformColors: Record<Platform, string> = {
  linkedin: "#0A66C2",
  kariyer:  "#FF6600",
  youthall: "#7C3AED",
  anbean:   "#059669",
  other:    "#8A8278",
};

// Dashboard metrics
export function getMetrics() {
  const all = mockStore.getAll();
  const now = Date.now();
  const week = 7 * 24 * 60 * 60 * 1000;
  const lastWeek = all.filter((a) => now - new Date(a.applied_at).getTime() < week);

  const platformCounts = all.reduce<Record<Platform, number>>((acc, a) => {
    acc[a.platform] = (acc[a.platform] || 0) + 1;
    return acc;
  }, { linkedin: 0, kariyer: 0, youthall: 0, anbean: 0, other: 0 });

  const topPlatform = Object.entries(platformCounts).sort((a, b) => b[1] - a[1])[0];

  const positionCounts = all.reduce<Record<string, number>>((acc, a) => {
    const key = a.position.toLowerCase().includes("ürün") ? "Ürün Yönetimi"
      : a.position.toLowerCase().includes("süreç") ? "Süreç Tasarımı"
      : a.position.toLowerCase().includes("analist") ? "İş Analistliği"
      : a.position.toLowerCase().includes("operasyon") ? "Operasyon"
      : a.position.toLowerCase().includes("müşteri") ? "Müşteri Deneyimi"
      : a.position.toLowerCase().includes("dijital") ? "Dijital Bankacılık"
      : "Diğer";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const topPosition = Object.entries(positionCounts).sort((a, b) => b[1] - a[1])[0];

  // Funnel — gercek progresyon orani
  const totalApplied = all.length;
  const reachedScreening = all.filter((a) => a.stage_history.some((h) => h.stage_key === "screening")).length;
  const reachedInterview = all.filter((a) => a.stage_history.some((h) => h.stage_key === "interview" || h.stage_key === "manager")).length;
  const reachedOffer = all.filter((a) => a.current_stage === "offer").length;

  return {
    weeklyCount: lastWeek.length,
    interviewCount: all.filter((a) => a.current_stage === "interview" || a.current_stage === "manager").length,
    topPlatform: topPlatform ? { name: platformLabels[topPlatform[0] as Platform], count: topPlatform[1] } : null,
    topPosition: topPosition ? { name: topPosition[0], count: topPosition[1] } : null,
    funnel: {
      applied: totalApplied,
      screening: reachedScreening,
      interview: reachedInterview,
      offer: reachedOffer,
    },
  };
}
