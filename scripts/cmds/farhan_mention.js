const axios = require("axios");

let songIndex = 0;

module.exports = {
  config: {
    name: "adminmention",
    version: "20.0.0",
    author: "Farhan-Khan",
    countDown: 0,
    role: 0,
    shortDescription: "Fast caption + song reply",
    category: "system"
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {

    // 🔒 Author Lock
    if (this.config.author !== "Farhan-Khan") return;

    const admins = [
      {
        uid: "61589439339903",
        names: ["M'ʀ", "ফাহিম", "fahim", "Fahim"]
      },
      {
        uid: "61589439339903",
        names: ["Admin"]
      }
    ];

    const senderID = String(event.senderID);

    // ❌ Ignore Admin Self Mention
    if (admins.some(a => a.uid === senderID)) return;

    const text = (event.body || "").toLowerCase();

    const mentionedIDs = event.mentions
      ? Object.keys(event.mentions)
      : [];

    // ✅ Detect Mention
    const isMentioning = admins.some(admin =>
      mentionedIDs.includes(admin.uid) ||
      admin.names.some(name =>
        text.includes(name.toLowerCase())
      )
    );

    if (!isMentioning) return;

    // 🎵 Songs
    const songs = [
      "https://files.catbox.moe/633jsc.mp3",
      "https://files.catbox.moe/xr7tu5.mp3",
      "https://files.catbox.moe/ldigw8.mp3",
      "https://files.catbox.moe/uljq3d.mp3",
      "https://files.catbox.moe/i6mfe7.mp3",
      "https://files.catbox.moe/yhdt2u.mp3",
      "https://files.catbox.moe/802eft.mp3",
      "https://files.catbox.moe/sm9sz0.mp3",

      "https://files.catbox.moe/rbbukc.mp3",
      "https://files.catbox.moe/lssnaq.mp3",
      "https://files.catbox.moe/dwwa0b.mp3",
      "https://files.catbox.moe/oqdhpi.mp3",
      "https://files.catbox.moe/kgl4qy.mp3",
      "https://files.catbox.moe/q62hco.mp3",
      "https://files.catbox.moe/941wy3.mp3",
      "https://files.catbox.moe/y951y2.mp3",
      "https://files.catbox.moe/j8aly8.mp3",
      "https://files.catbox.moe/knbcsa.mp3",
      "https://files.catbox.moe/6r9a0q.mp3",
      "https://files.catbox.moe/tksdsh.mp3",
      "https://files.catbox.moe/ng48w0.mp3",
      "https://files.catbox.moe/xpsbrv.mp3",
      "https://files.catbox.moe/yclzbp.mp3",
      "https://files.catbox.moe/jtselt.mp3",
      "https://files.catbox.moe/k6zvre.mp3",
      "https://files.catbox.moe/n00sm0.mp3",
      "https://files.catbox.moe/vobj4c.mp3",
      "https://files.catbox.moe/nv8t0p.mp3",
      "https://files.catbox.moe/znipjw.mp3",
      "https://files.catbox.moe/d0lcxj.mp3",
      "https://files.catbox.moe/cf01jp.mp3",
      "https://files.catbox.moe/q7fu6p.mp3"
    ];

    const songUrl = songs[songIndex];
    songIndex = (songIndex + 1) % songs.length;

    // ✍️ Funny Captions
    const captions = [
      "Mantion_দিস না ফাহিম বস এর মন ভালো নেই আস্কে-!💔🥀",
      "আমার বস ফাহিম এর সাথে কেউ সেক্স করে না থুক্কু টেক্স করে নাহ🫂💔",
      "👉আমার বস ফাহিম এখন বিজি আছে 😎 ইনবক্সে মেসেজ দিয়ে রাখো 🐒",
      "বস ফাহিম কে এত মেনশন না দিয়ে বক্স আসো 😘",
      "বস ফাহিম কে Mantion_দিলে চুম্মাইয়া ঠুটের কালার change কইরা লামু 💋😾",
      "ফাহিম বস এখন বিজি 😼 যা বলার আমাকে বলতে পারেন 🥰",
      "ফাহিম বস কে এতো মেনশন নাহ দিয়া একটা জি এফ দে 😒😏",
      "Mantion_না দিয়ে বস ফাহিম এর সাথে সিরিয়াস প্রেম করতে চাইলে ইনবক্স 😹",
      "বস ফাহিম কে মেনশন দিসনা 😒 পারলে একটা জি এফ দে",
      "বাল পাকনা Mantion_দিস না 😵 বস ফাহিম প্রচুর বিজি 🥵",
      "চুমু খাওয়ার বয়স টা আমার বস ফাহিম চকলেট খেয়ে উড়িয়ে দিল 🍫🤗",
      "ফাহিম বস এখন প্রেম করতে বিজি 💋🤧",
      "বস ফাহিম এখন online এ নাই 😫 gf এর সাথে future set করতেছে 😹",
      "এই যে mention দিছস 😒 আগে ৫ টা গোলাপ 🌹 পাঠা 😹",
      "ফাহিম বস এর মন ভালো নাই 💔 একটা cute gf দিলে ঠিক হইয়া যাইতো 😫",
      "এত mention না দিয়া inbox এ আসো 😏 premium reply দিবো 😹",
      "বস ফাহিম এখন sleeping mode এ আছে 😴 disturb করলে কামড় দিবে 🐸",
      "ফাহিম বস কে mention দিলে tax লাগবে 💸 আগে bkash কর 😹",
      "বস ফাহিম এখন hot mood এ আছে 🥵 সাবধানে কথা বলো 😹",
      "ফাহিম বস এর inbox এখন maintenance এ আছে 🛠️ পরে আবার try দেন 😹",
      "এত mention না দিয়া একটা iPhone gift কর 😫📱"
    ];

    // 🎲 Random Caption
    const caption = `
✿•━━━❖❖❖━━━✿
${captions[Math.floor(Math.random() * captions.length)]}
✿•━━━❖❖❖━━━✿
`;

    try {

      // 🎵 Fetch Song
      const songStream = await axios({
        url: songUrl,
        method: "GET",
        responseType: "stream",
        timeout: 10000,
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });

      // ✅ Send Voice + Caption Together
      await message.reply({
        body: caption,
        attachment: [songStream.data]
      });

    } catch (err) {

      console.log("❌ Song Error:", err.message);

      await message.reply({
        body: "😢 Voice দিতে পারলাম না"
      });

    }
  }
};