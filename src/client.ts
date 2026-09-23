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
  getGuildInfo,
  getGuildMembers,
  getGuildMember,
  inviteToGuild,
  kickFromGuild,
  promoteGuildMember,
  demoteGuildMember,
  sendHypixelCommand,
  replyToPrivateMessage,
  addFriend,
  removeFriend,
  listFriends,
  inviteToParty,
  removeFromParty,
  leaveParty,
  listPartyMembers,
  sendPartyMessage,
  addIgnore,
  removeIgnore,
  listIgnores,
} from "./modules/index.js";

import type { Bot, GuildMuteDurations, HyFlayerPluginOptions } from "../types/index.d.ts";

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
export const HyFlayer = (options?: HyFlayerPluginOptions): ((bot: Bot) => void) => {
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
    bot.getGuildInfo = () => getGuildInfo(bot);
    bot.getGuildMembers = () => getGuildMembers(bot);
    bot.getGuildMember = (member: string) => getGuildMember(bot, member);
    bot.inviteToGuild = (member: string) => inviteToGuild(bot, member);
    bot.kickFromGuild = (member: string) => kickFromGuild(bot, member);
    bot.promoteGuildMember = (member: string) => promoteGuildMember(bot, member);
    bot.demoteGuildMember = (member: string) => demoteGuildMember(bot, member);
    bot.sendPrivateMessage = (player: string, msg: string) => sendPrivateMessage(bot, player, msg);
    bot.replyToPrivateMessage = (msg: string) => replyToPrivateMessage(bot, msg);
    bot.addFriend = (player: string) => addFriend(bot, player);
    bot.removeFriend = (player: string) => removeFriend(bot, player);
    bot.listFriends = () => listFriends(bot);
    bot.inviteToParty = (player: string) => inviteToParty(bot, player);
    bot.removeFromParty = (player: string) => removeFromParty(bot, player);
    bot.leaveParty = () => leaveParty(bot);
    bot.listPartyMembers = () => listPartyMembers(bot);
    bot.sendPartyMessage = (msg: string) => sendPartyMessage(bot, msg);
    bot.addIgnore = (player: string) => addIgnore(bot, player);
    bot.removeIgnore = (player: string) => removeIgnore(bot, player);
    bot.listIgnores = () => listIgnores(bot);
    bot.sendHypixelCommand = (command: string, args?: readonly string[]) => sendHypixelCommand(bot, command, args);
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
