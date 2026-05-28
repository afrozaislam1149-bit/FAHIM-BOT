const axios = require("axios");
const fs = require("fs");
const path = require("path");
const yts = require("yt-search");

const apiConfigUrl =
  "https://raw.githubusercontent.com/aryannix/stuffs/master/raw/apis.json";

module.exports = {
  config: {
    name: "song",
    aliases: ["music", "sing"],
    version: "1.0.0",
    author: "FARHAN-KHAN (GPT FIXED)",
    countDown: 5,
    role: 0,
    shortDescription: "Download music from YouTube",
    longDescription: "Search and download music from YouTube",
    category: "MUSIC",
    guide: "{p}song <name or youtube link>"
  },

  onStart: async function ({ api, event, args }) {
    if (!args.length) {
      return api.sendMessage(
        "❌ Give a song name or YouTube link.",
        event.threadID,
        event.messageID
      );
    }

    let loadingMsg;

    try {
      loadingMsg = await api.sendMessage(
        "🎵 Searching song...",
        event.threadID,
        event.messageID
      );

      // GET API CONFIG
      const configRes = await axios.get(apiConfigUrl);
      const baseApi = configRes.data?.api;

      if (!baseApi) throw new Error("API config missing");

      const input = args.join(" ");
      let videoUrl;

      // CHECK URL OR SEARCH
      if (input.startsWith("http")) {
        videoUrl = input;
      } else {
        const search = await yts(input);
        if (!search.videos.length) throw new Error("No song found");
        videoUrl = search.videos[0].url;
      }

      // DOWNLOAD API CALL
      const apiUrl = `${baseApi}/play?url=${encodeURIComponent(videoUrl)}`;
      const res = await axios.get(apiUrl);
      const data = res.data;

      if (!data?.status || !data?.downloadUrl) {
        throw new Error("Download API failed");
      }

      // FILE NAME SAFE
      const fileName = `${data.title}.mp3`.replace(/[\\/:"*?<>|]/g, "");
      const filePath = path.join(__dirname, fileName);

      // DOWNLOAD AUDIO
      const audio = await axios.get(data.downloadUrl, {
        responseType: "arraybuffer"
      });

      fs.writeFileSync(filePath, audio.data);

      // SEND SONG
      await api.sendMessage(
        {
          body: `🎵 SONG READY\n━━━━━━━━━━━━━━\n\n${data.title}`,
          attachment: fs.createReadStream(filePath)
        },
        event.threadID,
        event.messageID
      );

      // CLEAN FILE
      fs.unlinkSync(filePath);

      if (loadingMsg?.messageID) {
        api.unsendMessage(loadingMsg.messageID);
      }

    } catch (err) {
      console.error(err);

      try {
        if (loadingMsg?.messageID) {
          api.unsendMessage(loadingMsg.messageID);
        }
      } catch {}

      return api.sendMessage(
        `❌ Error: ${err.message}`,
        event.threadID,
        event.messageID
      );
    }
  }
};