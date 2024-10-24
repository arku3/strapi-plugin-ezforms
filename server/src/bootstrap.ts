import { CoreStrapi } from "./types";

const bootstrap = ({ strapi }: { strapi: CoreStrapi }) => {
  // bootstrap phase
  strapi.log.debug("Bootstrap strapi-plugin-ezforms");
};

export default bootstrap;
