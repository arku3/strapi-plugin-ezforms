/// <reference types="koa" />
declare const _default: {
    register: ({ strapi }: {
        strapi: import("@strapi/types/dist/core/strapi.js").Strapi;
    }) => void;
    bootstrap: ({ strapi }: {
        strapi: import("@strapi/types/dist/core/strapi.js").Strapi;
    }) => void;
    destroy: ({ strapi }: {
        /**
         * Plugin server methods
         */
        strapi: import("@strapi/types/dist/core/strapi.js").Strapi;
    }) => void;
    config: {
        default: {
            captchaProvider: {
                name: string; /**
                 * Plugin server methods
                 */
                config: {};
            };
            enableFormName: boolean;
            notificationProviders: {
                name: string;
                enabled: boolean;
                config: {
                    from: string;
                    subject: string;
                };
            }[];
        };
        validator(): void;
    };
    controllers: {
        submitController: ({ strapi }: {
            strapi: import("@strapi/types/dist/core/strapi.js").Strapi;
        }) => {
            index(ctx: import("koa").Context): Promise<any>;
        };
    };
    routes: {
        'content-api': {
            type: string;
            routes: {
                method: string;
                path: string;
                handler: string;
                config: {
                    policies: never[];
                };
            }[];
        };
    };
    services: {
        recaptcha: ({ strapi }: {
            strapi: import("@strapi/types/dist/core/strapi.js").Strapi;
        }) => import("./types.js").CaptchaProvider;
        hcaptcha: ({ strapi }: {
            strapi: import("@strapi/types/dist/core/strapi.js").Strapi;
        }) => import("./types.js").CaptchaProvider;
        turnstile: ({ strapi }: {
            strapi: import("@strapi/types/dist/core/strapi.js").Strapi;
        }) => import("./types.js").CaptchaProvider;
        email: ({ strapi }: {
            strapi: import("@strapi/types/dist/core/strapi.js").Strapi;
        }) => import("./types.js").NotificationProvider;
        twilio: ({ strapi }: {
            strapi: import("@strapi/types/dist/core/strapi.js").Strapi;
        }) => import("./types.js").NotificationProvider;
        formatData: () => {
            formatData(data: Record<string, unknown>): string;
        };
    };
    contentTypes: {
        recipient: {
            schema: {
                kind: string;
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                    description: string;
                };
                options: {
                    draftAndPublish: boolean;
                };
                pluginOptions: {
                    'content-manager': {
                        visible: boolean;
                    };
                    'content-type-builder': {
                        visible: boolean;
                    };
                };
                attributes: {
                    name: {
                        type: string;
                        min: number;
                        max: number;
                        configurable: boolean;
                    };
                    email: {
                        type: string;
                        min: number;
                        max: number;
                        configurable: boolean;
                    };
                    number: {
                        type: string;
                        min: number;
                        max: number;
                        configurable: boolean;
                    };
                };
            };
        };
        submission: {
            schema: {
                kind: string;
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                    description: string;
                };
                options: {
                    draftAndPublish: boolean;
                };
                pluginOptions: {
                    'content-manager': {
                        visible: boolean;
                    };
                    'content-type-builder': {
                        visible: boolean;
                    };
                };
                attributes: {
                    score: {
                        type: string;
                        min: number;
                        max: number;
                        configurable: boolean;
                    };
                    formName: {
                        type: string;
                        min: number;
                        max: number;
                        configurable: boolean;
                    };
                    data: {
                        type: string;
                        configurable: boolean;
                    };
                };
            };
        };
    };
};
export default _default;
