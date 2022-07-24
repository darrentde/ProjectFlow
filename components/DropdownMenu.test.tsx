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
import DropdownMenu from "./DropdownMenu";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { rootReducer } from "../redux/Store";
import { configureStore } from "@reduxjs/toolkit";

function setup(component: JSX.Element) {
  const store = configureStore({ reducer: rootReducer });
  return {
    user: userEvent.setup(),
    ...render(<Provider store={store}>{component}</Provider>),
  };
}

test("Check if dropdown menu can render", () => {
  const { user } = setup(<DropdownMenu />);
  expect(screen.getByTestId("dropdown-button")).toBeVisible();
});

test("Check if dropdown menu can click", async () => {
  const { user } = setup(<DropdownMenu />);
  await user.click(screen.getByTestId("dropdown-button"));
  expect(
    screen.getByRole("menuitem", {
      name: /module/i,
    })
  ).toBeInTheDocument();
});
