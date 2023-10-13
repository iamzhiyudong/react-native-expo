import { View } from "react-native";
import WebView from "react-native-webview";

interface Prop {
  onHtmlLoaded(html: string): void;
  webviewUrl: string;
}

const INJECTED_JAVASCRIPT = `(function() {
  window.ReactNativeWebView.postMessage(JSON.stringify(document.documentElement.outerHTML));
  })();`;

export default function WebViewSp({ onHtmlLoaded, webviewUrl }: Prop) {
  function onMessage(event: any) {
    if (webviewUrl) {
      const html = event.nativeEvent.data;
      onHtmlLoaded(html);
    }
  }

  return (
    <View style={{ height: 0 }}>
      <WebView
        source={{ uri: webviewUrl }}
        onMessage={onMessage}
        injectedJavaScript={INJECTED_JAVASCRIPT}
      />
    </View>
  );
}
