import * as cheerio from "cheerio";
import Spider from "./Spider";
import { BookDetail, BookItem, CategoryItem } from "./types";

class LianTing extends Spider {
  BASE_URL = "https://ting55.com";
  UserAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36";
  constructor() {
    super();
  }

  async getCategoryList(): Promise<CategoryItem[]> {
    const res = await fetch(this.BASE_URL, {
      headers: {
        "User-Agent": this.UserAgent,
      },
    });
    const html = await res.text();

    const $ = await cheerio.load(html);
    const $cateEls = $("#wrapper > header > nav > a");
    const cateObjs = Array.from($cateEls).map((el) => {
      return {
        path: $(el).attr("href") || "",
        name: $(el).text() || "",
      };
    });
    cateObjs.shift();
    cateObjs.shift();

    return cateObjs;
  }

  async getCategoryBookList(path: string): Promise<BookItem[]> {
    const res = await fetch(this.BASE_URL + path, {
      headers: {
        "User-Agent": this.UserAgent,
      },
    });
    const html = await res.text();

    const $ = await cheerio.load(html);
    const $itemEls = $(
      "#wrapper > div.content-wrap > div > div > div > ul > li"
    );
    const itemObjs = Array.from($itemEls).map((el) => {
      return {
        path: $(el).find("div.img > a").attr("href") || "",
        name: $(el).find("div.img > a").attr("title") || "",
        imgUrl: "https:" + $(el).find("div.img > a > img").attr("src"),
        author: $($(el).find("div.info p")[1]).text(),
        audio_author: $($(el).find("div.info p")[2]).text(),
        state: $($(el).find("div.info p")[3]).text(),
        type: $($(el).find("div.info p")[0]).text(),
      };
    });

    return itemObjs;
  }

  async getBookDetail(path: string): Promise<BookDetail> {
    const res = await fetch(this.BASE_URL + path, {
      headers: {
        "User-Agent": this.UserAgent,
      },
    });
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
    const headerContent = $(
      "#wrapper > div.content-wrap > div > div > div.bookinfo > div.book"
    )[0];

    resObj.img_url =
      "https:" + $(headerContent).find("div.bimg img")?.attr("src");
    resObj.name = $(headerContent).find("div.binfo h1")?.text() || "";
    resObj.author = $($(headerContent).find("div.binfo p")[1])?.text()?.trim();
    resObj.audio_author = $($(headerContent).find("div.binfo p")[2])
      ?.find("span")
      ?.text();
    resObj.type = $($(headerContent).find("div.binfo p")[0])?.text();
    resObj.date = $($(headerContent).find("div.binfo p")[4])?.text();
    resObj.status = $($(headerContent).find("div.binfo p")[3])?.text();

    const listLis = $(
      "#wrapper > div.content-wrap > div > div > div.playlist > div > ul > li > a"
    );
    resObj.list = Array.from(listLis).map((a) => {
      return {
        name: $(a).text() || "",
        path: $(a).attr("href") || "",
      };
    });

    return resObj;
  }

  async getPlayUrl(path: string): Promise<string> {
    return "webview";
  }

  async getWebviewUrl(path: string): Promise<string> {
    return "https://m.ting55.com" + path;
  }

  getWebviewPlayUrlReg(): RegExp {
    return new RegExp(/https:\/\/pp\.ting55\.com\/[^\s'"\\]+/g);
  }

  async search(word: string): Promise<BookItem[]> {
    const res = await fetch(this.BASE_URL + "/search/" + word, {
      headers: {
        "User-Agent": this.UserAgent,
      },
    });
    const html = await res.text();

    const $ = await cheerio.load(html);
    const $itemEls = $(
      "#wrapper > div.content-wrap > div > div > div > ul > li"
    );
    const itemObjs = Array.from($itemEls).map((el) => {
      return {
        path: $(el).find("div.img > a").attr("href") || "",
        name: $(el).find("div.img > a").attr("title") || "",
        imgUrl: "https:" + $(el).find("div.img > a > img").attr("src"),
        author: $($(el).find("div.info p")[1]).text(),
        audio_author: $($(el).find("div.info p")[2]).text(),
        state: $($(el).find("div.info p")[3]).text(),
        type: $($(el).find("div.info p")[0]).text(),
      };
    });
    return itemObjs;
  }
}
export default LianTing;
