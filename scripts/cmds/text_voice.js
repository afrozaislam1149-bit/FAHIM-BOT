const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "text_voice",
    version: "1.0.6",
    author: "MR_FARHAN", // ⚠️ DO NOT CHANGE THIS (LOCKED)
    countDown: 1,
    role: 0,
    shortDescription: "Ultra Fast Voice Reply",
    longDescription: "Sends specific voice messages instantly using local cache",
    category: "system"
  },

  _authorLock: function () {
    const expectedAuthor = "MR_FARHAN";
    if (module.exports.config.author !== expectedAuthor) {
      throw new Error("🚫 AUTHOR LOCKED: You are not allowed to change author name!");
    }
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    this._authorLock();

    if (!event.body) return;

    const input = event.body.toLowerCase().trim();

    const voiceMap = {
      "magi": [
        "https://files.catbox.moe/8iohbn.mp4",
        "https://files.catbox.moe/zs1v3i.mp4",
        "https://files.catbox.moe/sdcjc6.mp4",
        "https://files.catbox.moe/2rjsbf.mp4",
        "https://files.catbox.moe/545cye.mp4",
        "https://files.catbox.moe/4o50lr.mp4",
        "https://files.catbox.moe/2xzljw.mp4",
        "https://files.catbox.moe/t005nq.mp4",
        "https://files.catbox.moe/hkuu1g.mp4"
      ],

      "khanki": [
        "https://files.catbox.moe/zah3gd.mp4",
        "https://files.catbox.moe/dnuqtb.mp4",
        "https://files.catbox.moe/euhh1j.mp4",
        "https://files.catbox.moe/28zdh0.mp4",
        "https://files.catbox.moe/u6uhih.mp4",
        "https://files.catbox.moe/kjuygx.mp4",
        "https://files.catbox.moe/agbbr7.mp4"
      ],

      "fahim": [
        "https://files.catbox.moe/v0c93q.mp4",
        "https://files.catbox.moe/vn4iiv.mp4",
        "https://files.catbox.moe/lw4gip.mp4",
        "https://files.catbox.moe/7dhh65.mp4",
        "https://files.catbox.moe/t1o8nu.mp4",
        "https://files.catbox.moe/53ki3x.mp4",
        "https://files.catbox.moe/2riyds.mp4",
        "https://files.catbox.moe/u2inzy.mp4",
        "https://files.catbox.moe/zabqtx.mp4",
        "https://files.catbox.moe/lvat8q.mp4"
      ],

      "byee": [
        "https://files.catbox.moe/s462pk.mp4",
        "https://files.catbox.moe/esuxkr.mp4",
        "https://files.catbox.moe/f8xkp2.mp4",
        "https://files.catbox.moe/7ng9cb.mp4",
        "https://files.catbox.moe/mhi9ty.mp4",
        "https://files.catbox.moe/91pi11.mp4"
      ],

      "hatmara magi": "https://files.catbox.moe/63hyw2.mp4",
      "video call": "https://files.catbox.moe/kje55j.mp4",
      "fahim bai": "https://files.catbox.moe/91qnco.mp4",
      "good night": "https://files.catbox.moe/i29m4q.mp3",
      "good morning": "https://files.catbox.moe/8gzqx5.mp3"
    };

    let audioUrl = voiceMap[input];

    // 🎲 Random system
    if (Array.isArray(audioUrl)) {
      audioUrl = audioUrl[Math.floor(Math.random() * audioUrl.length)];
    }

    if (!audioUrl) return;

    const cacheDir = path.join(__dirname, "cache", "voices");
    fs.ensureDirSync(cacheDir);

    const ext = audioUrl.includes(".mp3") ? ".mp3" : ".mp4";
    const fileName = `${Buffer.from(input).toString("hex")}${ext}`;
    const filePath = path.join(cacheDir, fileName);

    try {
      if (fs.existsSync(filePath)) {
        return await message.reply({
          attachment: fs.createReadStream(filePath)
        });
      }

      const response = await axios.get(audioUrl, {
        responseType: "arraybuffer"
      });

      await fs.writeFile(filePath, Buffer.from(response.data));

      return await message.reply({
        attachment: fs.createReadStream(filePath)
      });

    } catch (error) {
      console.error("Error sending voice:", error);
    }
  }
};