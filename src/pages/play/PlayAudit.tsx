import {
  makeStyles,
  Text,
  useTheme,
  Button,
  Icon,
  Slider,
} from "@rneui/themed";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { AVPlaybackStatus, Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { millisToHhMmSs } from "../../utils";

interface Prop {
  url: string;
  playName: string;
  onPlayLast(): void;
  onPlayNext(): void;
}

export default function PlayAudit({
  url,
  playName,
  onPlayLast,
  onPlayNext,
}: Prop): JSX.Element {
  const styles = useStyles();
  const { theme } = useTheme();

  const [isPlay, setIsPlay] = useState(false);
  const [soundInstance, setSoundInstance] = useState<Sound>();
  const [positionMillisStr, setPositionMillisStr] = useState("00:00");
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillisStr, setDurationMillisStr] = useState("00:00");
  const [durationMillis, setDurationMillis] = useState(0);

  async function playSound() {
    if (soundInstance) {
      if (isPlay) {
        soundInstance.pauseAsync();
      } else {
        soundInstance.playAsync();
      }
      setIsPlay((cur) => !cur);
      return;
    }
  }

  function onPlaybackStatusUpdate(status: AVPlaybackStatus) {
    if (status.isLoaded) {
      setDurationMillisStr(millisToHhMmSs(status.durationMillis || 0));
      setDurationMillis(status.durationMillis || 0);
      setPositionMillisStr(millisToHhMmSs(status.positionMillis || 0));
      setPositionMillis(status.positionMillis || 0);

      setIsPlay(status.isPlaying);
    }
  }

  async function onChangePlayPosition(val: number) {
    if (soundInstance) {
      setPositionMillis(val);
      soundInstance && (await soundInstance.setPositionAsync(val));
    }
  }

  useEffect(() => {
    return soundInstance
      ? () => {
          soundInstance.unloadAsync();
        }
      : undefined;
  }, [soundInstance]);

  useEffect(() => {
    if (url && !soundInstance) {
      initAudioInstance();
    } else if (url && soundInstance) {
      changeAudioPlayUrl();
    }
  }, [url]);

  async function initAudioInstance() {
    // "http://audio.xmcdn.com/group11/M05/57/27/wKgDa1XafiyA1uqtAMtP7BgtM7E504.m4a"
    const { sound } = await Audio.Sound.createAsync({
      uri: url,
    });
    setSoundInstance(sound);
    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

    await sound.playAsync();
    setIsPlay(true);
  }

  async function changeAudioPlayUrl() {
    if (soundInstance) {
      try {
        await soundInstance.unloadAsync(); // 卸载当前音频
        await soundInstance.loadAsync({ uri: url });
        await soundInstance.playAsync();
        setIsPlay(true);
      } catch (error) {
        console.error("播放音乐时出错:", error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text numberOfLines={1}>{playName ? `正在播放：${playName}` : ""}</Text>

      <View style={styles.sliderView}>
        <Text style={{ width: 45 }}>{positionMillisStr}</Text>
        <Slider
          value={positionMillis}
          onValueChange={(v) => onChangePlayPosition(v)}
          animationType="timing"
          maximumValue={durationMillis}
          minimumValue={0}
          style={{ flex: 1, marginLeft: 10, marginRight: 10 }}
          step={1}
          allowTouchTrack={soundInstance ? true : false}
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
        <Text style={{ width: 45 }}>{durationMillisStr}</Text>
      </View>

      <View style={styles.playBtnView}>
        <Button
          buttonStyle={styles.btnStyle}
          title="Outline"
          type="outline"
          radius={50}
          onPress={onPlayLast}
        >
          <Icon name="play-skip-back" type="ionicon" />
        </Button>
        <View style={{ marginLeft: 20, marginRight: 20 }}>
          <Button
            buttonStyle={styles.btnStyle}
            title="Outline"
            type="outline"
            radius={50}
            onPress={() => playSound()}
          >
            {!isPlay && <Icon name="play" type="ionicon" />}
            {isPlay && <Icon name="pause" type="ionicon" />}
          </Button>
        </View>
        <Button
          buttonStyle={styles.btnStyle}
          title="Outline"
          type="outline"
          radius={50}
          onPress={onPlayNext}
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
  playBtnView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  btnStyle: {
    borderColor: "white",
    borderWidth: 2,
  },
}));
