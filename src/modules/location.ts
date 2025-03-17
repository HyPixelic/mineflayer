import type { Bot } from "../../types/index.js";

export const parseLocation = (bot: Bot) => {
  bot.addChatPattern("hypixel_location", /\{[^{}]*"server"\s*:/);
  bot.on("chat:hypixel_location", (msg) => {
    try {
      const location = JSON.parse(msg);
      bot.hypixel.location = {
        server: location.server,
        gamemode: location?.gametype ?? null,
        mode: location?.mode ?? null,
        map: location?.map ?? null,
        lobby: location?.lobbyname ? Number(location.lobbyname.replace(/\D/g, "")) : null,
      };
      bot.emit("HYPIXELIC_LOCATION", bot.hypixel.location);
    } catch {
      console.error("Failed parsing current Hypixel Location");
    }
  });
};

export const getLocation = (bot: Bot) => {
  bot.chat("/locraw");
};
