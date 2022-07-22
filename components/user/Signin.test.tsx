import { getByRole, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Signin from "./Signin";
import userEvent from "@testing-library/user-event";

function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

const handleSumbit = jest.fn();
const handleForgetPassword = jest.fn;
const signInWithGithub = jest.fn;

test("Check if signin button can render", () => {
  const { user } = setup(<Signin />);
  expect(screen.getByRole("button", { name: /Signin/i })).toBeVisible();
});

test("Check if modal can open", async () => {
  const { user } = setup(<Signin />);
  await user.click(screen.getByRole("button", { name: /Signin/i }));
  expect(screen.getByText("Lets get into the flow")).toBeInTheDocument();
});

test("Check if modal can close", async () => {
  const { user } = setup(<Signin />);
  await user.click(screen.getByRole("button", { name: /Signin/i }));
  user.keyboard("{escape}");
  expect(
    await screen.findByText("Lets get into the flow")
  ).not.toBeInTheDocument();
});

test("Check if can submit login", async () => {
  const { user } = setup(<Signin />);
  await user.click(screen.getByRole("button", { name: /Signin/i }));
  expect(screen.getByTestId("email-input")).toHaveValue("");
  user.type(screen.getByTestId("email-input"), "test@gmail.com");
  // expect(await screen.findByText("test@gmail.com")).toBeInTheDocument();
  user.type(screen.getByTestId("password-input"), "123456");
  user.click(screen.getByTestId("submit-form"));
  await waitFor(() => {
    expect(handleSumbit).toHaveBeenCalledTimes(1);
  });
});

test("Check if can sign in through Github", async () => {
  const { user } = setup(<Signin />);
  await user.click(screen.getByRole("button", { name: /Signin/i }));
  user.click(screen.getByRole("button", { name: /log in with github/i }));
  await waitFor(() => {
    expect(signInWithGithub).toHaveBeenCalledTimes(1);
  });
});

test("Check if forget password modal can open", async () => {
  const { user } = setup(<Signin />);
  await user.click(screen.getByRole("button", { name: /Signin/i }));
  user.click(screen.getByRole("button", { name: /Forget password?/i }));
  expect(screen.getByText("Let's change your password!")).toBeInTheDocument();
});

test("Check if forget password can be submitted", async () => {
  const { user } = setup(<Signin />);
  await user.click(screen.getByRole("button", { name: /Signin/i }));
  user.click(screen.getByRole("button", { name: /Forget password?/i }));
  user.type(screen.getByTestId("forget-password"), "user@test.com");
  user.click(screen.getByRole("button", { name: /Submit/ }));
  await waitFor(() => {
    expect(handleForgetPassword).toHaveBeenCalledTimes(1);
  });
});
