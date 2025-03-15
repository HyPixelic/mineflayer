# HyPixelic/mineflayer (Hyflayer)

> [!CAUTION]
> Using Mineflayer and an Minecraft Account to log into Hypixel as a Bot violates Hypixels [Terms of Service](https://hypixel.net/terms).<br/> This may get your Minecraft Account banned if abused for non chat related things that give you an unfair advantage.

## ✨ Quick Start

[`npm`](https://npmjs.com/) » `npx jsr add @hypixelic/mineflayer`<br/>
[`pnpm`](https://pnpm.io/) » `pnpm dlx jsr add @hypixelic/mineflayer`<br/>
[`bun`](https://bun.sh/) » `bunx jsr add @hypixelic/mineflayer`

```TS
import mineflayer from "mineflayer";
import HyFlayer from "@hypixelic/mineflayer"

const bot = mineflayer.createBot({
  host: "hypixel.net",
  username: "MICROSOFT_ACCOUNT_EMAIL",
  auth: "microsoft",
  version: "1.8.9",
});

bot.loadPlugin(HyFlayer);
```

## ⚙️ Development

- `pnpm install`: Installs all required dependencies
- `pnpm build`: Runs the TypeScript compiler
- `pnpm test`: Launches the Mineflayer Bot for testing purposes

> [!NOTE]
> This Project is not affiliated or endorsed by [Hypixel, Inc.](https://hypixel.net/)
