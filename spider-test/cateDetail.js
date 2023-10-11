import * as cheerio from "cheerio";

async function main() {
  const res = await fetch("https://woyaotingshu.com/book/5.html");
  const html = await res.text();

  const $ = await cheerio.load(html);
  const $itemEls = $("#header > div.content > div.list-r > div.hotbox");
  const itemObjs = Array.from($itemEls).map((el) => {
    return {
      path: $(el).find(".tab-img > a").attr("href"),
      name: $(el).find(".tab-img > a").attr("title"),
      img: $(el).find(".tab-img > a > img").attr("src"),
      author: $($(el).find("dd")[1]).text(),
      state: $($(el).find("dd")[3]).text(),
      type: $($(el).find("dd")[0]).text(),
    };
  });
  console.log(itemObjs);
}
main();
