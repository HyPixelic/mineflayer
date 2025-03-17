import type { Bot } from "../../types/index.js";

export const parsePrivateChat = (bot: Bot) => {
  bot.addChatPattern("hypixel_private_chat", /^From .*/);
  bot.on("chat:hypixel_private_chat", async (msg) => {
    var player;

    const parsedMessage = msg.toString().slice(0, msg.toString().indexOf(":")).split(" ");
    if (parsedMessage[2].includes("[")) {
      player = parsedMessage[3];
    } else {
      player = parsedMessage[2];
    }

    bot.emit("HYPIXELIC_PRIVATE_CHAT", {
      UUID: await bot.mowojang.getUUID(player),
      username: player as string,
      message: msg.toString().slice(msg.toString().indexOf(":") + 2),
      timestamp: Math.floor(Date.now() / 1000),
    });
  });
};
