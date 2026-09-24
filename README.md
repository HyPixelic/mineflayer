# HyPixelic/mineflayer (Hyflayer)

![Version](https://jsr.io/badges/@hypixelic/mineflayer)
![Downloads](https://jsr.io/badges/@hypixelic/mineflayer/total-downloads)

> [!CAUTION]
> Using Mineflayer and an Minecraft Account to log into Hypixel as a Bot violates Hypixels [Terms of Service](https://hypixel.net/terms).<br/> This may get your Minecraft Account banned if abused for non chat related things that give you an unfair advantage.

## ✨ Quick Start

[`npm`](https://npmjs.com/) » `npx jsr add @hypixelic/mineflayer`<br/>
[`pnpm`](https://pnpm.io/) » `pnpm dlx jsr add @hypixelic/mineflayer`<br/>
[`bun`](https://bun.sh/) » `bunx jsr add @hypixelic/mineflayer`

```TS
import mineflayer from "mineflayer";
import { HyFlayer, Bot as HyFlayerBot } from "@hypixelic/mineflayer"

// The following type trickery is needed as mineflayer isn't really type compatible.

// @ts-expect-error
const bot = mineflayer.createBot({
  host: "hypixel.net",
  username: "MICROSOFT_ACCOUNT_EMAIL",
  auth: "microsoft",
  version: "1.8.9",
}) as HyFlayerBot

const hyflayer = HyFlayer()

// @ts-expect-error
bot.loadPlugin(hyflayer);

bot.on("HYFLAYER_GUILD_CHAT", (event) => {
  /*
  On every Message sent in the Guild Chat you will now receive an Event Object structured like below:
  {
    "UUID":"14727faefbdc4aff848cd2713eb9939e",
    "username":"Pixelic",
    "message":"Hey",
    "timestamp":1742216120
  }
  */
});
```

## Commands

Commands are available through the bound `bot.commands` namespace:

```TS
bot.commands.inviteToParty("Pixelic");
```

### Messaging

- `bot.sendPrivateMessage(player, message)`
- `bot.commands.replyToPrivateMessage(message)`
- `bot.commands.sendPartyMessage(message)`
- `bot.sendGuildMessage(message)`
- `bot.sendGuildOfficerMessage(message)`
- `bot.sendSkyblockCoopMessage(message)`

### Friends

- `bot.commands.addFriend(player)`
- `bot.commands.denyFriend()`
- `bot.commands.removeFriend(player)`
- `bot.commands.removeAllFriends()`
- `bot.commands.getFriends()`

### Party

- `bot.commands.inviteToParty(player)`
- `bot.commands.removeFromParty(player)`
- `bot.commands.leaveParty()`
- `bot.commands.disbandParty()`
- `bot.commands.kickOfflinePartyMembers()`
- `bot.commands.warpParty()`
- `bot.commands.getPartyMembers()`

### Guild

- `bot.sendGuildMessage(message)`
- `bot.sendGuildOfficerMessage(message)`
- `bot.toggleGuildSlowChat()`
- `bot.muteGuildChat(duration)`
- `bot.muteGuildMember(member, duration)`
- `bot.unmuteGuildChat()`
- `bot.unmuteGuildMember(member)`
- `bot.getGuildInfo()`
- `bot.getGuildMembers()`
- `bot.getGuildMember(member)`
- `bot.inviteToGuild(member)`
- `bot.kickFromGuild(member)`
- `bot.promoteGuildMember(member)`
- `bot.demoteGuildMember(member)`

### Ignore List

- `bot.commands.addIgnore(player)`
- `bot.commands.removeIgnore(player)`
- `bot.commands.getIgnores()`

### Social

- `bot.commands.boop(player)`
- `bot.commands.cookie(player)`
- `bot.commands.hug(player)`

### Navigation And Chat

- `bot.commands.lobby(lobbyName)`
- `bot.commands.toggleChat()`
- `bot.commands.sendHypixelCommand(command, args)`

`lobbyName` accepts Hypixel lobby IDs and aliases such as `"bedwars"`, `"skyblock"`, and `"SkyBlock"`.

## ⚙️ Development

- `pnpm install`: Installs all required dependencies
- `pnpm build`: Runs the TypeScript compiler
- `pnpm test`: Runs the local mocked command tests
- `pnpm test:live`: Launches the Mineflayer Bot for live testing

> [!NOTE]
> This Project is not affiliated or endorsed by [Hypixel, Inc.](https://hypixel.net/)
