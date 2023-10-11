import { Divider, Text, makeStyles, useTheme } from "@rneui/themed";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

export default function PlayList(): JSX.Element {
  const styles = useStyles();
  const { theme } = useTheme();
  const [activeId, setActiveId] = useState("");

  const data = [...new Array(100)].map((_, index) => ({
    name: `第${index + 1}集`,
  }));
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        contentContainerStyle={styles.flatList}
        numColumns={1}
        keyExtractor={(e) => e.name}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setActiveId(item.name)}
            >
              <View
                style={{
                  ...styles.listItem,
                  backgroundColor:
                    item.name === activeId
                      ? theme.colors.primary
                      : theme.colors.background,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color:
                      item.name === activeId
                        ? theme.colors.white
                        : theme.colors.grey1,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>

            <Divider />
          </>
        )}
      ></FlatList>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  flatList: {},
  listItem: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  activeItemStyle: {},
}));
