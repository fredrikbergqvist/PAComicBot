export async function getRssFile() {
  const rp = require('request-promise');
  const { XMLParser} = require("fast-xml-parser");
  const buffer = await rp("http://penny-arcade.com/feed", {
    responseType: "buffer",
    resolveBodyOnly: true,
    timeout: 5000,
    retry: 5,
  });
  const parser = new XMLParser();
  const feed = parser.parse(buffer.toString());
  let latestComic = null;
  for (const item of feed.rss.channel.item) {
    if(item.title.startsWith("Comic:")){
      latestComic = item;
      break;
    }
  }
  return latestComic
}
