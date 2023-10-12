import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Icon,
  makeStyles,
  useTheme,
  Text,
  SearchBar,
} from "@rneui/themed";
import { View } from "react-native";
import SearchTitle from "./SearchBox";
import { useState } from "react";

interface Prop {
  onSearch(word: string): void;
}

export default function SearchTopBar({ onSearch }: Prop): JSX.Element {
  const styles = useStyles();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [searchWord, setSearchWord] = useState("");

  const handleSearch = () => {
    onSearch(searchWord)
  };

  return (
    <View style={styles.topBar}>
      <Button type="clear" size="sm" onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" type="ionicon" color={theme.colors.white} />
      </Button>

      <View style={styles.searchContainer}>
        <SearchBar
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
          round={true}
          lightTheme={true}
          placeholder="请输入"
          onChangeText={setSearchWord}
          value={searchWord}
        />
      </View>

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
  searchContainer: {
    flex: 1,
  },
  inputContainerStyle: {
    height: 37,
    backgroundColor: "white",
  },
  containerStyle: {
    backgroundColor: theme.colors.primary,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
}));
