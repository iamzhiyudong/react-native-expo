import * as cheerio from "cheerio";

async function main() {
  const res = await fetch("https://woyaotingshu.com/");
  const html = await res.text();
  // console.log(html);

  const $ = await cheerio.load(html)
  const $cateEls = $('#navbar > div.sub-nav > div.a-nav > a')
  const cateObjs = Array.from($cateEls).map((el) => {
    return {
      path: $(el).attr('href'),
      name: $(el).text()
    }
  })
  console.log(cateObjs)
}
main();
