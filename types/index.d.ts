import type { Bot as MineflayerBot, BotEvents as MineflayerBotEvents } from "mineflayer";
import type { Client as MowojangClient } from "mowojang";

export interface HyFlayerPluginOptions {
  mowojang?: MowojangClient;
}

/**
 * HyFlayer Location Event, this Event is emitted everytime the Mineflayer Bot detects a "spawn" or "respawn" Event.
 *
 * @example {
 * server: "dynamiclobby32C",
 * gamemode: "MAIN",
 * mode: null,
 * map: null,
 * lobby: 1
 * }
 */
export interface HyFlayerLocationEvent {
  server: string;
  gamemode: null | string;
  mode: null | string;
  map: null | string;
  lobby: null | number;
}

/**
 * HyFlayer Player Event, this Event is emitted everytime the Mineflayer Bot detects a predefined Player related Event.
 *
 * @example {
 * UUID: "14727faefbdc4aff848cd2713eb9939e",
 * username: "Pixelic",
 * timestamp: 1742627353
 * }
 */
export interface HyFlayerPlayerEvent {
  UUID: string;
  username: string;
  timestamp: number;
}

/**
 * HyFlayer Player Chat Event, this Event is emitted everytime the Mineflayer Bot detects a predefined Player Chat related Event.
 *
 * @example {
 * UUID: "14727faefbdc4aff848cd2713eb9939e",
 * username: "Pixelic",
 * message: "Hii <3"
 * timestamp: 1742627353
 * }
 */
export interface HyFlayerPlayerChatEvent extends HyFlayerPlayerEvent {
  message: string;
}

export type GuildMuteDurations = "5m" | "15m" | "30m" | "1h" | "3h" | "6h" | "12h" | "1d" | "3d" | "5d" | "7d" | string;

export type CommandArguments = readonly string[];

/**
 * Extends the basic Mineflayer Bot interface provided by the mineflayer library.
 */
export interface Bot extends MineflayerBot {
  mowojang: MowojangClient;
  hypixel: {
    proxy: {
      ip?: string;
      port?: number;
      latency?: number;
    };
    location: HyFlayerLocationEvent;
  };
  sendGuildMessage: (msg: string) => void;
  sendGuildOfficerMessage: (msg: string) => void;
  toggleGuildSlowChat: () => void;
  muteGuildChat: (duration: GuildMuteDurations) => void;
  muteGuildMember: (member: string, duration: GuildMuteDurations) => void;
  unmuteGuildChat: () => void;
  unmuteGuildMember: (member: string) => void;
  getGuildInfo: () => void;
  getGuildMembers: () => void;
  getGuildMember: (member: string) => void;
  inviteToGuild: (member: string) => void;
  kickFromGuild: (member: string) => void;
  promoteGuildMember: (member: string) => void;
  demoteGuildMember: (member: string) => void;
  sendPrivateMessage: (player: string, msg: string) => void;
  replyToPrivateMessage: (msg: string) => void;
  addFriend: (player: string) => void;
  removeFriend: (player: string) => void;
  listFriends: () => void;
  inviteToParty: (player: string) => void;
  removeFromParty: (player: string) => void;
  leaveParty: () => void;
  listPartyMembers: () => void;
  sendPartyMessage: (msg: string) => void;
  addIgnore: (player: string) => void;
  removeIgnore: (player: string) => void;
  listIgnores: () => void;
  sendHypixelCommand: (command: string, args?: CommandArguments) => void;
  sendSkyblockCoopMessage: (msg: string) => void;
  on<U extends keyof BotEvents>(event: U, listener: BotEvents[U]): this;
  once<U extends keyof BotEvents>(event: U, listener: BotEvents[U]): this;
  emit<U extends keyof BotEvents>(event: U, ...args: Parameters<BotEvents[U]>): void;
}

/**
 * Extends the basic Mineflayer BotEvents interface provided by the mineflayer library.
 */
export interface BotEvents extends MineflayerBotEvents {
  "chat:hypixel_location": (msg: string) => void;
  "chat:hypixel_guild_chat": (msg: string) => void;
  "chat:hypixel_guild_officer_chat": (msg: string) => void;
  "chat:hypixel_guild_join": (msg: string) => void;
  "chat:hypixel_guild_leave": (msg: string) => void;
  "chat:hypixel_skyblock_coop_chat": (msg: string) => void;
  "chat:hypixel_private_chat": (msg: string) => void;
  HYFLAYER_LOCATION: (event: HyFlayerLocationEvent) => void;
  HYFLAYER_GUILD_CHAT: (event: HyFlayerPlayerChatEvent) => void;
  HYFLAYER_GUILD_OFFICER_CHAT: (event: HyFlayerPlayerChatEvent) => void;
  HYFLAYER_GUILD_JOIN: (event: HyFlayerPlayerEvent) => void;
  HYFLAYER_GUILD_LEAVE: (event: HyFlayerPlayerEvent) => void;
  HYFLAYER_SKYBLOCK_COOP_CHAT: (event: HyFlayerPlayerChatEvent) => void;
  HYFLAYER_PRIVATE_CHAT: (event: HyFlayerPlayerChatEvent) => void;
}
