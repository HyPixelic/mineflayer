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
  toggleGuildSlowChat,
  muteGuildChat,
  muteGuildMember,
  unmuteGuildChat,
  unmuteGuildMember,
} from "./modules/index.js";

import type { Bot, GuildMuteDurations, PluginOptions } from "../types/index.d.ts";

/**
 * Injects the HyFlayer Plugin into a Mineflayer Bot
 *
 * @example
 * ```TS
 * import { HyFlayer, Bot as HyFlayerBot } from "@hypixelic/mineflayer"
 *
 * const bot = mineflayer.createBot({
 * host: "hypixel.net",
 * username: "MICROSOFT_ACCOUNT_EMAIL",
 * auth: "microsoft",
 * version: "1.8.9",
 * }) as HyFlayerBot
 *
 * const hyflayer = HyFlayer()
 *
 * bot.loadPlugin(hyflayer);
 * ```
 */
export const HyFlayer = (options?: PluginOptions) => {
  const mowojang = options?.mowojang ?? new MowojangClient();

  return (bot: Bot): void => {
    /* Structures */
    bot.mowojang = mowojang;
    bot.hypixel = {
      proxy: {
        ip: undefined,
        port: undefined,
        latency: undefined,
      },
      location: {},
    } as Bot["hypixel"];

    /* Functions */
    bot.sendGuildMessage = (msg: string) => sendGuildMessage(bot, msg);
    bot.sendGuildOfficerMessage = (msg: string) => sendGuildOfficerMessage(bot, msg);
    bot.toggleGuildSlowChat = () => toggleGuildSlowChat(bot);
    bot.muteGuildChat = (duration: GuildMuteDurations) => muteGuildChat(bot, duration);
    bot.muteGuildMember = (member: string, duration: GuildMuteDurations) => muteGuildMember(bot, member, duration);
    bot.unmuteGuildChat = () => unmuteGuildChat(bot);
    bot.unmuteGuildMember = (member: string) => unmuteGuildMember(bot, member);
    bot.sendPrivateMessage = (player: string, msg: string) => sendPrivateMessage(bot, player, msg);
    bot.sendSkyblockCoopMessage = (msg: string) => sendSkyblockCoopMessage(bot, msg);

    /* Proxy Parsing */
    bot.once("login", () => {
      bot.hypixel.proxy = {
        ip: bot._client?.socket?.remoteAddress,
        port: bot._client?.socket?.remotePort,
        latency: bot?.player?.ping || undefined,
      };
      setInterval(() => {
        bot.hypixel.proxy.latency = bot?.player?.ping || undefined;
      }, 60000);
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
};
