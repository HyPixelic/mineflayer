import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  addFriend,
  addIgnore,
  boop,
  cookie,
  denyFriend,
  disbandParty,
  getFriends,
  getIgnores,
  getPartyMembers,
  hug,
  inviteToParty,
  leaveParty,
  lobby,
  kickOfflinePartyMembers,
  removeAllFriends,
  removeFromParty,
  removeFriend,
  removeIgnore,
  replyToPrivateMessage,
  sendHypixelCommand,
  sendPartyMessage,
  warpParty,
} from "../dist/src/modules/commands.js";

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

    sendHypixelCommand(bot, " //p ", [" invite ", "", "Pixelic"]);

    assert.deepEqual(bot.messages, ["/p  invite  Pixelic"]);
  });

  it("Should reject empty and invalid commands", function () {
    const bot = createMockBot();

    assert.throws(() => sendHypixelCommand(bot, "/   "), /must not be empty/);
    assert.throws(() => sendHypixelCommand(bot, "/party invite"), /must not be empty/);
    assert.throws(() => sendHypixelCommand(bot, "/party\u0000invite"), /contains invalid characters/);
    assert.deepEqual(bot.messages, []);
  });

  it("Should send the expected commands for command helpers", function () {
    const commands = [
      { expected: "/r hello", command: replyToPrivateMessage, args: ["hello"] },
      { expected: "/f add Pixelic", command: addFriend, args: ["Pixelic"] },
      { expected: "/f deny", command: denyFriend },
      { expected: "/f remove Pixelic", command: removeFriend, args: ["Pixelic"] },
      { expected: "/f removeall", command: removeAllFriends },
      { expected: "/fl", command: getFriends },
      { expected: "/p invite Pixelic", command: inviteToParty, args: ["Pixelic"] },
      { expected: "/p remove Pixelic", command: removeFromParty, args: ["Pixelic"] },
      { expected: "/p leave", command: leaveParty },
      { expected: "/p disband", command: disbandParty },
      { expected: "/p kickoffline", command: kickOfflinePartyMembers },
      { expected: "/p warp", command: warpParty },
      { expected: "/p list", command: getPartyMembers },
      { expected: "/pc hello", command: sendPartyMessage, args: ["hello"] },
      { expected: "/ignore add Pixelic", command: addIgnore, args: ["Pixelic"] },
      { expected: "/ignore remove Pixelic", command: removeIgnore, args: ["Pixelic"] },
      { expected: "/ignore list", command: getIgnores },
      { expected: "/boop Pixelic", command: boop, args: ["Pixelic"] },
      { expected: "/cookie Pixelic", command: cookie, args: ["Pixelic"] },
      { expected: "/hug Pixelic", command: hug, args: ["Pixelic"] },
      { expected: "/lobby prototype", command: lobby, args: ["prototype"] },
      { expected: "/lobby", command: lobby },
    ];

    for (const { expected, command, args } of commands) {
      assertCommand(expected, command, args);
    }
  });
});
