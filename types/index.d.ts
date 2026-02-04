import type { Bot as MineflayerBot, BotEvents as MineflayerBotEvents } from "mineflayer";
import type { Client as MowojangClient } from "mowojang";

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
export interface LocationEvent {
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
export interface PlayerEvent {
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
export interface PlayerChatEvent extends PlayerEvent {
  message: string;
}

/**
 * Extendes the basic Mineflayer Bot interface provided by the mineflayer library.
 */
export interface Bot extends MineflayerBot {
  mowojang: MowojangClient;
  hypixel: {
    location: LocationEvent;
  };
  sendGuildMessage: (msg: string) => void;
  sendGuildOfficerMessage: (msg: string) => void;
  sendPrivateMessage: (player: string, msg: string) => void;
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
  HYFLAYER_LOCATION: (event: LocationEvent) => void;
  HYFLAYER_GUILD_CHAT: (event: PlayerChatEvent) => void;
  HYFLAYER_GUILD_OFFICER_CHAT: (event: PlayerChatEvent) => void;
  HYFLAYER_GUILD_JOIN: (event: PlayerEvent) => void;
  HYFLAYER_GUILD_LEAVE: (event: PlayerEvent) => void;
  HYFLAYER_SKYBLOCK_COOP_CHAT: (event: PlayerChatEvent) => void;
  HYFLAYER_PRIVATE_CHAT: (event: PlayerChatEvent) => void;
}
