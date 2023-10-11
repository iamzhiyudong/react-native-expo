import { Text, makeStyles } from "@rneui/themed";
import { View } from "react-native";

export default function OptBar(): JSX.Element {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 17, fontWeight: "bold" }}>目录·共1000集</Text>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    height: 50,
    backgroundColor: theme.colors.white,
    display: "flex",
    justifyContent: "center",
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey5,
  },
}));
