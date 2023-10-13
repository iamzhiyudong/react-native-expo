import { Dialog, makeStyles } from "@rneui/themed";
import React, { useState } from "react";
import { View } from "react-native";
import SearchTopBar from "./SearchTopBar";
import SearchMain from "./SearchMain";
import MainSpider from "../../spider/Index";
import { BookItem } from "../../spider/types";

export default function SearchPage(): JSX.Element {
  const styles = useStyles();
  const [mainSpider] = useState(new MainSpider());
  const [bookList, setBookList] = useState<BookItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function onSearch(word: string) {
    setIsLoading(true);
    console.log("正在搜索---> ", word);
    mainSpider
      .search(word)
      .then((res) => {
        console.log("搜索成功：", res.length);
        setBookList(res);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <View style={styles.container}>
      <SearchTopBar onSearch={onSearch} />
      <SearchMain bookList={bookList} />

      <Dialog isVisible={isLoading}>
        <Dialog.Loading />
      </Dialog>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
}));
