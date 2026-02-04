import type { Bot, GuildMuteDurations } from "../../types/index.d.ts";

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

    bot.emit("HYFLAYER_GUILD_CHAT", {
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

    bot.emit("HYFLAYER_GUILD_OFFICER_CHAT", {
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
    bot.emit("HYFLAYER_GUILD_JOIN", {
      UUID: await bot.mowojang.getUUID(msg.toString().split(" ")[2]),
      username: msg.toString().split(" ")[2],
      timestamp: Math.floor(Date.now() / 1000),
    });
  });
  bot.on("chat:hypixel_guild_leave", async (msg) => {
    bot.emit("HYFLAYER_GUILD_LEAVE", {
      UUID: await bot.mowojang.getUUID(msg.toString().split(" ")[2]),
      username: msg.toString().split(" ")[2],
      timestamp: Math.floor(Date.now() / 1000),
    });
  });
};

export const sendGuildMessage = (bot: Bot, msg: string) => {
  bot.chat(`/gc ${msg}`);
};

export const sendGuildOfficerMessage = (bot: Bot, msg: string) => {
  bot.chat(`/oc ${msg}`);
};

export const toggleGuildSlowChat = (bot: Bot) => {
  bot.chat(`/g slow`);
};

export const muteGuildChat = (bot: Bot, duration: GuildMuteDurations) => {
  bot.chat(`/g mute everyone ${duration}`);
};

export const muteGuildMember = (bot: Bot, player: string, duration: GuildMuteDurations) => {
  bot.chat(`/g mute ${player} ${duration}`);
};

export const unmuteGuildChat = (bot: Bot) => {
  bot.chat(`/g unmute everyone`);
};

export const unmuteGuildMember = (bot: Bot, player: string) => {
  bot.chat(`/g unmute ${player}`);
};
