// Показує id чатів, куди бот може писати, і надсилає туди тестове повідомлення.
// Запуск:  node scripts/telegram-chat-id.mjs <ТОКЕН_БОТА>
// Перед запуском напишіть боту /start (або додайте його в групу і напишіть там будь-що)

const token = process.argv[2] ?? process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error("Вкажіть токен: node scripts/telegram-chat-id.mjs <ТОКЕН_БОТА>");
  process.exit(1);
}
const api = (method, body) =>
  fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  }).then((r) => r.json());

const me = await api("getMe");
if (!me.ok) {
  console.error("Токен не підходить:", me.description);
  process.exit(1);
}
console.log(`Бот: @${me.result.username}`);

const upd = await api("getUpdates");
const chats = new Map();
for (const u of upd.result ?? []) {
  const c = (u.message ?? u.channel_post ?? u.my_chat_member)?.chat;
  if (c) chats.set(c.id, c.title ?? [c.first_name, c.last_name].filter(Boolean).join(" ") ?? c.username);
}
if (chats.size === 0) {
  console.log("Чатів не знайдено. Напишіть боту /start (або повідомлення в групі з ботом) і запустіть ще раз.");
  process.exit(0);
}
for (const [id, title] of chats) {
  const sent = await api("sendMessage", { chat_id: id, text: "✅ Тест: сюди приходитимуть заявки з сайту CloudBASE" });
  console.log(`${id}\t${title}\t${sent.ok ? "тест надіслано" : "помилка: " + sent.description}`);
}
console.log(`\nTELEGRAM_CHAT_ID=${[...chats.keys()].join(",")}`);
