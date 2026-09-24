import type { Bot, GuildMuteDurations, LobbyName } from "../../types/index.d.ts";

const validateArgument = (arg: string): boolean => !/[\u0000-\u001f\u007f]/.test(arg);

const sendHypixelCommand = (bot: Bot, command: string, args: readonly string[] = []): void => {
  const normalizedCommand = command.trim().replace(/^\/+/, "");

  if (!normalizedCommand || /\s/.test(normalizedCommand)) {
    throw new Error("Hypixel command must not be empty");
  }
  if (!validateArgument(normalizedCommand)) {
    throw new Error("Hypixel command contains invalid characters");
  }
  args.forEach((arg) => {
    if (!validateArgument(arg)) {
      throw new Error("Hypixel command argument contains invalid characters");
    }
  });

  const argumentsText = args.filter((argument) => argument.length > 0).join(" ");
  bot.chat(`/${normalizedCommand}${argumentsText ? ` ${argumentsText}` : ""}`);
};

const replyToPrivateMessage = (bot: Bot, message: string): void => {
  sendHypixelCommand(bot, "r", [message]);
};

const addFriend = (bot: Bot, player: string): void => {
  sendHypixelCommand(bot, "f", ["add", player]);
};

const denyFriend = (bot: Bot): void => {
  sendHypixelCommand(bot, "f", ["deny"]);
};

const removeFriend = (bot: Bot, player: string): void => {
  sendHypixelCommand(bot, "f", ["remove", player]);
};

const removeAllFriends = (bot: Bot): void => {
  sendHypixelCommand(bot, "f", ["removeall"]);
};

const getFriends = (bot: Bot): void => {
  sendHypixelCommand(bot, "fl");
};

const inviteToParty = (bot: Bot, player: string): void => {
  sendHypixelCommand(bot, "p", ["invite", player]);
};

const removeFromParty = (bot: Bot, player: string): void => {
  sendHypixelCommand(bot, "p", ["remove", player]);
};

const leaveParty = (bot: Bot): void => {
  sendHypixelCommand(bot, "p", ["leave"]);
};

const disbandParty = (bot: Bot): void => {
  sendHypixelCommand(bot, "p", ["disband"]);
};

const kickOfflinePartyMembers = (bot: Bot): void => {
  sendHypixelCommand(bot, "p", ["kickoffline"]);
};

const warpParty = (bot: Bot): void => {
  sendHypixelCommand(bot, "p", ["warp"]);
};

const getPartyMembers = (bot: Bot): void => {
  sendHypixelCommand(bot, "p", ["list"]);
};

const sendPartyMessage = (bot: Bot, message: string): void => {
  sendHypixelCommand(bot, "pc", [message]);
};

const addIgnore = (bot: Bot, player: string): void => {
  sendHypixelCommand(bot, "ignore", ["add", player]);
};

const removeIgnore = (bot: Bot, player: string): void => {
  sendHypixelCommand(bot, "ignore", ["remove", player]);
};

const getIgnores = (bot: Bot): void => {
  sendHypixelCommand(bot, "ignore", ["list"]);
};

const boop = (bot: Bot, player: string): void => {
  sendHypixelCommand(bot, "boop", [player]);
};

const cookie = (bot: Bot, player: string): void => {
  sendHypixelCommand(bot, "cookie", [player]);
};

const hug = (bot: Bot, player: string): void => {
  sendHypixelCommand(bot, "hug", [player]);
};

const lobby = (bot: Bot, lobbyName?: LobbyName): void => {
  sendHypixelCommand(bot, "lobby", lobbyName ? [lobbyName] : []);
};

const toggleChat = (bot: Bot): void => {
  sendHypixelCommand(bot, "togglechat");
};

const sendGuildMessage = (bot: Bot, message: string): void => {
  sendHypixelCommand(bot, "gc", [message]);
};

const sendGuildOfficerMessage = (bot: Bot, message: string): void => {
  sendHypixelCommand(bot, "oc", [message]);
};

const toggleGuildSlowChat = (bot: Bot): void => {
  sendHypixelCommand(bot, "g", ["slow"]);
};

const muteGuildChat = (bot: Bot, duration: GuildMuteDurations): void => {
  sendHypixelCommand(bot, "g", ["mute", "everyone", duration]);
};

const muteGuildMember = (bot: Bot, member: string, duration: GuildMuteDurations): void => {
  sendHypixelCommand(bot, "g", ["mute", member, duration]);
};

const unmuteGuildChat = (bot: Bot): void => {
  sendHypixelCommand(bot, "g", ["unmute", "everyone"]);
};

const unmuteGuildMember = (bot: Bot, member: string): void => {
  sendHypixelCommand(bot, "g", ["unmute", member]);
};

const getGuildInfo = (bot: Bot): void => {
  sendHypixelCommand(bot, "g", ["info"]);
};

const getGuildMembers = (bot: Bot): void => {
  sendHypixelCommand(bot, "g", ["list"]);
};

const getGuildMember = (bot: Bot, member: string): void => {
  sendHypixelCommand(bot, "g", ["member", member]);
};

const inviteToGuild = (bot: Bot, member: string): void => {
  sendHypixelCommand(bot, "g", ["invite", member]);
};

const kickFromGuild = (bot: Bot, member: string): void => {
  sendHypixelCommand(bot, "g", ["kick", member]);
};

const promoteGuildMember = (bot: Bot, member: string): void => {
  sendHypixelCommand(bot, "g", ["promote", member]);
};

const demoteGuildMember = (bot: Bot, member: string): void => {
  sendHypixelCommand(bot, "g", ["demote", member]);
};

const sendPrivateMessage = (bot: Bot, player: string, message: string): void => {
  sendHypixelCommand(bot, "msg", [player, message]);
};

const sendSkyblockCoopMessage = (bot: Bot, message: string): void => {
  sendHypixelCommand(bot, "coop", [message]);
};

export const commands = {
  sendHypixelCommand,
  replyToPrivateMessage,
  addFriend,
  denyFriend,
  removeFriend,
  removeAllFriends,
  getFriends,
  inviteToParty,
  removeFromParty,
  leaveParty,
  disbandParty,
  kickOfflinePartyMembers,
  warpParty,
  getPartyMembers,
  sendPartyMessage,
  addIgnore,
  removeIgnore,
  getIgnores,
  boop,
  cookie,
  hug,
  lobby,
  toggleChat,
  sendGuildMessage,
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
  sendPrivateMessage,
  sendSkyblockCoopMessage,
};
