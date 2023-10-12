import {
  Button,
  Divider,
  Icon,
  Text,
  makeStyles,
  useTheme,
} from "@rneui/themed";
import { View } from "react-native";
import Info from "./Info";
import PlayList from "./PlayList";
import OptBar from "./OptBar";
import PlayAudit from "./PlayAudit";
import { useEffect, useState } from "react";
import WoYao from "../../spider/WoYao";
import { BookDetail } from "../../spider/types";

export default function PlayPage({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  const styles = useStyles();
  const { theme } = useTheme();
  const [bookDetail, setBookDetail] = useState<BookDetail>({
    name: "",
    list: [],
  });
  const [playUrl, setPlayUrl] = useState("");
  const [playName, setPlayName] = useState("");
  const [playIndex, setPlayIndex] = useState(-1);

  // const { detailPath } = route.params;
  const detailPath = "/mp3/7899.html";

  const [woyao] = useState(new WoYao());

  useEffect(() => {
    if (detailPath) {
      woyao.getBookDetail(detailPath).then((res) => {
        console.log("获取书详情：");
        setBookDetail(res);
      });
    }
  }, [detailPath]);

  function onActiveUpdate(path: string, name: string, index: number) {
    setPlayIndex(index);
    woyao.getPlayUrl(path).then((res) => {
      console.log("获取播放url: ", res);
      if (res) {
        setPlayUrl(res);
        setPlayName(name);
      }
    });
  }

  function onPlayLast() {
    if (playIndex <= 0) {
      return;
    }

    const index = playIndex - 1;
    const item = bookDetail.list[index];
    onActiveUpdate(item.path, item.name, index);
  }

  function onPlayNext() {
    if (playIndex >= bookDetail.list.length) {
      return;
    }

    const index = playIndex + 1;
    const item = bookDetail.list[index];
    onActiveUpdate(item.path, item.name, index);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Button type="clear" size="sm" onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" type="ionicon" color={theme.colors.white} />
        </Button>

        <Text numberOfLines={1} style={styles.topTitle}>
          {bookDetail.name}
        </Text>
      </View>

      <Info bookDetail={bookDetail} />
      <Divider />
      <OptBar list={bookDetail.list} />
      <Divider />

      <PlayList
        list={bookDetail.list}
        onActiveUpdate={onActiveUpdate}
        playIndex={playIndex}
      />

      <PlayAudit
        url={playUrl}
        playName={playName}
        onPlayLast={onPlayLast}
        onPlayNext={onPlayNext}
      />
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: { display: "flex", flexDirection: "column", height: "100%" },
  topBar: {
    height: 60,
    backgroundColor: theme.colors.primary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10,
  },
  topTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
    width: "60%",
  },
}));
