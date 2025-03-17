import { Client as MowojangClient } from "mowojang";
import {
  getLocation,
  parseLocation,
  parseGuildChat,
  parseGuildEvents,
  parsePrivateChat,
  parseSkyblockCoopChat,
} from "./modules/index.js";
import type { Bot } from "../types/index.js";

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
