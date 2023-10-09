import { makeStyles } from "@rneui/base";
import { Card, Text, useTheme } from "@rneui/themed";
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
              style={{ padding: 0, height: 120 }}
              source={{
                uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
              }}
            />
            <Text style={{ fontSize: 11, color: theme.colors.grey3 }}>
              连载至1000集
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 12,
                color: theme.colors.warning,
                overflow: "hidden",
              }}
            >
              首席医官首席医官首席医官首席医官
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 11,
                color: theme.colors.grey3,
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
  cardContainItem: {
    padding: 5,
    width: 102,
    margin: 9,
    borderWidth: 0,
    elevation: 1,
  },
}));
