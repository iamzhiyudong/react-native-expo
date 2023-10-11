import * as cheerio from "cheerio";

async function main() {
  const res = await fetch("https://woyaotingshu.com/mp3/19362.html");
  const html = await res.text();

  const $ = await cheerio.load(html);

  const resObj = {
    img_url: "",
    name: "",
    author: "",
    audio_author: "",
    type: "",
    date: "",
    status: "",
    list: []
  };
  const headerContent = $("#header > div.content")[0];

  resObj.img_url = $(headerContent).find('div.detail-pic img')?.attr('src')
  resObj.name = $(headerContent).find('div.detail-info h2')?.text()
  resObj.author = $($(headerContent).find('div.detail-info dl')[0])?.find('dd')?.text()?.trim()
  resObj.audio_author = $($(headerContent).find('div.detail-info dl')[1])?.find('dd')?.text()
  resObj.type = $($(headerContent).find('div.detail-info dl')[2])?.find('dd')?.text()
  resObj.date = $($(headerContent).find('div.detail-info dl')[3])?.find('dd')?.text()
  resObj.status = $($(headerContent).find('div.detail-info dl')[4])?.find('dd')?.text()

  const listLis = $("#vlink_1 > ul > li > a")
  resObj.list = Array.from(listLis).map((a) => {
    return {
      name: $(a).text(),
      path: $(a).attr("href")
    }
  })

  console.log(resObj);
}
main();
