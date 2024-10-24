import axios from "axios";
const bootstrap = ({ strapi }) => {
  strapi.log.debug("Bootstrap strapi-plugin-ezforms");
};
const config = {
  default: {
    captchaProvider: {
      name: "none",
      config: {}
    },
    enableFormName: false,
    notificationProviders: [
      {
        name: "email",
        enabled: false,
        config: {
          from: "noreply@strapi.io",
          subject: "New Contact Form Submission"
        }
      }
    ]
  },
  validator() {
  }
};
const recipient = {
  kind: "collectionType",
  collectionName: "recipients",
  info: {
    singularName: "recipient",
    // kebab-case mandatory
    pluralName: "recipients",
    // kebab-case mandatory
    displayName: "Notification Recipients",
    description: "List of Notification Recipients"
  },
  options: {
    draftAndPublish: false
  },
  pluginOptions: {
    "content-manager": {
      visible: true
    },
    "content-type-builder": {
      visible: false
    }
  },
  attributes: {
    name: {
      type: "string",
      min: 1,
      max: 50,
      configurable: false
    },
    email: {
      type: "string",
      min: 1,
      max: 50,
      configurable: false
    },
    number: {
      type: "string",
      min: 1,
      max: 50,
      configurable: false
    }
  }
};
const submission = {
  kind: "collectionType",
  collectionName: "submissions",
  info: {
    singularName: "submission",
    // kebab-case mandatory
    pluralName: "submissions",
    // kebab-case mandatory
    displayName: "Form Submissions",
    description: "A Place for all your form submissions"
  },
  options: {
    draftAndPublish: false
  },
  pluginOptions: {
    "content-manager": {
      visible: true
    },
    "content-type-builder": {
      visible: false
    }
  },
  attributes: {
    score: {
      type: "string",
      min: 1,
      max: 50,
      configurable: false
    },
    formName: {
      type: "string",
      min: 1,
      max: 50,
      configurable: false
    },
    data: {
      type: "json",
      configurable: false
    }
  }
};
const contentTypes = {
  recipient: { schema: recipient },
  submission: { schema: submission }
};
const submitController = ({ strapi }) => ({
  async index(ctx) {
    let verification = { valid: true, score: -1 };
    const formName = strapi.config.get("plugin::ezforms.enableFormName") ? ctx.request.body.formName : "form";
    if (!(strapi.config.get("plugin::ezforms.captchaProvider.name") === "none") && strapi.config.get("plugin::ezforms.captchaProvider.name")) {
      verification = await strapi.plugin("ezforms").service(strapi.config.get("plugin::ezforms.captchaProvider.name")).validate(ctx.request.body.token);
      if (!verification.valid) {
        strapi.log.error(`${verification.code}: ${verification.message}`);
        if (verification.code === 500) {
          return ctx.internalServerError(
            "There was an error, check Strapi logs for more details. " + verification.message
          );
        } else if (verification.code === 400) {
          return ctx.badRequest(verification.message);
        } else {
          return ctx.internalServerError("There was an error");
        }
      }
    }
    for (const provider of strapi.config.get(
      "plugin::ezforms.notificationProviders"
    )) {
      if (provider.enabled) {
        try {
          await strapi.plugin("ezforms").service(provider.name).send(provider.config, formName, ctx.request.body.formData);
        } catch (e) {
          strapi.log.error(e);
          ctx.internalServerError("A Whoopsie Happened");
        }
      }
    }
    const parsedScore = verification.score || -1;
    try {
      await strapi.query("plugin::ezforms.submission").create({
        data: {
          score: parsedScore,
          formName,
          data: ctx.request.body.formData
        }
      });
    } catch (e) {
      strapi.log.error(e);
      return ctx.internalServerError("A Whoopsie Happened");
    }
    return ctx.body = ctx.request.body.formData;
  }
});
const controllers = {
  submitController
};
const destroy = () => {
};
const register = () => {
};
const routes = {
  "content-api": {
    type: "content-api",
    routes: [
      {
        method: "POST",
        path: "/submit",
        handler: "submitController.index",
        config: {
          policies: []
        }
      }
    ]
  }
};
const hcaptcha = ({ strapi }) => ({
  async validate(token) {
    if (!token) {
      strapi.log.error("Missing hCaptcha Token");
      return {
        valid: false,
        message: "Missing token",
        code: 400
      };
    }
    const secret = strapi.config.get(
      "plugin::ezforms.captchaProvider.config.secret"
    );
    const sitekey = strapi.config.get(
      "plugin::ezforms.captchaProvider.config.sitekey"
    );
    const url = `https://hcaptcha.com/siteverify`;
    let hCaptcha_verify;
    try {
      hCaptcha_verify = await axios.post(
        url,
        new URLSearchParams({
          secret,
          sitekey,
          response: token
          // remoteip?
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
    } catch (e) {
      strapi.log.error(e);
      return {
        valid: false,
        message: "Unable to verify captcha",
        code: 500
      };
    }
    if (!hCaptcha_verify.data.success) {
      strapi.log.error("hCaptcha_verify");
      strapi.log.error(JSON.stringify(hCaptcha_verify.data));
      return {
        valid: false,
        message: "Unable to verify captcha",
        code: 500
      };
    }
    if ((hCaptcha_verify.data.score || 0) >= Number(
      strapi.config.get("plugin::ezforms.captchaProvider.config.score") || 0
    )) {
      return {
        valid: false,
        message: "Risk Score too high",
        code: 400
      };
    }
    return {
      score: hCaptcha_verify.data.score ?? null,
      valid: true
    };
  }
});
const recaptcha = ({ strapi }) => ({
  async validate(token) {
    if (!token) {
      strapi.log.error("Missing Recaptcha Token");
      return {
        valid: false,
        message: "Missing token",
        code: 400
      };
    }
    const secret_key = strapi.config.get(
      "plugin::ezforms.captchaProvider.config.secretKey"
    );
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
    let recaptcha_verify;
    try {
      recaptcha_verify = await axios.post(url);
    } catch (e) {
      strapi.log.error(e);
      return {
        valid: false,
        message: "Unable to verify captcha",
        code: 500
      };
    }
    if (!recaptcha_verify.data.success) {
      strapi.log.error("recaptcha_verify");
      strapi.log.error(recaptcha_verify);
      return {
        valid: false,
        message: "Unable to verify captcha",
        code: 500
      };
    }
    if (recaptcha_verify.data.score < Number(
      strapi.config.get("plugin::ezforms.captchaProvider.config.score") ?? 0
    )) {
      return {
        valid: false,
        message: "Score Not High Enough",
        code: 400
      };
    }
    return {
      score: recaptcha_verify.data.score,
      valid: true
    };
  }
});
const turnstile = ({ strapi }) => ({
  async validate(token) {
    if (!token) {
      strapi.log.error("Missing turnstile Token");
      return {
        valid: false,
        message: "Missing token",
        code: 400
      };
    }
    const secret = strapi.config.get(
      "plugin::ezforms.captchaProvider.config.secret"
    );
    const url = `https://challenges.cloudflare.com/turnstile/v0/siteverify`;
    const requestContext = strapi.requestContext.get();
    const remoteip = requestContext?.request.ip;
    let turnstile_verify;
    try {
      turnstile_verify = await axios.post(url, {
        secret,
        response: token,
        remoteip
      });
    } catch (e) {
      strapi.log.error(e);
      return {
        valid: false,
        message: "Unable to verify captcha",
        code: 500
      };
    }
    if (!turnstile_verify.data.success) {
      strapi.log.warn("turnstile_verify failed");
      strapi.log.warn(JSON.stringify(turnstile_verify.data));
      return {
        valid: false,
        message: "Unable to verify captcha",
        code: 500
      };
    }
    return {
      score: null,
      valid: true
    };
  }
});
const email = ({ strapi }) => ({
  async send(config2, formName, data) {
    const recipients = await strapi.query("plugin::ezforms.recipient").findMany();
    const formattedData = strapi.plugin("ezforms").service("formatData").formatData(data);
    const message = formName !== "form" ? `${formName} 
 ${formattedData}` : formattedData;
    for (const recipient2 of recipients) {
      try {
        await strapi.plugins["email"].services.email.send({
          to: recipient2.email,
          from: config2.from,
          subject: config2.subject ? config2.subject : "New Contact Form Submission",
          html: message
        });
      } catch (e) {
        strapi.log.error(e);
      }
    }
    return true;
  }
});
const twilio = ({ strapi }) => ({
  async send(config2, data) {
    const TWILIO_ACCOUNT_SID = config2.accountSid;
    const TWILIO_AUTH_TOKEN = config2.authToken;
    const recipients = await strapi.query("plugin::ezforms.recipient").findMany();
    let message = "New Form Submission: \n";
    message += strapi.plugin("ezforms").service("formatData").formatData(data);
    for (const recipient2 of recipients) {
      if (!recipient2.number) {
        continue;
      }
      try {
        const params = new URLSearchParams();
        params.append("To", recipient2.number);
        params.append("From", config2.from);
        params.append("Body", message);
        await axios.post(
          `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "Basic " + Buffer.from(
                `${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`
              ).toString("base64") + ")"
            }
          }
        );
      } catch (e) {
        strapi.log.error(e);
      }
    }
    return true;
  }
});
const formatData = () => ({
  formatData(data) {
    let message = "";
    for (const key in data) {
      if (typeof data[key] === "object") {
        message += `${key}: ${JSON.stringify(data[key], null, 2)}
`;
      } else {
        message += `${key}: ${data[key]}
`;
      }
    }
    return message;
  }
});
const services = { recaptcha, hcaptcha, turnstile, email, twilio, formatData };
const index = {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  contentTypes
};
export {
  index as default
};
