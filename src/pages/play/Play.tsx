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
import { useEffect, useRef, useState } from "react";
import MainSpider from "../../spider/Index";
import { BookDetail } from "../../spider/types";
import WebView from "react-native-webview";

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

  const [isShowWebView, setIsShowWebView] = useState(false);
  // "https://m.ting55.com/book/14914-1"
  const [webviewUrl, setWebviewUrl] = useState("");
  const webViewRef = useRef<WebView>(null);

  const { detailPath } = route.params;
  // const detailPath = "/mp3/7899.html";

  const [mainSpider] = useState(new MainSpider());

  useEffect(() => {
    if (detailPath) {
      setIsLoading(true);
      mainSpider
        .getBookDetail(detailPath)
        .then((res) => {
          console.log("获取书详情：");
          setBookDetail(res);
        })
        .finally(() => setIsLoading(false));
    }
  }, [detailPath]);

  const handleReload = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  function onActiveUpdate(path: string, name: string, index: number) {
    setPlayIndex(index);
    setIsLoading(true);
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

  useEffect(() => {
    setIsShowWebView(true);
  }, [webviewUrl]);

  // useEffect(() => {
  //   return () => {
  //     // Stop loading and clear the WebView when component is unmounted
  //     if (webViewRef.current) {
  //       webViewRef.current.stopLoading();
  //       webViewRef.current.injectJavaScript("window.stop();"); // Stop any running JavaScript
  //     }
  //   };
  // }, []);

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

  const INJECTED_JAVASCRIPT = `(function() {
      window.ReactNativeWebView.postMessage(JSON.stringify(document.documentElement.outerHTML));
  })();`;

  function onMessage(event: any) {
    console.log("onMessage");
    const html = event.nativeEvent.data;

    // 定义正则表达式来匹配URL
    // /https:\/\/pp\.ting55\.com\/[^\s'"]+/g
    // const regex = mainSpider.getWebviewPlayUrlReg;
    const regex = /http[s]?:\/\/[^\s]+?\.m4a/g;

    // 匹配URL
    const matchedUrls = html.match(regex);

    if (matchedUrls) {
      // 提取第一个匹配到的URL
      const firstMatchedUrl = matchedUrls[0];
      console.log(firstMatchedUrl?.replace(/\\/g, ""));
      setPlayUrl(firstMatchedUrl?.replace(/\\/g, "") || "");
      setIsShowWebView(false);
    }
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

      {isShowWebView ? (
        <View style={{ height: 0 }}>
          <WebView
            ref={webViewRef}
            source={{ uri: webviewUrl }}
            onMessage={onMessage}
            injectedJavaScript={INJECTED_JAVASCRIPT}
          />
        </View>
      ) : null}
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
