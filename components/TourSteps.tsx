/* eslint-disable react/no-unescaped-entities */
import { Step } from "react-joyride";

export const TOUR_STEPS: Step[] = [
  {
    // 0
    target: "body",
    content: (
      <h2>
        Welcome to Project Flow<br></br> Before starting, make sure that all
        widgets are closed.
      </h2>
    ),
    placement: "center",
  },
  {
    // 1
    target: "#menu-button-menu",
    content: (
      <h2>
        Over here is where you can manage the settings.<br></br>
      </h2>
    ),
    placement: "bottom",
    spotlightClicks: true,
    styles: {
      buttonNext: {
        display: "none",
      },
    },
  },
  {
    // 2
    target: "#menu-item-module",
    content: <h2>Click on modules</h2>,
    spotlightClicks: true,
    placement: "bottom",
    styles: {
      buttonNext: {
        display: "none",
      },
    },
  },
  {
    // 3
    target: "#chakra-modal-module",
    content: <h2>Manage all your modules here</h2>,
    disableOverlay: false,
    placement: "bottom",
    styles: {},
  },
  {
    // 4
    target: "#add-module",
    content: <h2>Click on add a new module</h2>,
    spotlightClicks: true,
    placement: "bottom",
    styles: {
      buttonNext: {
        display: "none",
      },
    },
  },
  {
    // 5
    target: "#add-module-enter",
    content: (
      <h2>
        Enter a module and hit add.<br></br>Don't click outside of the box or
        else the tour would end
      </h2>
    ),
    spotlightClicks: true,
    placement: "bottom",
    disableOverlay: true,
    disableScrolling: true,
    styles: {
      buttonNext: {
        display: "none",
      },
    },
  },
  {
    // 6
    target: "#module-close",
    content: <h2>Close module</h2>,
    spotlightClicks: true,
    placement: "bottom",
    styles: {
      buttonNext: {
        display: "none",
      },
    },
  },
  {
    // 7
    target: "#todo",
    content: <h2>Let's open up the to do</h2>,
    spotlightClicks: true,
    placement: "right",
    styles: {
      buttonNext: {
        display: "none",
      },
    },
  },
  {
    // 8
    target: "#todo-main",
    content: <h2>Here is where you can manage all your to dos.</h2>,
    placement: "bottom",
  },
  {
    // 9
    target: "#add-todo",
    content: <h2>Click on add a new todo</h2>,
    placement: "right",
    spotlightClicks: true,
    styles: {
      buttonNext: {
        display: "none",
      },
    },
  },
  {
    // 10
    target: "#save-todo",
    content: <h2>Fill up the todo and hit save.</h2>,
    placement: "right",
    spotlightClicks: true,
    disableOverlay: true,
    styles: {
      buttonNext: {
        display: "none",
      },
    },
  },
  {
    // 11
    target: "#timer",
    content: <h2>Let's open up the timer.</h2>,
    spotlightClicks: true,
    placement: "right",
    styles: {
      buttonNext: {
        display: "none",
      },
    },
  },
  {
    // 12
    target: "#timer-main",
    content: (
      <h2>
        Over here you can use the timer as a pomodoro tracker or you can use it
        to track sessions
      </h2>
    ),
    placement: "right",
  },
  {
    // 13
    target: ".play-session",
    content: (
      <h2>Click play to play pomodoro and track the time spent on the task </h2>
    ),
    placement: "right",
  },
  {
    // 14
    target: "#timer-sessions",
    content: <h2>Past recorded sessions of to dos will be stored here</h2>,
    placement: "right",
  },
  {
    // 15
    target: "#timer-settings",
    content: <h2>Customize the length of your pomodoro session</h2>,
    placement: "right",
  },
  {
    // 16
    target: "body",
    content: (
      <h2>
        Thanks for going on a tour with us! You can always start the tour
        through the profile button at the top right of the app.
      </h2>
    ),
    placement: "center",
  },
];
