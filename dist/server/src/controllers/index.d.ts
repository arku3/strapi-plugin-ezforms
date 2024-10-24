/// <reference types="koa" />
declare const _default: {
    submitController: ({ strapi }: {
        strapi: import("../types").CoreStrapi;
    }) => {
        index(ctx: import("koa").Context): Promise<any>;
    };
};
export default _default;
