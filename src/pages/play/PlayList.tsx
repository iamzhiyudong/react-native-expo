import { Divider, Text, makeStyles, useTheme } from "@rneui/themed";
import { FlatList, TouchableOpacity, View } from "react-native";
import { BookDetail } from "../../spider/types";

interface Prop {
  list: BookDetail["list"];
  onActiveUpdate(path: string, playName: string, playIndex: number): void;
  playIndex: number;
}

export default function PlayList({
  list,
  onActiveUpdate,
  playIndex,
}: Prop): JSX.Element {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={list}
        contentContainerStyle={styles.flatList}
        numColumns={1}
        keyExtractor={(e) => e.name}
        renderItem={({ item, index }) => (
          <>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                onActiveUpdate(list[index]?.path || "", item.name, index);
              }}
            >
              <View
                style={{
                  ...styles.listItem,
                  backgroundColor:
                    index === playIndex
                      ? theme.colors.primary
                      : theme.colors.background,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color:
                      index === playIndex
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
