import {
  Button,
  Divider,
  Icon,
  Text,
  makeStyles,
  useTheme,
} from "@rneui/themed";
import { View } from "react-native";
import Info from "./Info";
import PlayList from "./PlayList";
import OptBar from "./OptBar";
import PlayAudit from "./PlayAudit";

export default function PlayPage({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Button type="clear" size="sm" onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" type="ionicon" color={theme.colors.white} />
        </Button>

        <Text numberOfLines={1} style={styles.topTitle}>
          首席医官首席医官首席医官首席医官首席医官首席医官
        </Text>
      </View>

      <Info />
      <Divider />
      <OptBar />
      <Divider />

      <PlayList />

      <PlayAudit />
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: { display: "flex", flexDirection: "column", height: "100%" },
  topBar: {
    height: 60,
    backgroundColor: theme.colors.primary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10,
  },
  topTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
    width: "60%",
  },
}));
