import { makeStyles, Image, Text, useTheme, Button } from "@rneui/themed";
import {
  FlatList,
  SafeAreaView,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

const BASE_URI = "https://source.unsplash.com/random?sig=";
export default function ResultList(): JSX.Element {
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <SafeAreaView>
      <FlatList
        data={[...new Array(10)].map((_, i) => i.toString())}
        style={styles.list}
        keyExtractor={(e) => e}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8} onPress={() => console.log(111)}>
            <View style={styles.item}>
              <Image
                containerStyle={styles.itemImage}
                source={{ uri: BASE_URI + item }}
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
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
    paddingTop: 10,
  },
  item: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    marginBottom: 17,
    marginLeft: 10,
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
