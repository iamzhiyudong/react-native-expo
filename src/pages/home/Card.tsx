import { useNavigation } from "@react-navigation/native";
import { Card, Text, makeStyles, useTheme } from "@rneui/themed";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { BookItem } from "../../spider/types";

interface Prop {
  bookList: BookItem[];
}
export default function MyCard({ bookList }: Prop) {
  const styles = useStyles();
  const { theme } = useTheme();

  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={bookList}
        contentContainerStyle={styles.flatList}
        numColumns={3}
        keyExtractor={(e) => e.name}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{ width: "33%" }}
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate("PlayPage", { detailPath: item.path });
            }}
          >
            <Card key={index} containerStyle={styles.cardContainItem}>
              <Card.Image
                style={styles.cardImage}
                source={{
                  uri: item.imgUrl,
                }}
                PlaceholderContent={
                  <ActivityIndicator
                    style={{ width: "100%", height: "100%" }}
                  />
                }
              >
                <View style={styles.imageTextView}>
                  <Text
                    numberOfLines={1}
                    style={{ fontSize: 11, color: theme.colors.white }}
                  >
                    {item.state}
                  </Text>
                </View>
              </Card.Image>

              <Text
                numberOfLines={1}
                style={{
                  fontSize: 13,
                  color: theme.colors.primary,
                  overflow: "hidden",
                }}
              >
                {item.name}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 12,
                  color: theme.colors.grey2,
                  overflow: "hidden",
                }}
              >
                {item.author}
              </Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  containerView: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 15,
  },
  flatList: { paddingBottom: 10, width: "100%" },
  cardImage: {
    padding: 0,
    height: 130,
    borderRadius: 4,
    display: "flex",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  imageTextView: {
    backgroundColor: "#aaaaaa88",
    paddingLeft: 3,
    paddingBottom: 2,
    paddingTop: 2,
  },
  cardContainItem: {
    padding: 0,
    margin: 9,
    borderWidth: 0,
    elevation: 0,
    backgroundColor: "",
  },
}));
