import React from "react";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { Context as ResponsiveContext } from "react-responsive";

import { render } from "Utils/testUtils";
import images from "Assets/Navbar";

import Navbar from "./index";

test("Navbar image renders correctly", async () => {
  render(<Navbar />);
  const bigWindowImage = screen.getByAltText(
    "Volkswagen Financial Services - The Key To Mobility"
  ).src;
  expect(bigWindowImage).toBe(images.desktop);
});

test("Navbar image changes on mobile devices", async () => {
  const mobileSize = 599;
  render(
    <ResponsiveContext.Provider value={{ width: mobileSize }}>
      <Navbar />
    </ResponsiveContext.Provider>
  );

  const smallWindowImage = screen.getByAltText(
    "Volkswagen Financial Services - The Key To Mobility"
  ).src;

  expect(smallWindowImage).toBe(images.mobile);
});
