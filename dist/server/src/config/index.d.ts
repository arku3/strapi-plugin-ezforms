declare const _default: {
    default: {
        captchaProvider: {
            name: string;
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
export default _default;
