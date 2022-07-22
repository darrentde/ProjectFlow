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
import Login from "./Login";
import userEvent from "@testing-library/user-event";

function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

// const signInWithGithub = jest.fn;
// const handleSubmit = jest.fn;

test("Check if signin button can render", () => {
  const { user } = setup(<Login />);
  expect(screen.getByRole("button", { name: /signin/i })).toBeVisible();
});

test("Check if login can open", async () => {
  const { user } = setup(<Login />);
  await user.click(screen.getByRole("button", { name: /signin/i }));
  expect(screen.getByRole("dialog", { name: /get into/i })).toBeInTheDocument();
});

test("Check if modal can close", async () => {
  const { user } = setup(<Login />);
  await user.click(screen.getByRole("button", { name: /Signin/i }));
  user.click(screen.getByRole("button", { name: /close/i }));
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/Lets get into the flow/)
  );
  expect(screen.queryByText("Lets get into the flow")).not.toBeInTheDocument();
});

// test("Check if can submit login", async () => {
//   const { user } = setup(<Login handleSubmit={handleSubmit} />);
//   await user.click(screen.getByRole("button", { name: /Signin/i }));
//   expect(screen.getByTestId("email-input")).toHaveValue("");
//   user.type(screen.getByTestId("email-input"), "test@gmail.com");
//   // expect(await screen.findByText("test@gmail.com")).toBeInTheDocument();
//   user.type(screen.getByTestId("password-input"), "123456");
//   user.click(screen.getByTestId("submit-form"));
//   await waitFor(() => {
//     expect(handleSubmit).toHaveBeenCalledTimes(1);
//   });
// });

// test("Check if can sign in through Github", async () => {
//   const { user } = setup(<Login />);
//   await user.click(screen.getByRole("button", { name: /Signin/i }));
//   user.click(screen.getByRole("button", { name: /log in with github/i }));
//   await waitFor(() => {
//     expect(signInWithGithub).toHaveBeenCalledTimes(1);
//   });
// });
