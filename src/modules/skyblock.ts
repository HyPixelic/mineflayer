import type { Bot } from "../../types/index.d.ts";

export const parseSkyblockCoopChat = (bot: Bot) => {
  bot.addChatPattern("hypixel_skyblock_coop_chat", /^Co-op > .*/);
  bot.on("chat:hypixel_skyblock_coop_chat", async (msg) => {
    let player: string;

    const parsedMessage = msg.toString().slice(0, msg.toString().indexOf(":")).split(" ");
    if (parsedMessage[2].includes("[")) {
      player = parsedMessage[3];
    } else {
      player = parsedMessage[2];
    }

    const profile = await bot.mowojang.getProfile(player.trim());
    if (profile.error || !profile.data) return;

    bot.emit("HYFLAYER_SKYBLOCK_COOP_CHAT", {
      UUID: profile.data.UUID,
      username: profile.data.username,
      message: msg.toString().slice(msg.toString().indexOf(":") + 2),
      timestamp: Math.floor(Date.now() / 1000),
    });
  });
};

export const sendSkyblockCoopMessage = (bot: Bot, msg: string) => {
  bot.chat(`/coop ${msg}`);
};
