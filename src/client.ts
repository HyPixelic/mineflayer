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
  commands,
} from "./modules/index.js";

import type { Bot, GuildMuteDurations, HyFlayerPluginOptions, LobbyName } from "../types/index.d.ts";

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
    bot.commands = {
      sendHypixelCommand: (command, args) => commands.sendHypixelCommand(bot, command, args),
      replyToPrivateMessage: (msg) => commands.replyToPrivateMessage(bot, msg),
      addFriend: (player) => commands.addFriend(bot, player),
      denyFriend: () => commands.denyFriend(bot),
      removeFriend: (player) => commands.removeFriend(bot, player),
      removeAllFriends: () => commands.removeAllFriends(bot),
      getFriends: () => commands.getFriends(bot),
      inviteToParty: (player) => commands.inviteToParty(bot, player),
      removeFromParty: (player) => commands.removeFromParty(bot, player),
      leaveParty: () => commands.leaveParty(bot),
      disbandParty: () => commands.disbandParty(bot),
      kickOfflinePartyMembers: () => commands.kickOfflinePartyMembers(bot),
      warpParty: () => commands.warpParty(bot),
      getPartyMembers: () => commands.getPartyMembers(bot),
      sendPartyMessage: (msg) => commands.sendPartyMessage(bot, msg),
      addIgnore: (player) => commands.addIgnore(bot, player),
      removeIgnore: (player) => commands.removeIgnore(bot, player),
      getIgnores: () => commands.getIgnores(bot),
      boop: (player) => commands.boop(bot, player),
      cookie: (player) => commands.cookie(bot, player),
      hug: (player) => commands.hug(bot, player),
      lobby: (lobbyName) => commands.lobby(bot, lobbyName),
      toggleChat: () => commands.toggleChat(bot),
    };
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
    bot.replyToPrivateMessage = (msg: string) => bot.commands.replyToPrivateMessage(msg);
    bot.addFriend = (player: string) => bot.commands.addFriend(player);
    bot.denyFriend = () => bot.commands.denyFriend();
    bot.removeFriend = (player: string) => bot.commands.removeFriend(player);
    bot.removeAllFriends = () => bot.commands.removeAllFriends();
    bot.getFriends = () => bot.commands.getFriends();
    bot.inviteToParty = (player: string) => bot.commands.inviteToParty(player);
    bot.removeFromParty = (player: string) => bot.commands.removeFromParty(player);
    bot.leaveParty = () => bot.commands.leaveParty();
    bot.disbandParty = () => bot.commands.disbandParty();
    bot.kickOfflinePartyMembers = () => bot.commands.kickOfflinePartyMembers();
    bot.warpParty = () => bot.commands.warpParty();
    bot.getPartyMembers = () => bot.commands.getPartyMembers();
    bot.sendPartyMessage = (msg: string) => bot.commands.sendPartyMessage(msg);
    bot.addIgnore = (player: string) => bot.commands.addIgnore(player);
    bot.removeIgnore = (player: string) => bot.commands.removeIgnore(player);
    bot.getIgnores = () => bot.commands.getIgnores();
    bot.boop = (player: string) => bot.commands.boop(player);
    bot.cookie = (player: string) => bot.commands.cookie(player);
    bot.hug = (player: string) => bot.commands.hug(player);
    bot.lobby = (lobbyName?: LobbyName) => bot.commands.lobby(lobbyName);
    bot.toggleChat = () => bot.commands.toggleChat();
    bot.sendHypixelCommand = (command: string, args?: readonly string[]) =>
      bot.commands.sendHypixelCommand(command, args);
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
