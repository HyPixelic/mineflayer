import type { Bot } from "../../types/index.d.ts";

export const parsePrivateChat = (bot: Bot) => {
  bot.addChatPattern("hypixel_private_chat", /^From .*/);
  bot.on("chat:hypixel_private_chat", async (msg) => {
    let player: string;

    const parsedMessage = msg.toString().slice(0, msg.toString().indexOf(":")).split(" ");
    if (parsedMessage[2].includes("[")) {
      player = parsedMessage[3];
    } else {
      player = parsedMessage[2];
    }

    const profile = await bot.mowojang.getProfile(player.trim());
    if (profile.error || !profile.data) return;

    bot.emit("HYFLAYER_PRIVATE_CHAT", {
      UUID: profile.data.UUID,
      username: profile.data.username,
      message: msg.toString().slice(msg.toString().indexOf(":") + 2),
      timestamp: Math.floor(Date.now() / 1000),
    });
  });
};

export const sendPrivateMessage = (bot: Bot, player: string, msg: string) => {
  bot.chat(`/msg ${player} ${msg}`);
};
