import type { Core } from "@strapi/strapi";
export interface CoreStrapi extends Core.Strapi {
}
export type CaptchaValidateResult = {
    valid: true;
    score?: number | null;
} | {
    valid: false;
    message: string;
    code: number;
};
export type NotificationProviderFunction = (config: Record<string, unknown>, formName: string, data: unknown) => Promise<boolean>;
export interface NotificationProvider {
    send: NotificationProviderFunction;
}
export interface CaptchaProvider {
    validate: (token: string) => Promise<CaptchaValidateResult>;
}