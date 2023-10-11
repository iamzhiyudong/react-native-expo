import { makeStyles, Image, Text, useTheme } from "@rneui/themed";
import { ActivityIndicator, View } from "react-native";

const BASE_URI = "https://source.unsplash.com/random?sig=";

export default function Info(): JSX.Element {
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <Image
        containerStyle={styles.itemImage}
        source={{ uri: BASE_URI + 1 }}
        PlaceholderContent={<ActivityIndicator />}
      />

      <View style={styles.itemRightBox}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 17,
            color: theme.colors.primary,
            fontWeight: "bold",
          }}
        >
          首席医官
        </Text>
        <Text
          numberOfLines={1}
          style={{ fontSize: 14, color: theme.colors.grey1 }}
        >
          作者：阿鹏
        </Text>
        <Text
          numberOfLines={1}
          style={{ fontSize: 14, color: theme.colors.grey1 }}
        >
          更新至1000集
        </Text>

        <Text
          numberOfLines={3}
          style={{
            fontSize: 12,
            color: theme.colors.grey3,
            height: 60,
            marginTop: 10,
          }}
        >
          你也可以使用alignItems样式设置为'flex-start'，它会使View的宽度自适应其内容的宽度。
        </Text>

        <Text style={styles.tip}>22听书网</Text>
      </View>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    height: 170,
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white",
  },
  itemImage: {
    width: 110,
    height: 150,
    borderRadius: 3,
  },
  itemRightBox: {
    paddingLeft: 10,
    paddingRight: 20,
    flex: 1,
  },
  tip: {
    alignSelf: "flex-start",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3,
    color: theme.colors.grey2,
    backgroundColor: theme.colors.disabled,
  },
}));
