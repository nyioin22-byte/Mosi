import { Client, GatewayIntentBits } from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";

const BOTS = [

BOTS.forEach((botConfig, index) => {
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

    console.log(`Bot ${index + 1} joined its voice channel`);
  });

  client.login(botConfig.token);
});
