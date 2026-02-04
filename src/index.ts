import { Client as MowojangClient } from "mowojang";
import {
  getLocation,
  parseLocation,
  parseGuildChat,
  parseGuildEvents,
  parsePrivateChat,
  parseSkyblockCoopChat,
  sendGuildMessage,
  sendPrivateMessage,
  sendSkyblockCoopMessage,
  sendGuildOfficerMessage,
} from "./modules/index.js";

import type { Bot } from "../types/index.d.ts";
export type * from "../types/index.d.ts";

export const HyFlayer = (bot: Bot): void => {
  /* Structures */
  bot.mowojang = new MowojangClient();
  bot.hypixel = {
    proxy: {
      ip: undefined,
      port: undefined,
    },
    location: {},
  } as Bot["hypixel"];

  /* Functions */
  bot.sendGuildMessage = (msg: string) => sendGuildMessage(bot, msg);
  bot.sendGuildOfficerMessage = (msg: string) => sendGuildOfficerMessage(bot, msg);
  bot.sendPrivateMessage = (player: string, msg: string) => sendPrivateMessage(bot, player, msg);
  bot.sendSkyblockCoopMessage = (msg: string) => sendSkyblockCoopMessage(bot, msg);

  /* Proxy Parsing */
  bot.once("login", () => {
    bot.hypixel.proxy = {
      ip: bot._client?.socket?.remoteAddress,
      port: bot._client?.socket?.remotePort,
    };
  });

  /* Location Parsing */
  parseLocation(bot);
  bot.once("spawn", () => getLocation(bot));
  bot.on("respawn", () => getLocation(bot));

  /* Chat Parsers */
  parsePrivateChat(bot);
  parseSkyblockCoopChat(bot);
  parseGuildChat(bot);
  parseGuildEvents(bot);
};
