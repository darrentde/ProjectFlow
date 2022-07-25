import { Box, Flex, SimpleGrid } from "@chakra-ui/layout";
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
import { setSessionID } from "../../redux/SessionSlice";
import styles from "../../styles/MusicChanger.module.css";

const MusicChanger = () => {
  const audioPlayer = useRef(null);
  const volumeBar = useRef(null);
  const animationRef = useRef(null); // reference the animation

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(true);
  const [volume, setVolume] = useState(0);

  const defaultTrack =
    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3";
  const [track, setTrack] = useState(defaultTrack);

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

  const changeTrack = (number) => {
    const audio2 =
      "https://cdn.pixabay.com/download/audio/2022/05/05/audio_1395e7800f.mp3?filename=forest-lullaby-110624.mp3";
    const audio3 =
      "https://cdn.pixabay.com/download/audio/2022/07/14/audio_b2e1adaa25.mp3?filename=leonell-cassio-chapter-two-ft-carrie-114909.mp3";
    const audio4 =
      "https://cdn.pixabay.com/download/audio/2022/05/28/audio_b79a40aa49.mp3?filename=peaceful-garden-healing-light-piano-for-meditation-zen-landscapes-112199.mp3";

    if (number === 1) {
      //Lofi study
      setTrack(defaultTrack);
    }
    if (number === 2) {
      //Lofi study
      setTrack(audio2);
    }
    if (number === 3) {
      //Lofi study
      setTrack(audio3);
    }
    if (number === 4) {
      //Lofi study
      setTrack(audio4);
    }

    // setTrack(1);
    audioPlayer.current.load();
    setIsPlaying(false);
    setIsMute(true);
  };

  return (
    <Box
      position="absolute"
      top="400px"
      left="320px"
      ml="2"
      mt="20"
      w="300px"
      bg="white"
      rounded="lg"
    >
      <Text textAlign="center" className="Header" cursor="pointer">
        {" "}
        Audio Changer{" "}
      </Text>
      <div className={styles.audioPlayer}>
        <audio ref={audioPlayer} muted loop preload="metadata">
          <source src={track} />
          Your browser does not support the audio element.
        </audio>
      </div>
      <Flex>
        <IconButton
          bgColor="brand.400"
          textColor="white"
          _hover={{ bg: "brand.300" }}
          margin="1"
          icon={isPlaying ? <MdPlayArrow /> : <MdPlayDisabled />}
          aria-label={"Play"}
          onClick={togglePlayPause}
        />
        <IconButton
          bgColor="brand.400"
          textColor="white"
          _hover={{ bg: "brand.300" }}
          margin="1"
          icon={isMute ? <MdVolumeOff /> : <MdVolumeUp />}
          aria-label={"Mute"}
          onClick={toggleMute}
        />
        <Slider
          margin="2"
          ref={volumeBar}
          aria-label="slider-ex-1"
          defaultValue={0}
          min={0}
          max={1}
          step={0.05}
          onChange={changeRange}
        >
          <SliderTrack>
            <SliderFilledTrack bg="brand.300" />
          </SliderTrack>
          <SliderThumb bg="brand.400" />
        </Slider>
      </Flex>

      <SimpleGrid m="2" columns={2} spacingX="10px" spacingY="10px">
        <Button
          bgColor="brand.400"
          textColor="white"
          _hover={{ bg: "brand.300" }}
          onClick={() => changeTrack(1)}
        >
          Lofi Study
        </Button>
        <Button
          bgColor="brand.400"
          textColor="white"
          _hover={{ bg: "brand.300" }}
          onClick={() => changeTrack(2)}
        >
          Forest Lullaby
        </Button>
        <Button
          bgColor="brand.400"
          textColor="white"
          _hover={{ bg: "brand.300" }}
          onClick={() => changeTrack(3)}
        >
          Leo Ch. Two
        </Button>
        <Button
          bgColor="brand.400"
          textColor="white"
          _hover={{ bg: "brand.300" }}
          onClick={() => changeTrack(4)}
        >
          Peace Garden
        </Button>
      </SimpleGrid>
    </Box>
  );
};

export default MusicChanger;
