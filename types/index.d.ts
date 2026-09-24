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

export type LobbyName =
  | "1v1"
  | "a"
  | "ab"
  | "arcade"
  | "arena"
  | "arena brawl"
  | "b"
  | "bb"
  | "bed"
  | "bed wars"
  | "bedwars"
  | "bg"
  | "blitz"
  | "blitz survival games"
  | "blitzsurvivalgames"
  | "bridge"
  | "bsg"
  | "build"
  | "build battle"
  | "buildbattle"
  | "bw"
  | "cac"
  | "cc"
  | "classic games"
  | "cnc"
  | "cops"
  | "cops and crims"
  | "ctf"
  | "cvc"
  | "dom"
  | "duel"
  | "duels"
  | "lobby"
  | "main lobby"
  | "mainlobby"
  | "main"
  | "classic"
  | "uhc"
  | "mega"
  | "housing"
  | "skyblock"
  | "mega walls"
  | "megawalls"
  | "mm"
  | "murder"
  | "murder mystery"
  | "murdermystery"
  | "mw"
  | "paint"
  | "paintball"
  | "party"
  | "pb"
  | "pit"
  | "prototype"
  | "prototypelobby"
  | "ptl"
  | "q"
  | "quake"
  | "quake craft"
  | "quakecraft"
  | "sb"
  | "sg"
  | "sheep"
  | "sky"
  | "skywar"
  | "skywars"
  | "smash"
  | "smash heroes"
  | "speed"
  | "speed uhc"
  | "speeduhc"
  | "supersmash"
  | "survival games"
  | "survivalgames"
  | "sw"
  | "thepit"
  | "tkr"
  | "tnt"
  | "tnt games"
  | "tntgames"
  | "tournament"
  | "tourney"
  | "turbo"
  | "turbo kart racers"
  | "uhc champions"
  | "v"
  | "vamp"
  | "vampire"
  | "vampire z"
  | "vampirez"
  | "vampz"
  | "vz"
  | "w"
  | "w3"
  | "walls"
  | "walls3"
  | "war"
  | "warlord"
  | "warlords"
  | "wl"
  | "wool"
  | "wool games"
  | "woolgames"
  | "woolwars"
  | "ww"
  | "copsandcrims"
  | (string & {});

export type HyFlayerCommandArguments = readonly string[];

export interface HyFlayerCommands {
  sendHypixelCommand: (command: string, args?: HyFlayerCommandArguments) => void;
  replyToPrivateMessage: (msg: string) => void;
  addFriend: (player: string) => void;
  denyFriend: () => void;
  removeFriend: (player: string) => void;
  removeAllFriends: () => void;
  getFriends: () => void;
  inviteToParty: (player: string) => void;
  removeFromParty: (player: string) => void;
  leaveParty: () => void;
  disbandParty: () => void;
  kickOfflinePartyMembers: () => void;
  warpParty: () => void;
  getPartyMembers: () => void;
  sendPartyMessage: (msg: string) => void;
  addIgnore: (player: string) => void;
  removeIgnore: (player: string) => void;
  getIgnores: () => void;
  boop: (player: string) => void;
  cookie: (player: string) => void;
  hug: (player: string) => void;
  lobby: (lobbyName?: LobbyName) => void;
  toggleChat: () => void;
}

/**
 * Extends the basic Mineflayer Bot interface provided by the mineflayer library.
 */
export interface Bot extends MineflayerBot {
  commands: HyFlayerCommands;
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
  denyFriend: () => void;
  removeFriend: (player: string) => void;
  removeAllFriends: () => void;
  getFriends: () => void;
  inviteToParty: (player: string) => void;
  removeFromParty: (player: string) => void;
  leaveParty: () => void;
  disbandParty: () => void;
  kickOfflinePartyMembers: () => void;
  warpParty: () => void;
  getPartyMembers: () => void;
  sendPartyMessage: (msg: string) => void;
  addIgnore: (player: string) => void;
  removeIgnore: (player: string) => void;
  getIgnores: () => void;
  boop: (player: string) => void;
  cookie: (player: string) => void;
  hug: (player: string) => void;
  lobby: (lobbyName?: LobbyName) => void;
  toggleChat: () => void;
  sendHypixelCommand: Commands["sendHypixelCommand"];
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
