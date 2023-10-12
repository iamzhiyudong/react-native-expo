import { BookDetail, BookItem, CategoryItem } from "./types";

class Spider {
  async getCategoryList(): Promise<CategoryItem[]> {
    return [];
  }

  async getCategoryBookList(path: string): Promise<BookItem[]> {
    return [];
  }

  async search(word: string): Promise<BookItem[]> {
    return [];
  }

  async getBookDetail(path: string): Promise<BookDetail> {
    return {
      name: "",
      list: [],
    };
  }

  async getPlayUrl(path: string): Promise<string> {
    return "";
  }
}
export default Spider;
