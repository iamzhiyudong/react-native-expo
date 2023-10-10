import React from "react";
import {
  makeStyles,
  useThemeMode,
  Button,
  useTheme,
  Icon,
  Text,
  Tab,
} from "@rneui/themed";
import { View, ScrollView } from "react-native";
import { data } from "./data";
import MyCard from "./Card";

export default function Home({ navigation }: { navigation: any }): JSX.Element {
  const { setMode, mode } = useThemeMode();
  const { theme } = useTheme();
  const styles = useStyles();

  const [index, setIndex] = React.useState(0);

  const handleOnPress = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <View style={styles.homeContainer}>
      <View style={styles.topBar}>
        <Text style={{ color: theme.colors.white, fontSize: 18 }}>
          222听书网
        </Text>
        <View style={styles.searchBtnView}>
          <Button
            type="clear"
            size="sm"
            onPress={() => navigation.navigate("SearchPage")}
          >
            <Icon name="search" type="ionicon" color={theme.colors.white} />
          </Button>
        </View>
      </View>

      <View style={styles.typeView}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <Tab
            value={index}
            onChange={(e) => setIndex(e)}
            indicatorStyle={{
              backgroundColor: theme.colors.primary,
              height: 3,
            }}
            variant="primary"
          >
            {data.map((item, index) => (
              <Tab.Item
                key={index}
                title={item.name}
                titleStyle={{ fontSize: 13, color: theme.colors.grey1 }}
                buttonStyle={{ backgroundColor: "white" }}
              />
            ))}
          </Tab>
        </ScrollView>
      </View>

      <MyCard />
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  homeContainer: {
    flex: 1,
    display: "flex",
  },
  topBar: {
    width: "100%",
    height: 60,
    backgroundColor: theme.colors.primary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 5,
    paddingLeft: 20,
  },
  searchBtnView: {
    width: 40,
  },
  typeView: {
    display: "flex",
    height: 48,
  },
  typeItem: {
    padding: 10,
  },
}));
