declare const _default: {
    recaptcha: ({ strapi }: {
        strapi: import("@strapi/types/dist/core/strapi.js").Strapi;
    }) => import("../types.js").CaptchaProvider;
    hcaptcha: ({ strapi }: {
        strapi: import("@strapi/types/dist/core/strapi.js").Strapi;
    }) => import("../types.js").CaptchaProvider;
    turnstile: ({ strapi }: {
        strapi: import("@strapi/types/dist/core/strapi.js").Strapi;
    }) => import("../types.js").CaptchaProvider;
    email: ({ strapi }: {
        strapi: import("@strapi/types/dist/core/strapi.js").Strapi;
    }) => import("../types.js").NotificationProvider;
    twilio: ({ strapi }: {
        strapi: import("@strapi/types/dist/core/strapi.js").Strapi;
    }) => import("../types.js").NotificationProvider;
    formatData: () => {
        formatData(data: Record<string, unknown>): string;
    };
};
export default _default;
