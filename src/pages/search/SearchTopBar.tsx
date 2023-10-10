import { useNavigation } from "@react-navigation/native";
import { Button, Icon, makeStyles, useTheme, Text } from "@rneui/themed";
import { View } from "react-native";
import SearchTitle from "./SearchBox";

export default function SearchTopBar(): JSX.Element {
  const styles = useStyles();
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleSearch = () => {
    console.log(111);
  };

  return (
    <View style={styles.topBar}>
      <Button type="clear" size="sm" onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" type="ionicon" color={theme.colors.white} />
      </Button>

      <SearchTitle />

      <Button type="clear" size="sm" onPress={handleSearch}>
        <Text style={{ color: "white" }}>搜索</Text>
      </Button>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  topBar: {
    height: 60,
    backgroundColor: theme.colors.primary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 10,
  },
}));
