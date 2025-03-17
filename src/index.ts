import { Client as MowojangClient } from "mowojang";
import {
  getLocation,
  parseLocation,
  parseGuildChat,
  parseGuildEvents,
  parsePrivateChat,
  parseSkyblockCoopChat,
} from "./modules/index.js";
import type { Bot } from "mineflayer";

interface LocationEvent {
  server: string;
  gamemode: null | string;
  mode: null | string;
  map: null | string;
  lobby: null | number;
}

interface GuildChatEvent {
  UUID: string;
  username: string;
  message: string;
  timestamp: number;
}

interface GuildOfficerChatEvent {
  UUID: string;
  username: string;
  message: string;
  timestamp: number;
}

interface GuildJoinEvent {
  UUID: string;
  username: string;
  timestamp: number;
}

interface GuildLeaveEvent {
  UUID: string;
  username: string;
  timestamp: number;
}

interface SkyblockCoopChatEvent {
  UUID: string;
  username: string;
  message: string;
  timestamp: number;
}

interface PrivateChatEvent {
  UUID: string;
  username: string;
  message: string;
  timestamp: number;
}

declare module "mineflayer" {
  interface Bot {
    mowojang: any;
    hypixel: any;
  }
  interface BotEvents {
    "chat:hypixel_location": (msg: string) => void;
    "chat:hypixel_guild_chat": (msg: string) => void;
    "chat:hypixel_guild_officer_chat": (msg: string) => void;
    "chat:hypixel_guild_join": (msg: string) => void;
    "chat:hypixel_guild_leave": (msg: string) => void;
    "chat:hypixel_skyblock_coop_chat": (msg: string) => void;
    "chat:hypixel_private_chat": (msg: string) => void;
    HYPIXELIC_LOCATION: (event: LocationEvent) => void;
    HYPIXELIC_GUILD_CHAT: (event: GuildChatEvent) => void;
    HYPIXELIC_GUILD_OFFICER_CHAT: (event: GuildOfficerChatEvent) => void;
    HYPIXELIC_GUILD_JOIN: (event: GuildJoinEvent) => void;
    HYPIXELIC_GUILD_LEAVE: (event: GuildLeaveEvent) => void;
    HYPIXELIC_SKYBLOCK_COOP_CHAT: (event: SkyblockCoopChatEvent) => void;
    HYPIXELIC_PRIVATE_CHAT: (event: PrivateChatEvent) => void;
  }
}

export default function (bot: Bot, options: any) {
  bot.mowojang = new MowojangClient();
  bot.hypixel = {
    location: {},
  };
  parseLocation(bot);
  bot.once("spawn", () => getLocation(bot));
  bot.on("respawn", () => getLocation(bot));
  parsePrivateChat(bot);
  parseSkyblockCoopChat(bot);
  parseGuildChat(bot);
  parseGuildEvents(bot);
}
