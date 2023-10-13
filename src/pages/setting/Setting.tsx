import { View } from "react-native";
import { Button } from "@rneui/themed";
import { useState } from "react";
import WebViewSp from "../../components/WebViewSp";

export default function Setting() {
  // "https://m.ting55.com/book/14914-1"
  const [webviewUrl, setWebviewUrl] = useState("");

  // function onMessage(event: any) {
  //   const html = event.nativeEvent.data;
  //   console.log("onMessage: ", html);

  //   // 定义正则表达式来匹配URL
  //   // /https:\/\/pp\.ting55\.com\/[^\s'"]+/g
  //   // const regex = mainSpider.getWebviewPlayUrlReg;
  //   const regex = /https:\/\/pp\.ting55\.com\/[^\s'"]+/g;

  //   // 匹配URL
  //   const matchedUrls = html.match(regex);

  //   if (matchedUrls) {
  //     // 提取第一个匹配到的URL
  //     const firstMatchedUrl = matchedUrls[0];
  //     console.log(firstMatchedUrl?.replace(/\\/g, ""));
  //   }
  // }

  function onHtmlLoaded(html: string) {
    console.log("webview回调---->")
    console.log(html)
    const regex = /https:\/\/pp\.ting55\.com\/[^\s'"\\]+/g;
    const matchedUrls = html.match(regex);
    if (matchedUrls) {
      const firstMatchedUrl = matchedUrls[0];
      console.log(firstMatchedUrl);
    }
  }

  return (
    <View>
      <Button
        onPress={() => {
          setWebviewUrl("https://m.ting55.com/book/14914-1");
        }}
      >
        切换url
      </Button>

      <WebViewSp webviewUrl={webviewUrl} onHtmlLoaded={onHtmlLoaded} />
    </View>
  );
}
