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

test("Check if signup modal can open", async () => {
  const { user } = setup(<Login />);
  await user.click(screen.getByRole("button", { name: /Signin/i }));
  user.click(
    screen.getByRole("button", {
      name: /sign up/i,
    })
  );
  expect(await screen.findByText(/already a member\?/i)).toBeInTheDocument();
});

test("Check if forget password modal can open", async () => {
  const { user } = setup(<Login />);
  await user.click(screen.getByRole("button", { name: /Signin/i }));
  user.click(
    screen.getByRole("button", {
      name: /forgot password\?/i,
    })
  );
  expect(
    await screen.findByText(/please enter your recovery email/i)
  ).toBeInTheDocument();
});

test("Check if email textbox can be typed into", async () => {
  const { user } = setup(<Login />);
  await user.click(screen.getByRole("button", { name: /Signin/i }));
  expect(screen.getByPlaceholderText(/your email/i)).toHaveValue("");
  await user.type(screen.getByPlaceholderText(/your email/i), "test@gmail.com");
  expect(screen.getByPlaceholderText(/your email/i)).toHaveValue(
    "test@gmail.com"
  );
});

test("Check if password textbox can be typed into", async () => {
  const { user } = setup(<Login />);
  await user.click(screen.getByRole("button", { name: /Signin/i }));
  expect(screen.getByPlaceholderText(/your password/i)).toHaveValue("");
  await user.type(screen.getByPlaceholderText(/your password/i), "123456");
  expect(screen.getByPlaceholderText(/your password/i)).toHaveValue("123456");
});

// test("Check if can sign in through Github", async () => {
//   const { user } = setup(<Login />);
//   await user.click(screen.getByRole("button", { name: /Signin/i }));
//   user.click(screen.getByRole("button", { name: /log in with github/i }));
//   await waitFor(() => {
//     expect(signInWithGithub).toHaveBeenCalledTimes(1);
//   });
// });

// test("Check if forget password can be submitted", async () => {
//   const { user } = setup(<Signin />);
//   await user.click(screen.getByRole("button", { name: /Signin/i }));
//   user.click(screen.getByRole("button", { name: /Forget password?/i }));
//   user.type(screen.getByTestId("forget-password"), "user@test.com");
//   user.click(screen.getByRole("button", { name: /Submit/ }));
//   await waitFor(() => {
//     expect(handleForgetPassword).toHaveBeenCalledTimes(1);
//   });
// });
