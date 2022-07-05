// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import React from "react";
import TimerSettings from "./TimerSettings";

// describe("<TimerSettings /> spec", () => {
//   it("renders component", () => {
//     const { getByTestId } = render(<TimerSettings />);
//     const timerSettings = getByTestId("timer-settings");
//     expect(timerSettings).toBeDefined();
//   });
// });

it("renders component", () => {
  const { getByTestId } = render(<TimerSettings />);
  const timerSettings = getByTestId("timer-settings");
  expect(timerSettings).toBeDefined();
});
