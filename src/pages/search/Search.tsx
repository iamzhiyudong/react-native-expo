import { makeStyles } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import SearchTopBar from "./SearchTopBar";
import SearchMain from "./SearchMain";

export default function SearchPage(): JSX.Element {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <SearchTopBar />
      <SearchMain />
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
}));
