import React from "react";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "Utils/testUtils";

import HomeTitle from "./index";

test("Home title handles no matches for search", () => {
  render(<HomeTitle amount={0} />);

  expect(
    screen.getByText(`No hemos encontrado ninguna coincidencia`)
  ).toBeVisible();
});

test("Home title handles singular", () => {
  render(<HomeTitle amount={1} />);

  expect(
    screen.getByText(`Hemos encontrado un vehículo para ti`)
  ).toBeVisible();
});

test("Home title handles plural", () => {
  render(<HomeTitle amount={2} />);

  expect(
    screen.getByText(`Hemos encontrado 2 vehículos para ti`)
  ).toBeVisible();
});
