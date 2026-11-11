import { NextResponse } from "next/server";

// Приймає заявку з форм сайту і пересилає її в Telegram.
// Налаштування (змінні середовища, див. TELEGRAM-BOT.md):
//   TELEGRAM_BOT_TOKEN — токен бота від @BotFather
//   TELEGRAM_CHAT_ID   — куди слати: id чату або групи; кілька через кому
// Токен лишається на сервері й у браузер не потрапляє

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_BASE = process.env.TELEGRAM_API_BASE ?? "https://api.telegram.org";

// Простий захист від спаму: не більше 5 заявок з однієї адреси за 10 хвилин.
// Лічильник живе в пам'яті процесу, тож на Vercel це лише перша лінія захисту
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

const limited = (ip: string) => {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= LIMIT) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  return false;
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const fail = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Некоректний запит");
  }

  // Приховане поле, яке заповнюють лише боти: відповідаємо «ок» і нічого не шлемо
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const name = str(body.name, 60);
  const phone = str(body.phone, 20);
  const message = str(body.message, 2000);
  const service = str(body.service, 60) || "Не вказано";
  const source = str(body.source, 60);
  const page = str(body.page, 200);

  // Та сама перевірка, що й у формі, щоб повз неї нічого не пройшло
  if (name.length < 2) return fail(400, "Вкажіть ім'я");
  if (!/^\+380\d{9}$/.test(phone)) return fail(400, "Некоректний номер телефону");
  if (message.length < 10) return fail(400, "Опишіть задачу детальніше");

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return fail(429, "Забагато заявок. Спробуйте за кілька хвилин або зателефонуйте нам");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chats = (process.env.TELEGRAM_CHAT_ID ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  if (!token || chats.length === 0) {
    console.error("[lead] TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID не задано");
    return fail(500, "Не вдалося надіслати заявку. Зателефонуйте нам, будь ласка");
  }

  const time = new Intl.DateTimeFormat("uk-UA", {
    timeZone: "Europe/Kyiv",
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());

  const text = [
    "🔔 <b>Нова заявка з сайту</b>",
    "",
    `<b>Напрямок:</b> ${esc(service)}`,
    `<b>Ім'я:</b> ${esc(name)}`,
    `<b>Телефон:</b> ${esc(phone)}`,
    "",
    "<b>Задача:</b>",
    esc(message),
    "",
    `<i>${esc([source, page, time].filter(Boolean).join(" · "))}</i>`,
  ].join("\n");

  const results = await Promise.all(
    chats.map(async (chat_id) => {
      try {
        const res = await fetch(`${API_BASE}/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id, text, parse_mode: "HTML", disable_web_page_preview: true }),
          signal: AbortSignal.timeout(10_000),
        });
        if (!res.ok) console.error(`[lead] Telegram ${res.status} для чату ${chat_id}:`, await res.text());
        return res.ok;
      } catch (e) {
        console.error(`[lead] Telegram недоступний для чату ${chat_id}:`, e);
        return false;
      }
    }),
  );

  // Достатньо, щоб заявка дійшла хоча б в один чат
  if (!results.some(Boolean)) return fail(502, "Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам");
  return NextResponse.json({ ok: true });
}
