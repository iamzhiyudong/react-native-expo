import { makeStyles } from "@rneui/themed";
import React, { useState } from "react";
import { View } from "react-native";
import SearchTopBar from "./SearchTopBar";
import SearchMain from "./SearchMain";
import WoYao from "../../spider/WoYao";
import { BookItem } from "../../spider/types";

export default function SearchPage(): JSX.Element {
  const styles = useStyles();
  const [woyao] = useState(new WoYao())
  const [bookList, setBookList] = useState<BookItem[]>([])

  function onSearch(word: string) {
    console.log("搜索词：", word);
    woyao.search(word).then((res) => {
      console.log("搜索成功：", res.length)
      setBookList(res)
    })
  }

  return (
    <View style={styles.container}>
      <SearchTopBar onSearch={onSearch} />
      <SearchMain bookList={bookList} />
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
}));
