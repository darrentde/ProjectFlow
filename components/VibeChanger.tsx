import { Box, SimpleGrid } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";

const VibeChanger = ({ vibeHandler }) => {
  // array of objects for different types of color -> colorHandler, can give a color wheel to user
  // array for different types of youtubebackground -> videoHandler
  // Different types of handler for different formats.

  const url1 =
    "http://www.youtube.com/embed/znSn8Fm0_i8?autoplay=1&mute=1&controls=0&loop=1&modestbranding=0&rel=0";
  const url2 =
    "https://www.youtube.com/embed/CwJIv4jgUlk?autoplay=1&mute=1&controls=0&loop=1&modestbranding=0&rel=0";
  const url3 =
    "https://youtube.com/embed/z9Ug-3qhrwY?autoplay=1&mute=1&controls=0&loop=1&modestbranding=0&rel=0";
  const url4 =
    "https://www.youtube.com/embed/2KGtXzIb8l8?autoplay=1&mute=1&controls=0&loop=1&modestbranding=0&rel=0";
  return (
    <Box w="300px" h="300px">
      {/* 3x3 grid, of different icons to store the different videos */}
      <SimpleGrid columns={2} spacingX="30px" spacingY="30px">
        <Button onClick={() => vibeHandler(url1)}>Lofi Vibes</Button>
        <Button onClick={() => vibeHandler(url2)}>Lofi Train</Button>
        <Button onClick={() => vibeHandler(url3)}>Studio Ghibli</Button>
        <Button onClick={() => vibeHandler(url4)}>Study with me</Button>
      </SimpleGrid>
    </Box>
  );
};

export default VibeChanger;
