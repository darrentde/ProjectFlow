import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import ForgetPassword from "./ForgetPassword";
import userEvent from "@testing-library/user-event";

function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

test("Check if forget password modal can render", () => {
  const handleForgetCallback = jest.fn;
  const { user } = setup(
    <ForgetPassword
      showForgetPassword={true}
      handleForgetCallback={handleForgetCallback}
    />
  );
  expect(
    screen.getByText(/please enter your recovery email/i)
  ).toBeInTheDocument();
});

test("Check if email textbox can be typed into", async () => {
  const handleForgetCallback = jest.fn;
  const { user } = setup(
    <ForgetPassword
      showForgetPassword={true}
      handleForgetCallback={handleForgetCallback}
    />
  );
  expect(screen.getByPlaceholderText(/your registered email/i)).toHaveValue("");
  await user.type(
    screen.getByPlaceholderText(/your registered email/i),
    "test@gmail.com"
  );
  expect(screen.getByPlaceholderText(/your registered email/i)).toHaveValue(
    "test@gmail.com"
  );
});

test("Check if password reset is successful", async () => {
  const handleForgetCallback = jest.fn;
  const { user } = setup(
    <ForgetPassword
      showForgetPassword={true}
      handleForgetCallback={handleForgetCallback}
    />
  );
  await user.type(
    screen.getByPlaceholderText(/your registered email/i),
    "test@gmail.com"
  );

  await user.click(
    screen.getByRole("button", {
      name: /submit/i,
    })
  );

  await waitForElementToBeRemoved(() =>
    screen.queryByText(/please enter your recovery email/i)
  );

  expect(
    screen.queryByText(/please enter your recovery email/i)
  ).not.toBeInTheDocument();
});
