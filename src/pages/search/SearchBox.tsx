import { SearchBar, Text, makeStyles } from "@rneui/themed";
import { useState } from "react";
import { View } from "react-native";

export default function SearchTitle(): JSX.Element {
  const styles = useStyles();
  const [search, setSearch] = useState("");

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <View style={styles.searchContainer}>
      <SearchBar
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={styles.containerStyle}
        round={true}
        lightTheme={true}
        placeholder="请输入"
        onChangeText={updateSearch}
        value={search}
      />
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
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
