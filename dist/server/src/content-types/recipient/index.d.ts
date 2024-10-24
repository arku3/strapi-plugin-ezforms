declare const _default: {
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
        "content-manager": {
            visible: boolean;
        };
        "content-type-builder": {
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
export default _default;
