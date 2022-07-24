import {
  getByRole,
  queryByText,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import PasswordReset from "./PasswordReset";
import userEvent from "@testing-library/user-event";

function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

test("Check if password reset can render", () => {
  const { user } = setup(<PasswordReset />);
  expect(
    screen.getByText(/please enter your new password and remember it/i)
  ).toBeVisible();
});

test("Check if new password can be typed into", async () => {
  const { user } = setup(<PasswordReset />);
  expect(screen.getByPlaceholderText(/new password/i)).toHaveValue("");
  await user.type(screen.getByPlaceholderText(/new password/i), "546123");
  expect(screen.getByPlaceholderText(/new password/i)).toHaveValue("546123");
});

// test("Check if password reset is successful", async () => {
//   const { user } = setup(<PasswordReset />);
//   await user.type(screen.getByPlaceholderText(/new password/i), "546123");

//   await user.click(
//     screen.getByRole("button", {
//       name: /submit/i,
//     })
//   );

//   await waitForElementToBeRemoved(() =>
//     screen.queryByText(/please enter your new password and remember it/i)
//   );

//   expect(
//     screen.queryByText(/please enter your new password and remember it/i)
//   ).not.toBeInTheDocument();
// });
