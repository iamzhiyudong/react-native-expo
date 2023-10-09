import { makeStyles } from "@rneui/themed";
import { View, Text } from "react-native";

export default function BottomBar(): JSX.Element {
  const styles = useStyles();
  return (
    <View style={styles.bar}>
      <Text>bar</Text>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  bar: {
    backgroundColor: theme.colors.white,
    width: '100%',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: theme.colors.grey5
  },
}));
