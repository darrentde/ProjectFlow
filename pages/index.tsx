/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-no-comment-textnodes */

import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import Iframe from "react-iframe";
import DateTime from "../components/DateTime";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import VibeChanger from "../components/VibeChanger";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

const IndexPage = () => {
  const isRunning = useSelector((state: RootState) => state.timer.isRunning);
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

  useEffect(() => {
    if (isRunning) {
      window.addEventListener("beforeunload", alertUser);
    }
    return () => {
      // setShowDialog(false);
      window.removeEventListener("beforeunload", alertUser);
    };
  }, [isRunning]);

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "Are you sure? You may lose your timer session";
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
        <Box w="100vw" h="100vh">
          <Iframe
            url={vibe}
            id="myId"
            className="myClassname"
            onMouseOut={null}
            onMouseOver={null}
            overflow="hidden"
            frameBorder={0}
            allowFullScreen
            allow="accelerometer autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
