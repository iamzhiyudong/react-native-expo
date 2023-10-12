import * as cheerio from "cheerio";

async function main() {
  const res = await fetch("https://woyaotingshu.com/play/7899-0-0.html");
  const html = await res.text();

  const $ = await cheerio.load(html);

  const iframeUrl = $("iframe").attr("src");

  const iframeRes = await fetch("https://woyaotingshu.com" + iframeUrl);
  const iframeHtml = await iframeRes.text();
  // const $1 = await cheerio.load(iframeHtml);

  const mp3Link = /http[s]?:\/\/[^\s]+?\.m4a/g.exec(iframeHtml)
  console.log(mp3Link[0]);
}
main();
