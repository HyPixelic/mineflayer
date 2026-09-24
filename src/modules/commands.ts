import type { Bot, LobbyName } from "../../types/index.d.ts";

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
};
