import { Core } from "@strapi/strapi";

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  // bootstrap phase
  strapi.log.debug("BootStrap plugin-ezforms");
};

export default bootstrap;
