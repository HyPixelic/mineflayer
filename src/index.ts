import { Client as MowojangClient } from "mowojang";
import {
  getLocation,
  parseLocation,
  parseGuildChat,
  parseGuildEvents,
  parsePrivateChat,
  parseSkyblockCoopChat,
} from "./modules/index.js";

import type { Bot } from "../types/index.d.ts";
export type * from "../types/index.d.ts";

export const HyFlayer = (bot: Bot): void => {
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
};
