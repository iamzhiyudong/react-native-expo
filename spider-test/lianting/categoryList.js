import * as cheerio from "cheerio";

async function main() {
  const res = await fetch("https://ting55.com");
  const html = await res.text();

  const $ = await cheerio.load(html)
  const $cateEls = $('#wrapper > header > nav > a')
  const cateObjs = Array.from($cateEls).map((el) => {
    return {
      path: $(el).attr('href'),
      name: $(el).text()
    }
  })
  cateObjs.shift()
  cateObjs.shift()
  console.log(cateObjs)
}
main();
