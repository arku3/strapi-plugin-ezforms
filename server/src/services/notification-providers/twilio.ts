import axios from "axios";
import { CoreStrapi, NotificationProvider } from "../../types";

export default ({ strapi }: { strapi: CoreStrapi }): NotificationProvider => ({
  async send(config, data) {
    const TWILIO_ACCOUNT_SID = config.accountSid as string;
    const TWILIO_AUTH_TOKEN = config.authToken as string;

    const recipients = await strapi
      .query("plugin::ezforms.recipient")
      .findMany();
    let message = "New Form Submission: " + "\n";
    //Loop through data and construct message from data object
    message += strapi.plugin("ezforms").service("formatData").formatData(data);
    //loop through the recipients and send an email
    for (const recipient of recipients) {
      if (!recipient.number) {
        continue;
      }
      try {
        const params = new URLSearchParams();
        params.append("To", recipient.number);
        params.append("From", config.from as string);
        params.append("Body", message);
        await axios.post(
          `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization:
                "Basic " +
                Buffer.from(
                  `${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`
                ).toString("base64") +
                ")",
            },
          }
        );
      } catch (e) {
        strapi.log.error(e);
        return false;
      }
    }
    return true;
  },
});
