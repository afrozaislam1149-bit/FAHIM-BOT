const delay = (ms) => new Promise(res => setTimeout(res, ms));

module.exports = {
  config: {
    name: "tagall",
    version: "1.0.0",
    author: "GPT FIXED",
    role: 0,
    category: "group"
  },

  onStart: async function ({ api, event, args }) {
    const msg = args.join(" ").trim();
    const threadID = event.threadID;

    if (!msg) {
      return api.sendMessage("⚠️ Use: /tagall your message", threadID);
    }

    try {
      const threadInfo = await api.getThreadInfo(threadID);
      const members = threadInfo.participantIDs || [];

      api.sendMessage(
        `📢 TagAll Started\n👥 Total: ${members.length}`,
        threadID
      );

      for (let i = 0; i < members.length; i++) {
        const id = members[i];

        await api.sendMessage({
          body: `${msg} 👇`,
          mentions: [
            {
              id,
              tag: "user",
              fromIndex: 0
            }
          ]
        }, threadID);

        await delay(1500); // ⏳ speed control
      }

      return api.sendMessage("✅ TagAll Complete", threadID);

    } catch (err) {
      console.log(err);
      return api.sendMessage("❌ Error occurred", threadID);
    }
  }
};