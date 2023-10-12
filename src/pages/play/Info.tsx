import { makeStyles, Image, Text, useTheme } from "@rneui/themed";
import { ActivityIndicator, View } from "react-native";
import { BookDetail } from "../../spider/types";

interface Prop {
  bookDetail: BookDetail;
}

export default function Info({ bookDetail }: Prop): JSX.Element {
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      {bookDetail.img_url ? (
        <Image
          containerStyle={styles.itemImage}
          source={{ uri: bookDetail.img_url }}
          PlaceholderContent={
            <ActivityIndicator style={{ width: "100%", height: "100%" }} />
          }
        />
      ) : (
        <View style={styles.noImageView} />
      )}

      <View style={styles.itemRightBox}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 17,
            color: theme.colors.primary,
            fontWeight: "bold",
          }}
        >
          {bookDetail.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{ fontSize: 14, color: theme.colors.grey1 }}
        >
          {bookDetail.author}
        </Text>
        <Text
          numberOfLines={1}
          style={{ fontSize: 14, color: theme.colors.grey1 }}
        >
          {bookDetail.status}
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
          {bookDetail.audio_author}
        </Text>

        {bookDetail.type ? (
          <Text numberOfLines={1} style={styles.tip}>
            {bookDetail.type}
          </Text>
        ) : (
          ""
        )}
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
  noImageView: {
    width: 110,
    height: 150,
    borderRadius: 3,
    overflow: "hidden",
    backgroundColor: theme.colors.grey5,
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
