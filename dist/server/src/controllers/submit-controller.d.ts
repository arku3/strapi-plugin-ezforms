import { Core } from '@strapi/strapi';
import { Context as KoaContext } from 'koa';
declare const _default: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    index(ctx: KoaContext): Promise<any>;
};
export default _default;
