/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-no-comment-textnodes */

import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Iframe from "react-iframe";
import DateTime from "../components/DateTime";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import VibeChanger from "../components/VibeChanger";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

const IndexPage = () => {
  const isRunning = useSelector((state: RootState) => state.timer.isRunning);
  const vibeType = useSelector((state: RootState) => state.vibe.vibeType);
  const vibeUrl = useSelector((state: RootState) => state.vibe.vibeUrl);

  useEffect(() => {
    if (isRunning) {
      window.addEventListener("beforeunload", alertUser);
    }
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, [isRunning]);

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "Are you sure? You may lose your timer session";
  };

  return (
    <Box>
      <Head>
        <title>Project Flow: </title>
        <meta name="description" content="Created by Darren and Wesley" />
        <link rel="icon" href="/favicon_logo.ico" />
      </Head>
      {vibeType === "background" ? (
        <Box w="100vw" h="100vh" bg="brand.100">
          <Navbar />
          <DateTime />
          <Sidebar />
        </Box>
      ) : (
        <Box w="100vw" h="100vh">
          <Head>
            <title>Project Flow: </title>
            <meta name="description" content="Created by Darren and Wesley" />
            <link rel="icon" href="/favicon_logo.ico" />
          </Head>
          <Iframe
            url={vibeUrl}
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
        </Box>
      )}
    </Box>
  );
};

export default IndexPage;
