import { useNavigation } from "@react-navigation/native";
import { makeStyles, Image, Text, useTheme, Button } from "@rneui/themed";
import {
  FlatList,
  SafeAreaView,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { BookItem } from "../../spider/types";

interface Prop {
  bookList: BookItem[];
}

// const BASE_URI = "https://source.unsplash.com/random?sig=";
export default function ResultList({ bookList }: Prop): JSX.Element {
  const styles = useStyles();
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView>
      <FlatList
        data={bookList}
        style={styles.list}
        keyExtractor={(e) => e.path}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("PlayPage", { detailPath: item.path });
            }}
          >
            <View style={styles.item}>
              <Image
                containerStyle={styles.itemImage}
                source={{ uri: item.imgUrl }}
                PlaceholderContent={
                  <ActivityIndicator
                    style={{ width: "100%", height: "100%" }}
                  />
                }
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
                  {item.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 14, color: theme.colors.grey1 }}
                >
                  {item.author}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 14, color: theme.colors.grey1 }}
                >
                  {item.state}
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
                  {item.audioAuthor}
                </Text>

                <Text numberOfLines={1} style={styles.tip}>{item.type}</Text>
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
    backgroundColor: theme.colors.grey5
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
