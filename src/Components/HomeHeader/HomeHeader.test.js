import React from "react";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { Context as ResponsiveContext } from "react-responsive";

import { store, render, fireEvent } from "Utils/testUtils";

import HomeHeader from "./index";

test("Home header renders correctly", () => {
  const container = render(<HomeHeader amount={0} />);
  expect(container.firstChild).toMatchSnapshot();
});

test("Searchbar text changes", () => {
  const testText = "Test";
  render(<HomeHeader amount={0} />);

  const input = screen.getByPlaceholderText("Buscar Marca");

  expect(input).toBeVisible();

  fireEvent.change(input, {
    target: { value: testText },
  });

  expect(input.value).toBe(testText);
});

test("Favorites changes icon correctly", async () => {
  render(<HomeHeader amount={0} />);

  expect(screen.getByTestId("disliked-icon")).toBeVisible();
  fireEvent.click(screen.getByTestId("like-button"));

  const {
    cars: { filters },
  } = store.getState();

  expect(filters.liked).toBeTruthy();
  expect(screen.getByTestId("liked-icon")).toBeVisible();
});

test("Removes big texts on mobile devices", async () => {
  const mobileSize = 599;
  render(
    <ResponsiveContext.Provider value={{ width: mobileSize }}>
      <HomeHeader amount={0} />
    </ResponsiveContext.Provider>
  );

  const favoritesText = screen.queryByText("Favorites");

  expect(favoritesText).not.toBeInTheDocument();
});
