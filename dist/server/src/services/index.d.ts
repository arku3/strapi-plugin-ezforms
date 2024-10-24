declare const _default: {
    recaptcha: ({ strapi }: {
        strapi: import("../types").CoreStrapi;
    }) => import("../types").CaptchaProvider;
    hcaptcha: ({ strapi }: {
        strapi: import("../types").CoreStrapi;
    }) => import("../types").CaptchaProvider;
    turnstile: ({ strapi }: {
        strapi: import("../types").CoreStrapi;
    }) => import("../types").CaptchaProvider;
    email: ({ strapi }: {
        strapi: import("../types").CoreStrapi;
    }) => import("../types").NotificationProvider;
    twilio: ({ strapi }: {
        strapi: import("../types").CoreStrapi;
    }) => import("../types").NotificationProvider;
    formatData: () => {
        formatData(data: Record<string, unknown>): string;
    };
};
export default _default;
