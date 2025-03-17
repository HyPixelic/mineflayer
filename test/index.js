import mineflayer from "mineflayer";
import HyFlayer from "../dist/index.js";

const bot = mineflayer.createBot({
  host: "hypixel.net",
  username: process.env.MICROSOFT_ACCOUNT_EMAIL,
  auth: "microsoft",
  version: "1.8.9",
});

bot.loadPlugin(HyFlayer);

bot.on("HYPIXELIC_LOCATION", (event) => {
  console.log("HYPIXELIC_LOCATION » " + JSON.stringify(event));
});
bot.on("HYPIXELIC_GUILD_CHAT", (event) => {
  console.log("HYPIXELIC_GUILD_CHAT » " + JSON.stringify(event));
});
bot.on("HYPIXELIC_GUILD_OFFICER_CHAT", (event) => {
  console.log("HYPIXELIC_GUILD_OFFICER_CHAT » " + JSON.stringify(event));
});
bot.on("HYPIXELIC_GUILD_JOIN", (event) => {
  console.log("HYPIXELIC_GUILD_JOIN » " + JSON.stringify(event));
});
bot.on("HYPIXELIC_GUILD_LEAVE", (event) => {
  console.log("HYPIXELIC_GUILD_LEAVE » " + JSON.stringify(event));
});
