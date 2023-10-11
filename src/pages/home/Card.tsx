import { useNavigation } from "@react-navigation/native";
import { Card, Text, makeStyles, useTheme } from "@rneui/themed";
import { FlatList, TouchableOpacity, View } from "react-native";

export default function MyCard() {
  const styles = useStyles();
  const { theme } = useTheme();
  const data = [...Array(30)].map((_, index) => ({
    img: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
    name: "首席医官首席医官首席医官首席医官" + index,
    info: "连载至1000集",
    desc: "首席医官首席医官首席医官首席医官",
  }));
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        contentContainerStyle={styles.flatList}
        numColumns={3}
        keyExtractor={(e) => e.name}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{ width: "33%" }}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("PlayPage")}
          >
            <Card key={index} containerStyle={styles.cardContainItem}>
              <Card.Image
                style={styles.cardImage}
                source={{
                  uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
                }}
              >
                <View style={styles.imageTextView}>
                  <Text
                    numberOfLines={1}
                    style={{ fontSize: 11, color: theme.colors.white }}
                  >
                    连载至1000集
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
                首席医官首席医官首席医官首席医官
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 12,
                  color: theme.colors.grey2,
                  overflow: "hidden",
                }}
              >
                首席医官首席医官首席医官首席医官
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
