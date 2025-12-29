import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";
import bots from "./bots.js";

bots.forEach((botConfig, index) => {
  if (!botConfig.token) {
    console.log(`Token missing for bot ${index + 1}`);
    return;
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates
    ]
  });

  client.once("ready", async () => {
    console.log(`Bot ${index + 1} logged in`);

    const guild = await client.guilds.fetch(botConfig.guildId);
    const channel = guild.channels.cache.get(botConfig.voiceChannelId);

    if (!channel) {
      console.log(`Voice channel not found for bot ${index + 1}`);
      return;
    }

    joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfDeaf: true,
      selfMute: false
    });

    console.log(`Bot ${index + 1} joined voice`);
  });

  client.login(botConfig.token);
});

