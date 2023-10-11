abstract class AbstractSpider {
  constructor() {
    
  }

  abstract getCategoryList(): { name: string; path: string }[];

  abstract getCategoryDetailList(): {
    path: string;
    name: string;
    imgUrl: string;
    author: string;
    audioAuthor: string;
    state: string;
    type: string;
  }[];
}
export default AbstractSpider;
