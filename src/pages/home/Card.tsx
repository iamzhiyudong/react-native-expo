import { Card, Text, useTheme, makeStyles } from "@rneui/themed";
import { ScrollView, View } from "react-native";

export default function MyCard() {
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View style={styles.containerView}>
        {[...Array(20)].map((item, index) => (
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
        ))}
      </View>
    </ScrollView>
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
  cardImage: {
    padding: 0,
    height: 120,
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
    width: "28.5%",
    margin: 9,
    borderWidth: 0,
    elevation: 0,
    backgroundColor: "",
  },
}));
