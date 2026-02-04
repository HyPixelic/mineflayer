import mineflayer from "mineflayer";
import { HyFlayer } from "../dist/index.js";

const bot = mineflayer.createBot({
  host: "hypixel.net",
  username: process.env.MICROSOFT_ACCOUNT_EMAIL,
  auth: "microsoft",
  version: "1.8.9",
});

bot.loadPlugin(HyFlayer);

setTimeout(() => {
  bot.chat("/limbo");
  /* Latency will only be available later and will not be shown here */
  console.log("Proxy Info » " + JSON.stringify(bot.hypixel.proxy));
}, 3000);

bot.on("HYFLAYER_LOCATION", (event) => {
  console.log("HYFLAYER_LOCATION » " + JSON.stringify(event));
});
bot.on("HYFLAYER_GUILD_CHAT", (event) => {
  console.log("HYFLAYER_GUILD_CHAT » " + JSON.stringify(event));
});
bot.on("HYFLAYER_GUILD_OFFICER_CHAT", (event) => {
  console.log("HYFLAYER_GUILD_OFFICER_CHAT » " + JSON.stringify(event));
});
bot.on("HYFLAYER_GUILD_JOIN", (event) => {
  console.log("HYFLAYER_GUILD_JOIN » " + JSON.stringify(event));
});
bot.on("HYFLAYER_GUILD_LEAVE", (event) => {
  console.log("HYFLAYER_GUILD_LEAVE » " + JSON.stringify(event));
});
bot.on("HYFLAYER_SKYBLOCK_COOP_CHAT", (event) => {
  console.log("HYFLAYER_SKYBLOCK_COOP_CHAT » " + JSON.stringify(event));
});
bot.on("HYFLAYER_PRIVATE_CHAT", (event) => {
  console.log("HYFLAYER_PRIVATE_CHAT » " + JSON.stringify(event));
});
