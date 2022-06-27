/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Box } from "@chakra-ui/react";
// import "reset-css";
import { useState } from "react";
import Iframe from "react-iframe";
import DateTime from "../components/DateTime";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import VibeChanger from "../components/VibeChanger";

const IndexPage = () => {
  const [vibetype, setVibeType] = useState("background");

  const [vibe, setVibe] = useState(
    "http://www.youtube.com/embed/znSn8Fm0_i8?autoplay=1&mute=1&controls=0&loop=1&modestbranding=0&rel=0"
  );

  const vibeHandler = (value, type) => {
    if (type === "background") {
      setVibeType("background");
    } else {
      setVibe(value);
      setVibeType("video");
    }
  };

  return (
    <Box>
      {vibetype === "background" ? (
        <Box w="100vw" h="100vh" bg="brand.100">
          <Navbar />
          <DateTime />
          <Sidebar />
          <VibeChanger vibeHandler={vibeHandler} />
        </Box>
      ) : (
        <Box w="100vw" h="100vh" bg="brand.100">
          <Iframe
            url={vibe}
            width="100%"
            height="100%"
            id="myId"
            className="myClassname"
            position="absolute"
            onMouseOut={null}
            onMouseOver={null}
          />

          <Navbar />
          <DateTime />
          <Sidebar />
          <VibeChanger vibeHandler={vibeHandler} />
        </Box>
      )}
    </Box>
  );
};

export default IndexPage;
