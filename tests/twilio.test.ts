import axios from "axios";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import twilioProvider from "../server/src/services/notification-providers/twilio";

describe("Twilio Notification Provider", function () {
  let strapi;
  let config;
  let data;
  beforeEach(async function () {
    strapi = {
      config: {
        get: vi.fn(),
      },
      log: {
        error: vi.fn(),
      },
      plugin: function () {
        return {
          service: function () {
            return {
              formatData: vi.fn(),
            };
          },
        };
      },
      plugins: {
        email: {
          services: {
            email: {
              send: vi.fn(),
            },
          },
        },
      },
      query: vi.fn(() => {
        return {
          findMany: vi.fn(() => {
            return [
              {
                email: "test@gmail.com",
              },
              {
                email: "test2@gmail.com",
                number: "+1234567890",
              },
              {
                email: "test3@gmail.com",
                number: "+1234567892",
              },
            ];
          }),
        };
      }),
    };
    config = {
      from: "test@gmail.com",
      subject: "New Contact Form Submission",
    };
    data = {
      name: "John Doe",
      email: "test@gmail.com",
    };
  });
  afterEach(async function () {
    vi.clearAllMocks();
  });

  test("should fail to send sms", async function () {
    vi.spyOn(axios, "post").mockRejectedValueOnce(
      new Error("Unable To Send SMS")
    );
    let result = await twilioProvider({ strapi }).send(config, data, {});
    expect(result).toEqual(false);
  });
  test("should send sms twice", async function () {
    vi.spyOn(axios, "post").mockImplementation(() => {
      return Promise.resolve({ data: {} });
    });
    let result = await twilioProvider({ strapi }).send(config, data, {});
    expect(result).toEqual(true);
    expect(axios.post).toHaveBeenCalledTimes(2);
  });
});
