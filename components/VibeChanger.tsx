import { Box, SimpleGrid } from "@chakra-ui/layout";
import { Button, Text } from "@chakra-ui/react";

const VibeChanger = ({ vibeHandler }) => {
  // array of objects for different types of color -> colorHandler, can give a color wheel to user
  // array for different types of youtubebackground -> videoHandler
  // Different types of handler for different formats.

  const url1 =
    "https://www.youtube.com/embed/_ITiwPMUzho?autoplay=1&mute=1&controls=0&loop=1&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1";
  // const url2 =
  //   "https://www.youtube.com/embed/CwJIv4jgUlk?autoplay=1&mute=1&controls=0&loop=1&modestbranding=0&rel=0";
  const url3 =
    "https://youtube.com/embed/z9Ug-3qhrwY?autoplay=1&mute=1&controls=0&loop=1&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1";
  const url4 =
    "https://www.youtube.com/embed/2KGtXzIb8l8?autoplay=1&mute=1&controls=0&loop=1&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1";
  return (
    <Box ml="2" mt="20" w="300px" h="300px">
      {/* 3x3 grid, of different icons to store the different videos */}
      <Text textAlign="center"> Vibe Changer</Text>
      <SimpleGrid columns={2} spacingX="10px" spacingY="10px">
        <Button
          bgColor="brand.400"
          textColor="white"
          _hover={{ bg: "brand.300" }}
          onClick={() => vibeHandler(url1, "background")}
        >
          Background
        </Button>
        <Button
          bgColor="brand.400"
          textColor="white"
          _hover={{ bg: "brand.300" }}
          onClick={() => vibeHandler(url1, "video")}
        >
          Lofi Vibes
        </Button>
        <Button
          bgColor="brand.400"
          textColor="white"
          _hover={{ bg: "brand.300" }}
          onClick={() => vibeHandler(url3, "video")}
        >
          Studio Ghibli
        </Button>
        <Button
          bgColor="brand.400"
          textColor="white"
          _hover={{ bg: "brand.300" }}
          onClick={() => vibeHandler(url4, "video")}
        >
          Study with me
        </Button>
      </SimpleGrid>
    </Box>
  );
};

export default VibeChanger;
