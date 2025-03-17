import type { Bot } from "mineflayer";

export const parseSkyblockCoopChat = (bot: Bot) => {
  bot.addChatPattern("hypixel_skyblock_coop_chat", /^Co-op > .*/);
  bot.on("chat:hypixel_skyblock_coop_chat", async (msg) => {
    var player;

    const parsedMessage = msg.toString().slice(0, msg.toString().indexOf(":")).split(" ");
    if (parsedMessage[2].includes("[")) {
      player = parsedMessage[3];
    } else {
      player = parsedMessage[2];
    }

    bot.emit("HYPIXELIC_SKYBLOCK_COOP_CHAT", {
      UUID: await bot.mowojang.getUUID(player),
      username: player as string,
      message: msg.toString().slice(msg.toString().indexOf(":") + 2),
      timestamp: Math.floor(Date.now() / 1000),
    });
  });
};
