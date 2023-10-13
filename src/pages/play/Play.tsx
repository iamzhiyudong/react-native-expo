import {
  Button,
  Dialog,
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
import MainSpider from "../../spider/Index";
import { BookDetail } from "../../spider/types";
import WebViewSp from "../../components/WebViewSp";

export default function PlayPage({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}): JSX.Element {
  const styles = useStyles();
  const { theme } = useTheme();
  const [bookDetail, setBookDetail] = useState<BookDetail>({
    name: "",
    list: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [playUrl, setPlayUrl] = useState("");
  const [playName, setPlayName] = useState("");
  const [playIndex, setPlayIndex] = useState(-1);
  const [webviewUrl, setWebviewUrl] = useState("");
  const [isShowWebview, setIsShowWebview] = useState(false);
  const { detailPath } = route.params;

  const [mainSpider] = useState(new MainSpider());

  useEffect(() => {
    if (detailPath) {
      setIsLoading(true);
      console.log("获取书详情--->");
      mainSpider
        .getBookDetail(detailPath)
        .then((res) => {
          console.log("获取书详情成功：");
          setBookDetail(res);

          setTimeout(() => {
            setIsShowWebview(true);
          }, 1500);
        })
        .finally(() => setIsLoading(false));
    }
  }, [detailPath]);

  function onActiveUpdate(path: string, name: string, index: number) {
    setPlayIndex(index);
    setIsLoading(true);
    console.log("获取播放url--->");
    mainSpider
      .getPlayUrl(path)
      .then((res) => {
        console.log("获取播放url: ", res);
        if (res && res !== "webview") {
          setPlayUrl(res);
          setPlayName(name);
        } else {
          mainSpider.getWebviewUrl(path).then((res) => {
            console.log("webviewUrl: ", res);
            setWebviewUrl(res);
            setPlayName(name);
          });
        }
      })
      .finally(() => setIsLoading(false));
  }

  function onHtmlLoaded(html: string) {
    console.log("webview回调---->");
    console.log(html);
    // const regex = /https:\/\/pp\.ting55\.com\/[^\s'"\\]+/g;
    const regex = mainSpider.getWebviewPlayUrlReg();
    const matchedUrls = html.match(regex);
    if (matchedUrls) {
      const firstMatchedUrl = matchedUrls[0];
      setPlayUrl(firstMatchedUrl);
      console.log(firstMatchedUrl);
    } else {
      setPlayName("--未获取到播放地址--");
    }
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

      <Dialog isVisible={isLoading}>
        <Dialog.Loading />
      </Dialog>

      {isShowWebview && (
        <WebViewSp webviewUrl={webviewUrl} onHtmlLoaded={onHtmlLoaded} />
      )}
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
