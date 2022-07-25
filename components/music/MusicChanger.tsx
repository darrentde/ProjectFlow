import { Box, SimpleGrid } from "@chakra-ui/layout";
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import {
  MdVolumeOff,
  MdVolumeUp,
  MdPlayArrow,
  MdPlayDisabled,
} from "react-icons/md";
import styles from "../../styles/MusicChanger.module.css";

const MusicChanger = () => {
  const audioPlayer = useRef(null);
  const volumeBar = useRef(null);
  const animationRef = useRef(null); // reference the animation

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(true);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    const vol = audioPlayer.current.volume;
    setVolume(vol);
    volumeBar.current.max = vol;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      // animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      // cancelAnimationFrame(animationRef.current);
    }
  };

  const toggleMute = () => {
    const prevValue = isMute;
    setIsMute(!prevValue);
    if (!prevValue) {
      audioPlayer.current.muted = true;
    } else {
      audioPlayer.current.muted = false;
    }
  };

  // const whilePlaying = () => {
  //   volumeBar.current.value = audioPlayer.current.volume;
  //   changePlayerCurrentTime();
  //   animationRef.current = requestAnimationFrame(whilePlaying);
  // };

  const changeRange = () => {
    audioPlayer.current.volume = volumeBar.current.value;
    // changePlayerCurrentTime();
  };

  // const changePlayerCurrentTime = () => {
  //   volumeBar.current.volume = setVolume(volumeBar.current.value);
  // };

  // const changeVolume = (e) => {
  //   audioPlayer.current.volume = e.target.value;
  // };

  const audio =
    "https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3";

  return (
    <Box
      position="absolute"
      top="200px"
      left="320px"
      ml="2"
      mt="20"
      w="300px"
      h="180"
      bg="white"
    >
      <Text>Music Player</Text>
      <div className={styles.audioPlayer}>
        <audio ref={audioPlayer} controls muted loop preload="metadata">
          <source src={audio} />
          Your browser does not support the audio element.
        </audio>
      </div>

      <IconButton
        icon={isPlaying ? <MdPlayArrow /> : <MdPlayDisabled />}
        aria-label={"Play"}
        onClick={togglePlayPause}
      />
      <IconButton
        icon={isMute ? <MdVolumeOff /> : <MdVolumeUp />}
        aria-label={"Mute"}
        onClick={toggleMute}
      />
      <Slider
        ref={volumeBar}
        aria-label="slider-ex-1"
        defaultValue={0}
        min={0}
        max={1}
        step={0.05}
        onChange={changeRange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
};

export default MusicChanger;
