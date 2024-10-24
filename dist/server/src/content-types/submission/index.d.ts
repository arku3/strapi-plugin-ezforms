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
export default _default;
