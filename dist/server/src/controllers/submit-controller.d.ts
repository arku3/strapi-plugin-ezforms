import { Context as KoaContext } from 'koa';
import { CoreStrapi } from '../types';
declare const _default: ({ strapi }: {
    strapi: CoreStrapi;
}) => {
    index(ctx: KoaContext): Promise<any>;
};
export default _default;
