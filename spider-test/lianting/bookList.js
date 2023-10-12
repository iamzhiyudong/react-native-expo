import * as cheerio from "cheerio";

async function main() {
  const res = await fetch("https://ting55.com/category/1");
  const html = await res.text();

  const $ = await cheerio.load(html);
  const $itemEls = $("#wrapper > div.content-wrap > div > div > div > ul > li");
  const itemObjs = Array.from($itemEls).map((el) => {
    return {
      path: $(el).find("div.img > a").attr("href"),
      name: $(el).find("div.img > a").attr("title"),
      img: "https:" + $(el).find("div.img > a > img").attr("src"),
      author: $($(el).find("div.info p")[1]).text(),
      audio_author: $($(el).find("div.info p")[2]).text(),
      state: $($(el).find("div.info p")[3]).text(),
      type: $($(el).find("div.info p")[0]).text(),
    };
  });
  console.log(itemObjs);
}
main();
