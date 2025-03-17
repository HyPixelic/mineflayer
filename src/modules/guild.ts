import type { Bot } from "../../types/index.js";

export const parseGuildChat = (bot: Bot) => {
  bot.addChatPattern("hypixel_guild_chat", /^Guild > .*:.*/);
  bot.addChatPattern("hypixel_guild_officer_chat", /^Officer > .*/);
  bot.on("chat:hypixel_guild_chat", async (msg) => {
    var player;

    const parsedMessage = msg.toString().slice(0, msg.toString().indexOf(":")).split(" ");
    if (parsedMessage[2].includes("[") && parsedMessage[4]?.includes("[")) {
      player = parsedMessage[3];
    }
    if (!parsedMessage[2].includes("[") && !parsedMessage[4]?.includes("[")) {
      player = parsedMessage[2];
    }
    if (!parsedMessage[2].includes("[") && parsedMessage[4]?.includes("[")) {
      player = parsedMessage[2];
    }
    if (parsedMessage[2].includes("[") && !parsedMessage[4]?.includes("[")) {
      player = parsedMessage[3];
    }

    bot.emit("HYPIXELIC_GUILD_CHAT", {
      UUID: await bot.mowojang.getUUID(player),
      username: player as string,
      message: msg.toString().slice(msg.toString().indexOf(":") + 2),
      timestamp: Math.floor(Date.now() / 1000),
    });
  });
  bot.on("chat:hypixel_guild_officer_chat", async (msg) => {
    var player;

    const parsedMessage = msg.toString().slice(0, msg.toString().indexOf(":")).split(" ");
    if (parsedMessage[2].includes("[") && parsedMessage[4]?.includes("[")) {
      player = parsedMessage[3];
    }
    if (!parsedMessage[2].includes("[") && !parsedMessage[4]?.includes("[")) {
      player = parsedMessage[2];
    }
    if (!parsedMessage[2].includes("[") && parsedMessage[4]?.includes("[")) {
      player = parsedMessage[2];
    }
    if (parsedMessage[2].includes("[") && !parsedMessage[4]?.includes("[")) {
      player = parsedMessage[3];
    }

    bot.emit("HYPIXELIC_GUILD_OFFICER_CHAT", {
      UUID: await bot.mowojang.getUUID(player),
      username: player as string,
      message: msg.toString().slice(msg.toString().indexOf(":") + 2),
      timestamp: Math.floor(Date.now() / 1000),
    });
  });
};

export const parseGuildEvents = (bot: Bot) => {
  bot.addChatPattern("hypixel_guild_join", /^Guild > [^:]+ joined\.$/);
  bot.addChatPattern("hypixel_guild_leave", /^Guild > [^:]+ left\.$/);
  bot.on("chat:hypixel_guild_join", async (msg) => {
    bot.emit("HYPIXELIC_GUILD_JOIN", {
      UUID: await bot.mowojang.getUUID(msg.toString().split(" ")[2]),
      username: msg.toString().split(" ")[2],
      timestamp: Math.floor(Date.now() / 1000),
    });
  });
  bot.on("chat:hypixel_guild_leave", async (msg) => {
    bot.emit("HYPIXELIC_GUILD_LEAVE", {
      UUID: await bot.mowojang.getUUID(msg.toString().split(" ")[2]),
      username: msg.toString().split(" ")[2],
      timestamp: Math.floor(Date.now() / 1000),
    });
  });
};
