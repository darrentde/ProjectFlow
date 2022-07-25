import { Box, Flex, SimpleGrid } from "@chakra-ui/layout";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { setVibe } from "../redux/VibeSlice";

const VibeChanger = () => {
  // array of objects for different types of color -> colorHandler, can give a color wheel to user
  // array for different types of youtubebackground -> videoHandler
  // Different types of handler for different formats.

  // https://www.youtube.com/watch?v=VLcFor0Im5g
  // https://www.youtube.com/watch?v=j2EdQD_Eag0

  const dispatch = useDispatch();

  const [customurl, setCustomUrl] = useState("");

  const getEmbedUrl = (youtubeLink) => {
    const temp = String(youtubeLink);
    const endOfUrl =
      "?autoplay=1&mute=1&controls=0&loop=1&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1";
    if (temp.length === 43) {
      const result = temp.replace("watch?v=", "embed/").concat(endOfUrl);
      // https://www.youtube.com/embed/v=1oahTaVIQvk?autoplay=1&mute=1&controls=0&loop=1&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1
      console.log(
        "🚀 ~ file: VibeChanger.tsx ~ line 20 ~ get_embed_url ~ result",
        result
      );
      return result;
    }
  };

  const handleClick = (url, type) => {
    dispatch(setVibe({ vibeUrl: url, vibeType: type }));
  };

  const url1 =
    "https://www.youtube.com/embed/UKRYHQALlAI?autoplay=1&mute=1&controls=0&loop=1&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1";
  // const url2 =
  //   "https://www.youtube.com/embed/CwJIv4jgUlk?autoplay=1&mute=1&controls=0&loop=1&modestbranding=0&rel=0";
  const url3 =
    "https://youtube.com/embed/z9Ug-3qhrwY?autoplay=1&mute=1&controls=0&loop=1&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1";
  const url4 =
    "https://www.youtube.com/embed/2KGtXzIb8l8?autoplay=1&mute=1&controls=0&loop=1&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1";
  return (
    <Draggable bounds="body" handle=".Header">
      <Box
        position="absolute"
        top="450px"
        left="0px"
        ml="2"
        mt="20"
        w="300px"
        bg="white"
        rounded="lg"
      >
        {/* 3x3 grid, of different icons to store the different videos */}
        <Text textAlign="center" className="Header" cursor="pointer">
          {" "}
          Vibe Changer
        </Text>
        <SimpleGrid m="2" columns={2} spacingX="10px" spacingY="10px">
          <Button
            bgColor="brand.400"
            textColor="white"
            _hover={{ bg: "brand.300" }}
            onClick={() => handleClick(url1, "background")}
          >
            Background
          </Button>
          <Button
            bgColor="brand.400"
            textColor="white"
            _hover={{ bg: "brand.300" }}
            onClick={() => handleClick(url1, "video")}
          >
            Lofi Vibes
          </Button>
          <Button
            bgColor="brand.400"
            textColor="white"
            _hover={{ bg: "brand.300" }}
            onClick={() => handleClick(url3, "video")}
          >
            Studio Ghibli
          </Button>
          <Button
            bgColor="brand.400"
            textColor="white"
            _hover={{ bg: "brand.300" }}
            onClick={() => handleClick(url4, "video")}
          >
            Study with me
          </Button>
        </SimpleGrid>
        <Flex m="2">
          <InputGroup size="md">
            <Input
              // pr="4.5rem"
              placeholder="Paste Youtube Link"
              onChange={(event) =>
                setCustomUrl(getEmbedUrl(event.target.value))
              }
            />
            <InputRightElement width="4.5rem">
              <Button
                bgColor="brand.400"
                textColor="white"
                _hover={{ bg: "brand.300" }}
                h="1.75rem"
                size="sm"
                onClick={() => handleClick(customurl, "video")}
              >
                Start
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Box>
    </Draggable>
  );
};

export default VibeChanger;
