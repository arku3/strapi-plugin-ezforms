import axios from "axios";
import { beforeEach, describe, expect, test, vi } from "vitest";
import recaptcha from "../server/src/services/captcha-providers/recaptcha";

describe("Recaptcha Captcha Provider", function () {
  let strapi;

  beforeEach(async function () {
    strapi = {
      config: {
        get: vi.fn(),
      },
      log: {
        error: vi.fn(),
      },
    };
  });

  test("should return error if no token is provided", async function () {
    let result = await recaptcha({ strapi }).validate(null);

    expect(result).toEqual({
      valid: false,
      message: "Missing token",
      code: 400,
    });
  });
  test("should return error if captcha post failed", async function () {
    vi.spyOn(axios, "post").mockRejectedValueOnce(
      new Error("Unable to verify captcha")
    );

    let result = await recaptcha({ strapi }).validate("fakeToken");

    await expect(result).toEqual({
      valid: false,
      message: "Unable to verify captcha",
      code: 500,
    });
  });

  test("should return error if captcha is unsuccessful", async function () {
    vi.spyOn(axios, "post").mockResolvedValueOnce({
      data: {
        success: false,
      },
    });

    let result = await recaptcha({ strapi }).validate("fakeToken");

    await expect(result).toEqual({
      valid: false,
      message: "Unable to verify captcha",
      code: 500,
    });
  });
  test("should reject due to low score", async function () {
    vi.spyOn(axios, "post").mockResolvedValueOnce({
      data: {
        success: true,
        score: 0.4,
      },
    });
    strapi.config.get = vi.fn(() => {
      return 0.5;
    });

    let result = await recaptcha({ strapi }).validate("fakeToken");

    await expect(result).toEqual({
      valid: false,
      message: "Score Not High Enough",
      code: 400,
    });
  });
  test("should be valid captcha", async function () {
    vi.spyOn(axios, "post").mockResolvedValueOnce({
      data: {
        success: true,
        score: 0.8,
      },
    });
    strapi.config.get = vi.fn(() => {
      return 0.5;
    });

    let result = await recaptcha({ strapi }).validate("fakeToken");

    await expect(result).toEqual({
      score: 0.8,
      valid: true,
    });
  });
});
