import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { commands } from "../dist/src/modules/commands.js";

const createMockBot = () => {
  const messages = [];

  return {
    messages,
    chat(message) {
      messages.push(message);
    },
  };
};

const assertCommand = (expected, command, args = []) => {
  const bot = createMockBot();

  command(bot, ...args);

  assert.deepEqual(bot.messages, [expected]);
};

describe("sendHypixelCommand()", function () {
  it("Should send a properly formatted commands", function () {
    const bot = createMockBot();

    commands.sendHypixelCommand(bot, " //p ", [" invite ", "", "Pixelic"]);

    assert.deepEqual(bot.messages, ["/p  invite  Pixelic"]);
  });

  it("Should reject empty and invalid commands", function () {
    const bot = createMockBot();

    assert.throws(() => commands.sendHypixelCommand(bot, "/   "), /must not be empty/);
    assert.throws(() => commands.sendHypixelCommand(bot, "/party invite"), /must not be empty/);
    assert.throws(() => commands.sendHypixelCommand(bot, "/party\u0000invite"), /contains invalid characters/);
    assert.deepEqual(bot.messages, []);
  });

  it("Should send the expected commands for command helpers", function () {
    const commandCases = [
      { expected: "/r hello", command: commands.replyToPrivateMessage, args: ["hello"] },
      { expected: "/f add Pixelic", command: commands.addFriend, args: ["Pixelic"] },
      { expected: "/f deny", command: commands.denyFriend },
      { expected: "/f remove Pixelic", command: commands.removeFriend, args: ["Pixelic"] },
      { expected: "/f removeall", command: commands.removeAllFriends },
      { expected: "/fl", command: commands.getFriends },
      { expected: "/p invite Pixelic", command: commands.inviteToParty, args: ["Pixelic"] },
      { expected: "/p remove Pixelic", command: commands.removeFromParty, args: ["Pixelic"] },
      { expected: "/p leave", command: commands.leaveParty },
      { expected: "/p disband", command: commands.disbandParty },
      { expected: "/p kickoffline", command: commands.kickOfflinePartyMembers },
      { expected: "/p warp", command: commands.warpParty },
      { expected: "/p list", command: commands.getPartyMembers },
      { expected: "/pc hello", command: commands.sendPartyMessage, args: ["hello"] },
      { expected: "/ignore add Pixelic", command: commands.addIgnore, args: ["Pixelic"] },
      { expected: "/ignore remove Pixelic", command: commands.removeIgnore, args: ["Pixelic"] },
      { expected: "/ignore list", command: commands.getIgnores },
      { expected: "/boop Pixelic", command: commands.boop, args: ["Pixelic"] },
      { expected: "/cookie Pixelic", command: commands.cookie, args: ["Pixelic"] },
      { expected: "/hug Pixelic", command: commands.hug, args: ["Pixelic"] },
      { expected: "/lobby prototype", command: commands.lobby, args: ["prototype"] },
      { expected: "/lobby SkyBlock", command: commands.lobby, args: ["SkyBlock"] },
      { expected: "/lobby", command: commands.lobby },
      { expected: "/togglechat", command: commands.toggleChat },
    ];

    for (const { expected, command, args } of commandCases) {
      assertCommand(expected, command, args);
    }
  });
});
