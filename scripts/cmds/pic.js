const axios = require("axios");

module.exports = {
  config: {
    name: "pic",
    version: "3.0.0",
    author: "MR_FARHAN (PRO FIX)",
    role: 0,
    category: "image",
    countDown: 3,
    guide: {
      en: "pic <cat/anime/nature/cat/dog/random>"
    }
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID } = event;

    const type = (args[0] || "random").toLowerCase();

    let url = "";

    try {
      await api.sendMessage("🖼️ Loading image...", threadID, messageID);

      // 🔥 CATEGORY SYSTEM
      if (type === "anime") {
        url = `https://api.waifu.pics/sfw/waifu`;
      }

      else if (type === "cat") {
        url = `https://api.thecatapi.com/v1/images/search`;
      }

      else if (type === "dog") {
        url = `https://dog.ceo/api/breeds/image/random`;
      }

      else {
        url = `https://source.unsplash.com/600x600/?${encodeURIComponent(type)}`;
      }

      const res = await axios.get(url);

      // 🔥 extract image properly
      let imgUrl;

      if (type === "dog") {
        imgUrl = res.data.message;
      }
      else if (type === "cat") {
        imgUrl = res.data[0].url;
      }
      else if (type === "anime") {
        imgUrl = res.data.url;
      }
      else {
        imgUrl = url;
      }

      const img = await axios.get(imgUrl, {
        responseType: "stream",
        timeout: 15000
      });

      return api.sendMessage(
        {
          body: `🖼️ Category: ${type}`,
          attachment: img.data
        },
        threadID,
        messageID
      );

    } catch (err) {
      console.log(err);
      return api.sendMessage(
        "❌ Image load failed, try again",
        threadID,
        messageID
      );
    }
  }
};