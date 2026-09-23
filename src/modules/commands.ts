import type { Bot } from "../../types/index.d.ts";

const validateArgument = (arg: string): boolean => !/[\u0000-\u001f\u007f]/.test(arg);

export const sendHypixelCommand = (bot: Bot, command: string, args: readonly string[] = []): void => {
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

export const replyToPrivateMessage = (bot: Bot, message: string): void => {
  sendHypixelCommand(bot, "r", [message]);
};

export const addFriend = (bot: Bot, player: string): void => {
  sendHypixelCommand(bot, "f", ["add", player]);
};

export const removeFriend = (bot: Bot, player: string): void => {
  sendHypixelCommand(bot, "f", ["remove", player]);
};

export const listFriends = (bot: Bot): void => {
  sendHypixelCommand(bot, "fl");
};

export const inviteToParty = (bot: Bot, player: string): void => {
  sendHypixelCommand(bot, "p", ["invite", player]);
};

export const removeFromParty = (bot: Bot, player: string): void => {
  sendHypixelCommand(bot, "p", ["remove", player]);
};

export const leaveParty = (bot: Bot): void => {
  sendHypixelCommand(bot, "p", ["leave"]);
};

export const listPartyMembers = (bot: Bot): void => {
  sendHypixelCommand(bot, "p", ["list"]);
};

export const sendPartyMessage = (bot: Bot, message: string): void => {
  sendHypixelCommand(bot, "pc", [message]);
};

export const addIgnore = (bot: Bot, player: string): void => {
  sendHypixelCommand(bot, "ignore", ["add", player]);
};

export const removeIgnore = (bot: Bot, player: string): void => {
  sendHypixelCommand(bot, "ignore", ["remove", player]);
};

export const listIgnores = (bot: Bot): void => {
  sendHypixelCommand(bot, "ignore", ["list"]);
};
