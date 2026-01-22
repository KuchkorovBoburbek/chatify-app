import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "./env.js";

// arcjet → Arcjet’ning asosiy konfiguratsiya funksiyasi
// shield → Xavfsizlik devori
// detectBot → Botlarni aniqlash va bloklash
// slidingWindow → Rate limiting algoritmi

// 👉 Bu yerda Arcjet’ni sozlashni boshlaymiz
// aj — keyinchalik middleware sifatida ishlatiladi
const aj = arcjet({
  key: ENV.ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        // allow – ruxsat berilgan botlar (search engine botlar)
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),

    slidingWindow({
      //Rate limiting
      mode: "LIVE",
      max: 100, // 100 req per min
      interval: 60, // minut
      //       👉 1 daqiqada 100 request
      // 101-chi request → ❌ 429 Too Many Requests
    }),
  ],
});

export default aj;
