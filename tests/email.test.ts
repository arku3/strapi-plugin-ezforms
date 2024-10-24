import { afterAll, beforeEach, describe, expect, test, vi } from "vitest";
import email from "../server/src/services/notification-providers/email";

describe("Email Notification Provider", function () {
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
  afterAll(async function () {
    vi.clearAllMocks();
  });

  test("should send to all recipients", async function () {
    await email({ strapi }).send(config, data, {});
    expect(strapi.plugins["email"].services.email.send).toHaveBeenCalledTimes(
      2
    );
  });
});
