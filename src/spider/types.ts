export interface CategoryItem {
  name: string;
  path: string;
}

export interface BookItem {
  path: string;
  name: string;
  imgUrl?: string;
  author?: string;
  audioAuthor?: string;
  state?: string;
  type?: string;
}

export interface BookDetail {
  img_url?: string;
  name: string;
  author?: string;
  audio_author?: string;
  type?: string;
  date?: string;
  status?: string;
  list: { name: string; path: string }[];
}
