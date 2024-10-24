/// <reference types="koa" />
declare const _default: {
    submitController: ({ strapi }: {
        strapi: import("@strapi/types/dist/core/strapi.js").Strapi;
    }) => {
        index(ctx: import("koa").Context): Promise<any>;
    };
};
export default _default;
