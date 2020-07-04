import React from "react";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import matchMediaPolyfill from "mq-polyfill";

import { render } from "Utils/testUtils";
import images from "Assets/Navbar";

import Navbar from "./index";

beforeAll(() => {
  matchMediaPolyfill(window);
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event("resize"));
  };
});

test("Navbar image changes on resize viewport", async () => {
  render(<Navbar />);

  window.resizeTo(1200, 1200);
  const bigWindowImage = screen.getByAltText(
    "Volkswagen Financial Services - The Key To Mobility"
  ).src;
  expect(bigWindowImage).toBe(images.desktop);

  //   window.resizeTo(550, 550);

  //   const smallWindowImage = screen.getByAltText(
  //     "Volkswagen Financial Services - The Key To Mobility"
  //   ).src;

  //   expect(smallWindowImage).toBe(images.mobile);
});

test("Navbar image changes on resize viewport", async () => {
  render(<Navbar />);

  window.resizeTo(550, 550);

  const smallWindowImage = screen.getByAltText(
    "Volkswagen Financial Services - The Key To Mobility"
  ).src;

  expect(smallWindowImage).toBe(images.mobile);
});
