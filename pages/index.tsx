/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import Iframe from "react-iframe";
import DateTime from "../components/DateTime";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import VibeChanger from "../components/VibeChanger";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { useMount, useSetState } from "react-use";
import Tour from "../components/Tour";

interface State {
  run: boolean;
  steps: Step[];
}

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

  const [{ run, steps }, setState] = useSetState<State>({
    run: false,
    steps: [
      {
        content: <h2>Let's begin our journey!</h2>,
        locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
        placement: "center",
        target: "body",
      },
      {
        content: <h2>Yes!</h2>,
        locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
        placement: "center",
        target: "body",
      },
      {
        content: <h2>No!</h2>,
        locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
        placement: "center",
        target: "body",
      },
    ],
  });

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    setState({
      run: true,
    });
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false });
    }

    console.log(data);
  };
  return (
    <Box>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideBackButton
        hideCloseButton
        run={run}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      {vibetype === "background" ? (
        <Box w="100vw" h="100vh" bg="brand.100">
          <Navbar />
          <Tour />
          <DateTime />
          <Sidebar />
          <VibeChanger vibeHandler={vibeHandler} />
          <Button onClick={handleClickStart} />
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
