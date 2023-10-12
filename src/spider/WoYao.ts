import * as cheerio from "cheerio";
import Spider from "./Spider";
import { BookDetail, BookItem, CategoryItem } from "./types";

class WoYao extends Spider {
  BASE_URL = "https://woyaotingshu.com";
  constructor() {
    super();
  }

  async getCategoryList(): Promise<CategoryItem[]> {
    const res = await fetch(this.BASE_URL);
    const html = await res.text();

    const $ = await cheerio.load(html);
    const $cateEls = $("#navbar > div.sub-nav > div.a-nav > a");
    const cateObjs = Array.from($cateEls).map((el) => {
      return {
        path: $(el).attr("href") || "",
        name: $(el).text(),
      };
    });

    return cateObjs;
  }

  async getCategoryBookList(path: string): Promise<BookItem[]> {
    const res = await fetch(this.BASE_URL + path);
    const html = await res.text();

    const $ = await cheerio.load(html);
    const $itemEls = $("#header > div.content > div.list-r > div.hotbox");
    const itemObjs = Array.from($itemEls).map((el) => {
      return {
        path: $(el).find(".tab-img > a").attr("href") || "",
        name: $(el).find(".tab-img > a").attr("title") || "",
        img: $(el).find(".tab-img > a > img").attr("src"),
        author: $($(el).find("dd")[1]).text(),
        audio_author: $($(el).find("dd")[2]).text(),
        state: $($(el).find("dd")[3]).text(),
        type: $($(el).find("dd")[0]).text(),
      };
    });

    return itemObjs;
  }

  async getBookDetail(path: string): Promise<BookDetail> {
    const res = await fetch(this.BASE_URL + path);
    const html = await res.text();

    const $ = await cheerio.load(html);

    const resObj: BookDetail = {
      img_url: "",
      name: "",
      author: "",
      audio_author: "",
      type: "",
      date: "",
      status: "",
      list: [],
    };
    const headerContent = $("#header > div.content")[0];

    resObj.img_url =
      $(headerContent).find("div.detail-pic img")?.attr("src") || "";
    resObj.name = $(headerContent).find("div.detail-info h2")?.text();
    resObj.author = $($(headerContent).find("div.detail-info dl")[0])
      ?.find("dd")
      ?.text()
      ?.trim();
    resObj.audio_author = $($(headerContent).find("div.detail-info dl")[1])
      ?.find("dd")
      ?.text();
    resObj.type = $($(headerContent).find("div.detail-info dl")[2])
      ?.find("dd")
      ?.text();
    resObj.date = $($(headerContent).find("div.detail-info dl")[3])
      ?.find("dd")
      ?.text();
    resObj.status = $($(headerContent).find("div.detail-info dl")[4])
      ?.find("dd")
      ?.text();

    const listLis = $("#vlink_1 > ul > li > a");
    resObj.list = Array.from(listLis).map((a) => {
      return {
        name: $(a).text() || "",
        path: $(a).attr("href") || "",
      };
    });

    return resObj;
  }

  async getPlayUrl(path: string): Promise<string> {
    const res = await fetch(this.BASE_URL + path);
    const html = await res.text();

    const $ = await cheerio.load(html);

    const iframeUrl = $("iframe").attr("src");

    const iframeRes = await fetch(this.BASE_URL + iframeUrl);
    const iframeHtml = await iframeRes.text();

    const mp3Link = /http[s]?:\/\/[^\s]+?\.m4a/g.exec(iframeHtml);
    return mp3Link ? mp3Link[0] : "";
  }

  async search(word: string): Promise<BookItem[]> {
    const res = await fetch(this.BASE_URL + "/search.php?searchword=" + word);
    const html = await res.text();

    const $ = await cheerio.load(html);
    const $itemEls = $("#header > div.content > div.list-r > div.hotbox");
    const itemObjs = Array.from($itemEls).map((el) => {
      return {
        path: $(el).find(".tab-img > a").attr("href") || "",
        name: $(el).find(".tab-img > a").attr("title") || "",
        img: $(el).find(".tab-img > a > img").attr("src"),
        author: $($(el).find("dd")[1]).text(),
        audio_author: $($(el).find("dd")[2]).text(),
        state: $($(el).find("dd")[3]).text(),
        type: $($(el).find("dd")[0]).text(),
      };
    });
    return itemObjs;
  }
}
export default WoYao;
