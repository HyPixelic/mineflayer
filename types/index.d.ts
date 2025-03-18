import type { Bot as MineflayerBot, BotEvents as MineflayerBotEvents } from "mineflayer";

export interface LocationEvent {
  server: string;
  gamemode: null | string;
  mode: null | string;
  map: null | string;
  lobby: null | number;
}

export interface PlayerEvent {
  UUID: string;
  username: string;
  timestamp: number;
}

export interface ChatEvent extends PlayerEvent {
  message: string;
}

export interface Bot extends MineflayerBot {
  mowojang: any;
  hypixel: any;
  on<U extends keyof BotEvents>(event: U, listener: BotEvents[U]): this;
  once<U extends keyof BotEvents>(event: U, listener: BotEvents[U]): this;
  emit<U extends keyof BotEvents>(event: U, ...args: Parameters<BotEvents[U]>): void;
}

export interface BotEvents extends MineflayerBotEvents {
  "chat:hypixel_location": (msg: string) => void;
  "chat:hypixel_guild_chat": (msg: string) => void;
  "chat:hypixel_guild_officer_chat": (msg: string) => void;
  "chat:hypixel_guild_join": (msg: string) => void;
  "chat:hypixel_guild_leave": (msg: string) => void;
  "chat:hypixel_skyblock_coop_chat": (msg: string) => void;
  "chat:hypixel_private_chat": (msg: string) => void;
  HYFLAYER_LOCATION: (event: LocationEvent) => void;
  HYFLAYER_GUILD_CHAT: (event: ChatEvent) => void;
  HYFLAYER_GUILD_OFFICER_CHAT: (event: ChatEvent) => void;
  HYFLAYER_GUILD_JOIN: (event: PlayerEvent) => void;
  HYFLAYER_GUILD_LEAVE: (event: PlayerEvent) => void;
  HYFLAYER_SKYBLOCK_COOP_CHAT: (event: ChatEvent) => void;
  HYFLAYER_PRIVATE_CHAT: (event: ChatEvent) => void;
}
