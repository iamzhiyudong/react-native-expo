import * as cheerio from "cheerio";

async function main() {
  const res = await fetch("https://ting55.com/book/14914");
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
  const headerContent = $("#wrapper > div.content-wrap > div > div > div.bookinfo > div.book")[0];

  resObj.img_url = "https:" + $(headerContent).find('div.bimg img')?.attr('src')
  resObj.name = $(headerContent).find('div.binfo h1')?.text()
  resObj.author = $($(headerContent).find('div.binfo p')[1])?.text()?.trim()
  resObj.audio_author = $($(headerContent).find('div.binfo p')[2])?.find('span')?.text()
  resObj.type = $($(headerContent).find('div.binfo p')[0])?.text()
  resObj.date = $($(headerContent).find('div.binfo p')[4])?.text()
  resObj.status = $($(headerContent).find('div.binfo p')[3])?.text()

  const listLis = $("#wrapper > div.content-wrap > div > div > div.playlist > div > ul > li > a")
  resObj.list = Array.from(listLis).map((a) => {
    return {
      name: $(a).text(),
      path: $(a).attr("href")
    }
  })

  console.log(resObj);
}
main();
