import {
  makeStyles,
  Text,
  useTheme,
  Button,
  Icon,
  Slider,
} from "@rneui/themed";
import { useState } from "react";
import { View } from "react-native";

export default function PlayAudit(): JSX.Element {
  const styles = useStyles();
  const { theme } = useTheme();

  const [value, setValue] = useState(0);

  return (
    <View style={styles.container}>
      <Text numberOfLines={1}>正在播放：第七集</Text>

      <View style={styles.sliderView}>
        <Text>00:00</Text>
        <Slider
          value={value}
          onValueChange={setValue}
          animationType="timing"
          maximumValue={100}
          minimumValue={0}
          style={{ flex: 1, marginLeft: 10, marginRight: 10 }}
          step={1}
          allowTouchTrack
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.grey5}
          trackStyle={{ height: 4, backgroundColor: "transparent" }}
          thumbStyle={{ height: 16, width: 8, backgroundColor: "transparent" }}
          thumbProps={{
            children: (
              <Icon
                name="circle"
                type="font-awesome"
                size={6}
                reverse
                color={theme.colors.primary}
                containerStyle={{ bottom: 8, right: 8 }}
              />
            ),
          }}
        />
        <Text>23:00:00</Text>
      </View>

      <View style={styles.playBtnBox}>
        <Button
          buttonStyle={styles.btnStyle}
          title="Outline"
          type="outline"
          radius={50}
        >
          <Icon name="play-skip-back" type="ionicon" />
        </Button>
        <View style={{ marginLeft: 20, marginRight: 20 }}>
          <Button
            buttonStyle={styles.btnStyle}
            title="Outline"
            type="outline"
            radius={50}
          >
            <Icon name="play" type="ionicon" />
            {/* <Icon name="pause" type="ionicon" /> */}
          </Button>
        </View>
        <Button
          buttonStyle={styles.btnStyle}
          title="Outline"
          type="outline"
          radius={50}
        >
          <Icon name="play-skip-forward" type="ionicon" />
        </Button>
      </View>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: theme.colors.grey4,
  },
  sliderView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  playBtnBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  btnStyle: {
    borderColor: "white",
    borderWidth: 2,
  },
}));
